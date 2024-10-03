import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { DataSourceType } from '@prisma/client';

export async function GET(request: Request) { 
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json(
            { error: 'UNAUTHORIZED', message: 'Unauthorized access'  },
            { status: 401 }
        );
    }

    const { search = '', currentPage = '1', limit = '10' } = Object.fromEntries(new URL(request.url).searchParams); // Extract query params
    const offset = (parseInt(currentPage) - 1) * parseInt(limit); // Calculate offset for pagination

    try {
        const [projects, totalCount] = await Promise.all([
            prisma.project.findMany({
                where: {
                    userId: session.user.id,
                    name: { contains: search, mode: 'insensitive' }, // Search by project name
                },
                include: {
                    organization: true,
                    events:true
                },
                skip: offset, // Skip for pagination
                take: parseInt(limit), // Limit the number of results
            }),
            prisma.project.count({ // Count total projects for pagination
                where: {
                    userId: session.user.id,
                    name: { contains: search, mode: 'insensitive' },
                },
            }),
        ]);

        return NextResponse.json({
            projects,
            pagination: {
                currentPage: parseInt(currentPage),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalCount,
            },
        }, { status: 200 });
    } catch (error) {
        console.error('GET /api/projects error:', error);
        return NextResponse.json(
            { error: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred'  },
            { status: 500 }
        );
    }
}


export async function POST(request: Request) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        //TODO: remember add validation for pricingplan

        // Input validation using Zod
        const ProjectSchema = z.object({
            name: z.string().min(3, 'Name is required'),
            dataSources: z.array(z.enum(Object.values(DataSourceType) as [string, ...string[]])).nonempty({ message: "Select at least one data source type." }),
            organizationId: z.string().uuid('Invalid organization ID'),
        });

        
        const { name, organizationId, dataSources } = ProjectSchema.parse(body);
        console.log({ ProjectSchema })

        // Verify organization ownership
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
            include: { users: true },
        });

        if (!organization) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Organization not found' } },
                { status: 404 }
            );
        }

        const userId = session.user.id;

        if (!userId) {
            return NextResponse.json(
                { error: { code: 'UNAUTHORIZED', message: 'User ID is missing' } },
                { status: 401 }
            );
        }

        const isUserInOrg = organization.users.some((user: { id: string }) => user.id === userId);
        if (!isUserInOrg) {
            return NextResponse.json(
                { error: { code: 'FORBIDDEN', message: 'Access denied to this organization' } },
                { status: 403 }
            );
        }



        const project = await prisma.project.create({
            data: {
                name,
                organizationId,
                dataSources: dataSources as DataSourceType[],
                userId,
            },
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/projects error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


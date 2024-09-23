import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        const projects = await prisma.project.findMany({
            where: { userId: session.user.id },
            include: {
                organization: true,
                dataSources: true,
                ApiKey: true,
            },
        });

        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error('GET /api/projects error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        // Input validation using Zod
        const ProjectSchema = z.object({
            name: z.string().min(1, 'Name is required'),
            organizationId: z.string().uuid('Invalid organization ID'),
        });

        const { name, organizationId } = ProjectSchema.parse(body);

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

        const isUserInOrg = organization.users.some((user: { id: any; }) => user.id === session.user.id);
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
                userId: session.user.id,
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


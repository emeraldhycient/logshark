import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {prisma} from '@/lib/prisma';
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
        const organizations = await prisma.organization.findMany({
            where: {
                users: {
                    some: { id: session.user.id },
                },
            },
        });

        return NextResponse.json(organizations, { status: 200 });
    } catch (error) {
        console.error('GET /api/organizations error:', error);
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

        // Input validation
        const OrganizationSchema = z.object({
            name: z.string().min(1, 'Name is required'),
        });

        const { name } = OrganizationSchema.parse(body);

        const organization = await prisma.organization.create({
            data: {
                name,
                users: {
                    connect: { id: session.user.id },
                },
            },
        });

        return NextResponse.json(organization, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/organizations error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


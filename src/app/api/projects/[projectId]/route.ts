import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

interface Params {
    params: {
        projectId: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const session = await auth()
    const { projectId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        const ProjectIdSchema = z.string().uuid('Invalid project ID');
        ProjectIdSchema.parse(projectId);

        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                organization: true,
                dataSources: true,
                ApiKey: true,
            },
        });

        if (!project) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Project not found' } },
                { status: 404 }
            );
        }

        if (project.userId !== session.user.id) {
            return NextResponse.json(
                { error: { code: 'FORBIDDEN', message: 'Access denied to this project' } },
                { status: 403 }
            );
        }

        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(`GET /api/projects/${projectId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request, { params }: Params) {
    const session = await auth()
    
    const { projectId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        // Validate path parameter
        const ProjectIdSchema = z.string().uuid('Invalid project ID');
        ProjectIdSchema.parse(projectId);

        // Input validation
        const ProjectUpdateSchema = z.object({
            name: z.string().min(1, 'Name is required'),
        });

        const { name } = ProjectUpdateSchema.parse(body);

        const project = await prisma.project.findUnique({ where: { id: projectId } });

        if (!project) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Project not found' } },
                { status: 404 }
            );
        }

        if (project.userId !== session.user.id) {
            return NextResponse.json(
                { error: { code: 'FORBIDDEN', message: 'Access denied to this project' } },
                { status: 403 }
            );
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: { name },
        });

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(`PUT /api/projects/${projectId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request, { params }: Params) {
    const session = await auth()
    
    const { projectId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate path parameter
        const ProjectIdSchema = z.string().uuid('Invalid project ID');
        ProjectIdSchema.parse(projectId);

        const project = await prisma.project.findUnique({ where: { id: projectId } });

        if (!project) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Project not found' } },
                { status: 404 }
            );
        }

        if (project.userId !== session.user.id) {
            return NextResponse.json(
                { error: { code: 'FORBIDDEN', message: 'Access denied to this project' } },
                { status: 403 }
            );
        }

        await prisma.project.delete({ where: { id: projectId } });

        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        if (error instanceof PrismaClientUnknownRequestError) {
            // Handle foreign key constraint errors
            return NextResponse.json(
                { error: { code: 'BAD_REQUEST', message: 'Cannot delete project with existing dependencies' } },
                { status: 400 }
            );
        }
        console.error(`DELETE /api/projects/${projectId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';


export async function GET(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { projectId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate project ID
        const ProjectIdSchema = z.string().uuid('Invalid project ID');
        ProjectIdSchema.parse(projectId);

        // Verify project ownership
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { userId: true },
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

        // Fetch feature flags
        const featureFlags = await prisma.featureFlag.findMany({
            where: { projectId },
        });

        return NextResponse.json(featureFlags, { status: 200 });
    } catch (error) {
        console.error(`GET /api/projects/${projectId}/feature-flags error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

// src/app/api/projects/[projectId]/custom-metrics/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';import { z } from 'zod';
import {prisma} from '@/lib/prisma';

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

        // Fetch custom metrics
        const customMetrics = await prisma.customMetric.findMany({
            where: { projectId },
        });

        return NextResponse.json(customMetrics, { status: 200 });
    } catch (error) {
        console.error(`GET /api/projects/${projectId}/custom-metrics error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


export async function POST(request: Request, { params }: Params) {
    const session = await auth()
    
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

        // Parse and validate request body
        const body = await request.json();

        const CustomMetricSchema = z.object({
            name: z.string().min(1, 'Name is required'),
            description: z.string().optional(),
            formula: z.string().min(1, 'Formula is required'),
        });

        const { name, description, formula } = CustomMetricSchema.parse(body);

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

        // Create custom metric
        const customMetric = await prisma.customMetric.create({
            data: {
                name,
                description,
                formula,
                projectId,
            },
        });

        return NextResponse.json(customMetric, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(`POST /api/projects/${projectId}/custom-metrics error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


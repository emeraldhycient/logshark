// src/app/api/projects/[projectId]/custom-metrics/[metricId]/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';import { z } from 'zod';
import {prisma} from '@/lib/prisma';

interface Params {
    params: {
        projectId: string;
        metricId: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const session = await auth()

    const { projectId, metricId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate IDs
        const IdSchema = z.string().uuid();
        IdSchema.parse(projectId);
        IdSchema.parse(metricId);

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

        // Fetch custom metric
        const customMetric = await prisma.customMetric.findFirst({
            where: {
                id: metricId,
                projectId,
            },
        });

        if (!customMetric) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Custom metric not found' } },
                { status: 404 }
            );
        }

        return NextResponse.json(customMetric, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(
            `GET /api/projects/${projectId}/custom-metrics/${metricId} error:`,
            error
        );
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request, { params }: Params) {
    const session = await auth()
    
    const { projectId, metricId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate IDs
        const IdSchema = z.string().uuid();
        IdSchema.parse(projectId);
        IdSchema.parse(metricId);

        // Parse and validate request body
        const body = await request.json();

        const CustomMetricUpdateSchema = z.object({
            name: z.string().min(1, 'Name is required').optional(),
            description: z.string().optional(),
            formula: z.string().min(1, 'Formula is required').optional(),
        });

        const data = CustomMetricUpdateSchema.parse(body);

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

        // Update custom metric
        const updatedMetric = await prisma.customMetric.updateMany({
            where: {
                id: metricId,
                projectId,
            },
            data,
        });

        if (updatedMetric.count === 0) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Custom metric not found' } },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Custom metric updated successfully' }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(
            `PUT /api/projects/${projectId}/custom-metrics/${metricId} error:`,
            error
        );
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request, { params }: Params) {
    const session = await auth()
    
    const { projectId, metricId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate IDs
        const IdSchema = z.string().uuid();
        IdSchema.parse(projectId);
        IdSchema.parse(metricId);

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

        // Delete custom metric
        const deletedMetric = await prisma.customMetric.deleteMany({
            where: {
                id: metricId,
                projectId,
            },
        });

        if (deletedMetric.count === 0) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Custom metric not found' } },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Custom metric deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(
            `DELETE /api/projects/${projectId}/custom-metrics/${metricId} error:`,
            error
        );
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

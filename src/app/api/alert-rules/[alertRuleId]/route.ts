// src/app/api/alert-rules/[alertRuleId]/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import {prisma} from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface Params {
    params: {
        alertRuleId: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { alertRuleId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate alertRuleId
        const IdSchema = z.string().uuid('Invalid alert rule ID');
        IdSchema.parse(alertRuleId);

        // Fetch alert rule
        const alertRule = await prisma.alertRule.findFirst({
            where: {
                id: alertRuleId,
                createdBy: session.user.id,
            },
            include: { notifications: true },
        });

        if (!alertRule) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Alert rule not found' } },
                { status: 404 }
            );
        }

        return NextResponse.json(alertRule, { status: 200 });
    } catch (error) {
        console.error(`GET /api/alert-rules/${alertRuleId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { alertRuleId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate alertRuleId
        const IdSchema = z.string().uuid('Invalid alert rule ID');
        IdSchema.parse(alertRuleId);

        const body = await request.json();

        const AlertRuleUpdateSchema = z.object({
            name: z.string().min(1, 'Name is required').optional(),
            description: z.string().optional(),
            condition: z.string().min(1, 'Condition is required').optional(),
            severity: z.enum(['CRITICAL', 'WARNING', 'INFO']).optional(),
        });

        const data = AlertRuleUpdateSchema.parse(body);

        // Update alert rule
        const updatedAlertRule = await prisma.alertRule.updateMany({
            where: {
                id: alertRuleId,
                createdBy: session.user.id,
            },
            data,
        });

        if (updatedAlertRule.count === 0) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Alert rule not found or no permission' } },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Alert rule updated successfully' }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(`PUT /api/alert-rules/${alertRuleId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { alertRuleId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate alertRuleId
        const IdSchema = z.string().uuid('Invalid alert rule ID');
        IdSchema.parse(alertRuleId);

        // Delete alert rule
        const deletedAlertRule = await prisma.alertRule.deleteMany({
            where: {
                id: alertRuleId,
                createdBy: session.user.id,
            },
        });

        if (deletedAlertRule.count === 0) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Alert rule not found or no permission' } },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Alert rule deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(`DELETE /api/alert-rules/${alertRuleId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

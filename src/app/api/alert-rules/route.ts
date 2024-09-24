// src/app/api/alert-rules/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function GET() {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Fetch alert rules associated with the user
        const alertRules = await prisma.alertRule.findMany({
            where: { createdBy: session.user.id },
            include: { notifications: true },
        });

        return NextResponse.json(alertRules, { status: 200 });
    } catch (error) {
        console.error('GET /api/alert-rules error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
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

        const AlertRuleSchema = z.object({
            name: z.string().min(1, 'Name is required'),
            description: z.string().optional(),
            condition: z.string().min(1, 'Condition is required'),
            severity: z.enum(['CRITICAL', 'WARNING', 'INFO']),
        });

        const { name, description, condition, severity } = AlertRuleSchema.parse(body);

        // Create alert rule
        const alertRule = await prisma.alertRule.create({
            data: {
                name,
                description,
                condition,
                severity,
                createdBy: session.user.id ?? '',
            },
        });

        return NextResponse.json(alertRule, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/alert-rules error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


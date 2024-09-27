import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import { z } from 'zod';
import { validateApiKey } from '@/utils/apiKeyUtils';

export async function POST(request: Request) {
    const apiKey = request.headers.get('X-API-Key');

    if (!apiKey) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'API key is required' } },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        // Define validation schema
        const EventSchema = z.object({
            projectId: z.string().uuid('Invalid project ID'),
            eventType: z.enum(['PAGE_VIEW', 'CLICK', 'FORM_SUBMISSION', 'API_CALL', 'SCROLL_DEPTH', 'HEATMAP', 'CUSTOM']),
            details: z.record(z.any()),
            timestamp: z.string().datetime().optional(),
        });

        const { projectId, eventType, details, timestamp } = EventSchema.parse(body);

        // Validate API key
        const apiKeyValidation = await validateApiKey(apiKey, projectId, 'write');

        if (!apiKeyValidation.isValid) {
            return NextResponse.json(
                { error: { code: apiKeyValidation.status, message: apiKeyValidation.error } },
                { status: apiKeyValidation.status }
            );
        }

        // Check quota
        const subscription = await prisma.subscription.findFirst({
            where: { userId: apiKeyValidation.userId, active: true },
            include: { pricingPlan: true },
        });

        if (!subscription) {
            return NextResponse.json(
                { error: { code: 'SUBSCRIPTION_NOT_FOUND', message: 'Active subscription not found' } },
                { status: 402 }
            );
        }

        if (subscription.eventCount >= subscription.pricingPlan.eventLimit) {
            return NextResponse.json(
                { error: { code: 'QUOTA_EXCEEDED', message: 'Event limit exceeded' } },
                { status: 402 }
            );
        }

        // Create event
        const event = await prisma.event.create({
            data: {
                projectId,
                eventType,
                details,
                timestamp: timestamp ? new Date(timestamp) : new Date(),
                dataSourceId: apiKeyValidation.dataSourceId,
            },
        });

        // Increment event count
        await prisma.subscription.update({
            where: { id: subscription.id },
            data: { eventCount: { increment: 1 } },
        });

        return NextResponse.json(
            { eventId: event.id, status: 'queued' },
            { status: 202 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/events error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

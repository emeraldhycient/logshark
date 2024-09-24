// src/app/api/integrations/route.ts

import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import { z } from 'zod';
import { auth } from '@/utils/auth';


export async function GET() {
    const session = await auth()

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Fetch integrations associated with the user
        const integrations = await prisma.integration.findMany({
            where: { createdBy: session.user.id },
        });

        return NextResponse.json(integrations, { status: 200 });
    } catch (error) {
        console.error('GET /api/integrations error:', error);
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

        const IntegrationSchema = z.object({
            name: z.string().min(1, 'Name is required'),
            type: z.enum(['CRM', 'ANALYTICS', 'MARKETING']),
            apiEndpoint: z.string().url('Invalid API endpoint'),
            apiKey: z.string().min(1, 'API key is required'),
            status: z.enum(['active', 'inactive']),
        });

        const { name, type, apiEndpoint, apiKey, status } = IntegrationSchema.parse(body);

        if (!session.user.id) {
            return NextResponse.json(
                { error: { code: 'UNAUTHORIZED', message: 'User ID is missing' } },
                { status: 401 }
            );
        }

        const integration = await prisma.integration.create({
            data: {
                name,
                type,
                apiEndpoint,
                apiKey,
                status,
                createdBy: session.user.id,
            },
        });

        return NextResponse.json(integration, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/integrations error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


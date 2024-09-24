// src/app/api/tags/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';import {prisma} from '@/lib/prisma';
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
        // Fetch all tags associated with the user
        const tags = await prisma.tag.findMany({
            where: {
                OR: [
                    { UserTag: { some: { userId: session.user.id } } },
                    { EventTag: { some: { event: { Project: { userId: session.user.id } } } } },
                ],
            },
        });

        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error('GET /api/tags error:', error);
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

        const TagSchema = z.object({
            name: z.string().min(1, 'Name is required'),
        });

        const { name } = TagSchema.parse(body);

        // Create tag
        const tag = await prisma.tag.create({
            data: {
                name,
            },
        });

        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/tags error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


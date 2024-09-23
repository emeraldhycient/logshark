// src/app/api/tags/[tagId]/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import {prisma} from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface Params {
    params: {
        tagId: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { tagId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate tag ID
        const TagIdSchema = z.string().uuid('Invalid tag ID');
        TagIdSchema.parse(tagId);

        // Fetch tag
        const tag = await prisma.tag.findUnique({
            where: { id: tagId },
        });

        if (!tag) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Tag not found' } },
                { status: 404 }
            );
        }

        return NextResponse.json(tag, { status: 200 });
    } catch (error) {
        console.error(`GET /api/tags/${tagId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { tagId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate tag ID
        const TagIdSchema = z.string().uuid('Invalid tag ID');
        TagIdSchema.parse(tagId);

        const body = await request.json();

        const TagUpdateSchema = z.object({
            name: z.string().min(1, 'Name is required'),
        });

        const { name } = TagUpdateSchema.parse(body);

        // Update tag
        const updatedTag = await prisma.tag.update({
            where: { id: tagId },
            data: { name },
        });

        return NextResponse.json(updatedTag, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(`PUT /api/tags/${tagId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    const { tagId } = params;

    if (!session?.user) {
        return NextResponse.json(
            { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
            { status: 401 }
        );
    }

    try {
        // Validate tag ID
        const TagIdSchema = z.string().uuid('Invalid tag ID');
        TagIdSchema.parse(tagId);

        // Delete tag
        await prisma.tag.delete({
            where: { id: tagId },
        });

        return NextResponse.json({ message: 'Tag deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(`DELETE /api/tags/${tagId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}

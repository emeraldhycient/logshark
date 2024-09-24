// src/app/api/events/[eventId]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/utils/auth';

interface Params {
    params: {
        eventId: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const session = await auth()
    const { eventId } = params;

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { Project: true },
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        if (event.Project?.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        console.error(`GET /api/events/${eventId} error:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

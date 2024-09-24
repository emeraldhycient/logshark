// src/app/api/subscriptions/usage/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await auth()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const subscription = await prisma.subscription.findFirst({
            where: { userId: session.user.id, active: true },
            include: { pricingPlan: true },
        });

        if (!subscription) {
            return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
        }

        const { eventLimit } = subscription.pricingPlan;
        const { eventCount, startDate } = subscription;

        const resetDate = new Date(startDate);
        resetDate.setMonth(resetDate.getMonth() + 1);

        return NextResponse.json(
            { eventCount, eventLimit, resetDate },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET /api/subscriptions/usage error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

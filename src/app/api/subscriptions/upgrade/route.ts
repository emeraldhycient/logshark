// src/app/api/subscriptions/upgrade/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';
// Import payment processing library (e.g., Stripe)

export async function POST(request: Request) {
    const session = await auth()

    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, paymentMethodId } = await request.json();

    if (!planId || !paymentMethodId) {
        return NextResponse.json(
            { error: 'planId and paymentMethodId are required' },
            { status: 400 }
        );
    }

    try {
        const plan = await prisma.pricingPlan.findUnique({ where: { id: planId } });

        if (!plan) {
            return NextResponse.json({ error: 'Invalid planId' }, { status: 400 });
        }

        // Process payment here...

        const subscription = await prisma.subscription.upsert({
            where: { userId: session.user.id },
            update: {
                pricingPlanId: planId,
                startDate: new Date(),
                active: true,
                eventCount: 0,
            },
            create: {
                userId: session.user.id,
                pricingPlanId: planId,
                startDate: new Date(),
                active: true,
            },
        });

        return NextResponse.json(
            {
                subscriptionId: subscription.id,
                planId: subscription.pricingPlanId,
                startDate: subscription.startDate,
                endDate: subscription.endDate,
                status: 'active',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('POST /api/subscriptions/upgrade error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

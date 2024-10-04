// src/app/api/subscriptions/upgrade/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';
import { Paystack } from 'paystack-sdk';
import { utils } from '@/utils';

export async function POST(request: Request) {
    const session = await auth()

    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, reference, eventCount, price, isAnnual } = await request.json();

    if (!planId || !reference || !eventCount || !price) {
        return NextResponse.json(
            { error: 'planId and reference,eventCount,price are required' },
            { status: 400 }
        );
    }

    try {
        const plan = await prisma.pricingPlan.findUnique({ where: { id: planId } });

        if (!plan) {
            return NextResponse.json({ error: 'Invalid planId' }, { status: 400 });
        }

        if (plan.name == 'Enterprise') {
            const expectedAmount = utils.calculateEnterprisePrice({ eventCount, monthlyPrice: plan.monthlyPrice, annualPrice: plan.annualPrice, baseEventsLimit: plan.eventLimit, eventCostPerMillion: plan.eventCostPerMillion, isAnnual })
            if (price != expectedAmount) return NextResponse.json({ error: 'Invalid amount', message: "Event count and amount's do not match" }, { status: 400 });
        }

        if (plan.name != 'Enterprise' && plan.eventLimit != eventCount ) {
            return NextResponse.json({ error: 'Invalid amount', message: "Event count and amount's do not match" }, { status: 400 });
        }

        const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY || '');

        const verifyTransaction = paystack.transaction.verify(reference)

        console.log({ verifyTransaction })

        const nextPayDate = utils.getNextPayDate(isAnnual)

        const existingSubscription = await prisma.subscription.findFirst({
            where: { userId: session.user.id, active: true },
        });
        let subscription;

        if (existingSubscription) {
            subscription = await prisma.subscription.update({
                where: { id: existingSubscription.id },
                data: {
                    pricingPlanId: planId,
                    startDate: new Date(),
                    active: true,
                    selectedEventLimit: eventCount,
                    price,
                    eventCount: 0,
                    endDate: nextPayDate
                },
            });
        } else {
            subscription = await prisma.subscription.create({
                data: {
                    user: { connect: { id: session.user.id } },
                    pricingPlan: { connect: { id: planId } },
                    startDate: new Date(),
                    active: true,
                    selectedEventLimit: eventCount,
                    price,
                    eventCount: 0,
                    endDate: nextPayDate
                },
            });
        }

        // Create billing history entry
        await prisma.billingHistory.create({
            data: {
                subscriptionId: subscription.id,
                amount: price,
                paymentData: verifyTransaction, 
                paymentStatus: 'PAID', 
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

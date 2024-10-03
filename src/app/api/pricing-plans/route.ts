// src/app/api/pricing-plans/route.ts
import { z } from 'zod';
// import { auth } from '@/utils/auth';
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
    try {
        const pricingPlans = await prisma.pricingPlan.findMany({
            orderBy: { createdAt: 'asc' },
        });

        return NextResponse.json(pricingPlans, { status: 200 });
    } catch (error) {
        console.error('GET /api/pricing-plans error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}



export async function POST(request: Request) {
    // const session = await auth()

    // if (!session?.user) {
    //     return NextResponse.json(
    //         { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
    //         { status: 401 }
    //     );
    // }

    // Check if user is admin
    // const user = await prisma.user.findUnique({
    //     where: { id: session.user.id },
    //     select: { isAdmin: true },
    // });

    // if (!user?.isAdmin) {
    //     return NextResponse.json(
    //         { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
    //         { status: 403 }
    //     );
    // }

    try {
        const body = await request.json();

        const PricingPlanSchema = z.object({
            name: z.string().min(1),
            monthlyPrice: z.number().nonnegative(),
            annualPrice: z.number().nonnegative(),
            eventCostPerMillion: z.number().nonnegative(),
            eventLimit: z.number().int().nonnegative(),
            teamMembersLimit: z.number().int().nonnegative(),
            dataRetentionDays: z.number().int().nonnegative(),
            integrationsLimit: z.number().int().nonnegative(),
            isPopular: z.boolean().optional().default(false),
            features: z.array(z.string()),
        });

        const data = PricingPlanSchema.parse(body);

        const pricingPlan = await prisma.pricingPlan.create({
            data: data ,
        });

        return NextResponse.json(pricingPlan, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error('POST /api/pricing-plans error:', error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}



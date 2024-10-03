// src/app/api/pricing-plans/[pricingPlanId]/route.ts
import { z } from 'zod';
// import { auth } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
    params: {
        pricingPlanId: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const { pricingPlanId } = params;

    try {
        const IdSchema = z.string().uuid('Invalid pricing plan ID');
        const id = IdSchema.parse(pricingPlanId);

        const pricingPlan = await prisma.pricingPlan.findUnique({
            where: { id },
        });

        if (!pricingPlan) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Pricing plan not found' } },
                { status: 404 }
            );
        }

        return NextResponse.json(pricingPlan, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        }
        console.error(`GET /api/pricing-plans/${pricingPlanId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}



interface Params {
    params: {
        pricingPlanId: string;
    };
}

export async function PUT(request: Request, { params }: Params) {
    // const session = await auth()
    const { pricingPlanId } = params;

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
        const IdSchema = z.string().uuid('Invalid pricing plan ID');
        const id = IdSchema.parse(pricingPlanId);

        const body = await request.json();

        const PricingPlanUpdateSchema = z.object({
            name: z.string().min(1).optional(),
            monthlyPrice: z.number().nonnegative().optional(),
            annualPrice: z.number().nonnegative().optional(),
            eventCostPerMillion: z.number().nonnegative().optional(),
            eventLimit: z.number().int().nonnegative().optional(),
            teamMembersLimit: z.number().int().nonnegative().optional(),
            dataRetentionDays: z.number().int().nonnegative().optional(),
            integrationsLimit: z.number().int().nonnegative().optional(),
            isPopular: z.boolean().optional(),
            features: z.array(z.string()).optional(),
        });

        const data = PricingPlanUpdateSchema.parse(body);

        const pricingPlan = await prisma.pricingPlan.update({
            where: { id },
            data: data
        });

        return NextResponse.json(pricingPlan, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: error.errors } },
                { status: 400 }
            );
        } else if (error instanceof Error && 'code' in error && (error as { code: string }).code === 'P2025') {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Pricing plan not found' } },
                { status: 404 }
            );
        }
        console.error(`PUT /api/pricing-plans/${pricingPlanId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}



// src/app/api/pricing-plans/[pricingPlanId]/route.ts

export async function DELETE(request: Request, { params }: { params: { pricingPlanId: string } }) {
    // const session = await auth()
    const { pricingPlanId } = params;

    // if (!session?.user) {
    //     return NextResponse.json(
    //         { error: { code: 'UNAUTHORIZED', message: 'Unauthorized access' } },
    //         { status: 401 }
    //     );
    // }

    // // Check if user is admin
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
        const IdSchema = z.string().uuid('Invalid pricing plan ID');
        const id = IdSchema.parse(pricingPlanId);

        await prisma.pricingPlan.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Pricing plan deleted successfully' }, { status: 200 });
    } catch (error) {
        if ((error as { code?: string }).code === 'P2025') {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Pricing plan not found' } },
                { status: 404 }
            );
        }
        console.error(`DELETE /api/pricing-plans/${pricingPlanId} error:`, error);
        return NextResponse.json(
            { error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
            { status: 500 }
        );
    }
}


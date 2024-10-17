// src/app/api/apikeys/[apiKeyId]/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';

interface Params {
    params: {
        apiKeyId: string;
    };
}

export async function DELETE(request: Request, { params }: Params) {
    const session = await auth()

    const { apiKeyId } = params;

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const apiKey = await prisma.apiKey.findUnique({ where: { id: apiKeyId } });

        if (!apiKey || apiKey.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden',message:"You are not authorized to delete this api key" }, { status: 403 });
        }

        await prisma.apiKey.update({
            where: { id: apiKeyId },
            data: { isActive: false, revokedAt: new Date() },
        });

        return NextResponse.json({message:"Api key deleted successfully"}, { status: 200 });
    } catch (error) {
        console.error(`DELETE /api/apikeys/${apiKeyId} error:`, error);
        return NextResponse.json({ error: 'Internal Server Error', message: (error as { message?: string }).message }, { status: 500 });
    }
}

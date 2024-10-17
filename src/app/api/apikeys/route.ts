// src/app/api/apikeys/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { logAuditEntry } from '@/utils/auditLog';

export async function POST(request: Request) {
    const session = await auth()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, name, permissions, expiresAt, ipRestrictions } = await request.json();

    if (!projectId || !name || !permissions) {
        return NextResponse.json(
            { error: 'projectId, name, and permissions are required' },
            { status: 400 }
        );
    }

    let ipRestrictionsArray = ipRestrictions.split(",")
    ipRestrictionsArray = [...ipRestrictions]

    const validPermissions = ['read', 'write', 'admin'];
    if (!permissions.every((perm: string) => validPermissions.includes(perm))) {
        return NextResponse.json({ error: 'Invalid permissions' }, { status: 400 });
    }

    try {
        const project = await prisma.project.findUnique({ where: { id: projectId } });

        if (!project || project.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden',message:"Please select a existing project" }, { status: 403 });
        }

        const id = uuidv4();
        const secret = crypto.randomBytes(32).toString('hex');
        const apiKey = `key_${id}_${secret}`;
        const secretHash = await bcrypt.hash(secret, 10);

        const newApiKey = await prisma.apiKey.create({
            data: {
                id,
                name,
                projectId,
                key:apiKey,
                userId: session.user.id,
                permissions,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                ipRestrictions: ipRestrictionsArray,
                secretHash,
                isActive: true,
                createdAt: new Date(),
                createdBy: session.user.id,
            },
        });

        return NextResponse.json(
            {
                id: newApiKey.id,
                key: apiKey, // Only returned once
                name: newApiKey.name,
                permissions: newApiKey.permissions,
                createdAt: newApiKey.createdAt,
                expiresAt: newApiKey.expiresAt,
                ipRestrictions: newApiKey.ipRestrictions,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/apikeys error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: (error as { message?: string }).message }, { status: 500 });
    }
}


export async function GET(request:Request) {
    const session = await auth()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const audit = await logAuditEntry({ req: request, entityType: "API_KEY", action: "Get", changes: {}, userId: session.user.id as string })

    console.log({audit})

    try {
        const apiKeys = await prisma.apiKey.findMany({
            where: { userId: session.user.id, isActive: true },
            select: {
                id: true,
                name: true,
                key: true,
                projectId: true,
                permissions: true,
                isActive: true,
                createdAt: true,
                expiresAt: true,
                lastUsedAt: true,
                usageCount: true,
                ipRestrictions: true,
            },
        });

        return NextResponse.json(apiKeys, { status: 200 });
    } catch (error) {
        console.error('GET /api/apikeys error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



// src/app/api/apikeys/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export async function POST(request: Request) {
    const session = await auth()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let { projectId, name, permissions, expiresAt, ipRestrictions } = await request.json();

    if (!projectId || !name || !permissions) {
        return NextResponse.json(
            { error: 'projectId, name, and permissions are required' },
            { status: 400 }
        );
    }

    ipRestrictions = ipRestrictions.split(",")
    ipRestrictions = [...ipRestrictions]

    const validPermissions = ['read', 'write', 'admin'];
    if (!permissions.every((perm: string) => validPermissions.includes(perm))) {
        return NextResponse.json({ error: 'Invalid permissions' }, { status: 400 });
    }

    try {
        const project = await prisma.project.findUnique({ where: { id: projectId } });

        if (!project || project.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
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
                ipRestrictions,
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
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET() {
    const session = await auth()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const apiKeys = await prisma.apiKey.findMany({
            where: { userId: session.user.id },
            select: {
                id: true,
                name: true,
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


// src/app/api/apikeys/validate/route.ts

import { validateApiKey } from '@/utils/apiKeyUtils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const apiKey = request.headers.get('X-API-Key');

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is required' }, { status: 401 });
    }

    const { projectId, requiredPermission = 'read' } = await request.json();

    if (!projectId) {
        return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }

    const validation = await validateApiKey(apiKey, projectId, requiredPermission);

    if (!validation.isValid) {
        return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    return NextResponse.json(
        {
            isValid: true,
            permissions: validation.permissions,
            projectId,
        },
        { status: 200 }
    );
}

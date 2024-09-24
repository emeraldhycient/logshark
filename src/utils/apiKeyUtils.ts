// lib/apiKeyUtils.ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function validateApiKey(apiKey: string, projectId: string, requiredPermission: string) {
    try {
        const [prefix, id, secret] = apiKey.split('_');
        if (prefix !== 'key' || !id || !secret) {
            return { isValid: false, error: 'Invalid API key format', status: 401 };
        }

        const apiKeyRecord = await prisma.apiKey.findUnique({ where: { id } });

        if (!apiKeyRecord) {
            return { isValid: false, error: 'Invalid API key', status: 401 };
        }

        if (!apiKeyRecord.isActive) {
            return { isValid: false, error: 'API key is inactive', status: 401 };
        }

        if (apiKeyRecord.expiresAt && new Date(apiKeyRecord.expiresAt) < new Date()) {
            return { isValid: false, error: 'API key has expired', status: 401 };
        }

        if (apiKeyRecord.projectId !== projectId) {
            return { isValid: false, error: 'API key does not match project', status: 403 };
        }

        if (!apiKeyRecord.permissions.includes(requiredPermission)) {
            return { isValid: false, error: 'Insufficient permissions', status: 403 };
        }

        const isValidSecret = await bcrypt.compare(secret, apiKeyRecord.secretHash);

        if (!isValidSecret) {
            return { isValid: false, error: 'Invalid API key', status: 401 };
        }

        // Update usage stats
       const apikeyDetails = await prisma.apiKey.update({
            where: { id },
            data: {
                lastUsedAt: new Date(),
                usageCount: { increment: 1 },
            },
        });

        return { isValid: true, userId: apiKeyRecord.userId, permissions: apiKeyRecord.permissions, };
    } catch (error) {
        console.error('validateApiKey error:', error);
        return { isValid: false, error: 'Internal Server Error', status: 500 };
    }
}

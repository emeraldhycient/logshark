import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from '@/utils/auth';

export async function GET() {
    const session = await auth()

    const user = session?.user;
    const project = await prisma.user.findUnique({
        where: { id: user?.id },
        include: {
            organization: true, // Include organization
            projects: true, // Include projects
            EventSession: true, // Include event sessions
            profiles: true, // Include user profiles
            userTags: true, // Include user tags
            auditLogs: true, // Include audit logs
            segments: true, // Include user segments
            cohorts: true, // Include cohorts
            Subscription: true, // Include subscriptions
            ApiKey: true, // Include API keys
            AlertRule: true, // Include alert rules
            Integration: true, // Include integrations
            accounts: true, // Include accounts
            sessions: true, // Include sessions
            Authenticator: true // Include authenticators
        }
    });
    return NextResponse.json({ project });
}
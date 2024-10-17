import { locationService } from './../services/location/location.service';
import { prisma } from '../lib/prisma';
import { EntityType } from '@prisma/client';

// Helper function to extract IP from the request
function getClientIp(req: Request): string | null {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : null;
    return ip;
}

// Function to log audit information in the database
export async function logAuditEntry({ req, entityType, action, changes, userId }: { req: Request, entityType: EntityType, action: string, changes: object, userId: string }) {
    try {
        const ipAddress = getClientIp(req); // Extract IP address from the request
        let location;
        if (ipAddress) {            
             location =await locationService.getLocationDataByIp(ipAddress)
        }

        location = {
            ipAddress,
            ...location
        };

        // Store audit information in the database
        const auditLog = await prisma.auditLog.create({
            data: {
                entityType: entityType,
                action,
                locationInfo:location,
                changedBy: userId,
                changes: changes, // Ensure `changes` is a JSON object
                User: {
                    connect: { id: userId }, // Connect the user if applicable
                },
            },
        });

        return {
            success: true,
            data: auditLog,
        };
    } catch (error) {
        console.error("Failed to log audit entry:", error);
        return {
            success: false,
            message: "Failed to log audit entry",
            error,
        };
    }
}


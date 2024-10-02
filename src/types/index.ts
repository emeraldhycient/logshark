import { DataSourceType } from "@prisma/client";

export interface registerParams {
    name: string,
    email: string,
    password: string
}


export interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
}

export interface MutationError {
    response?: {
        data?: {
            message: string;
        };
    };
}

export interface ICreateProject {
    name: string;
    dataSources: DataSourceType[],
    organizationId: string,
}

export type IPagination = {
    currentPage?: number | string,
    limit?: number | string;
    search?: string
}


// Interface for Organization
export interface IOrganization {
    id: string;
    name: string;
    createdAt: string; 
    updatedAt: string; 
}

// Interface for Event (will update later)
export interface IEvent {
    id: string;
    name: string;
    // Add other event properties as needed
}

// Interface for Project
export interface IProject {
    id: string;
    name: string;
    organizationId: string;
    userId: string;
    createdAt: string; 
    updatedAt: string; 
    dataSources: DataSourceType[];
    eventCount: number;
    organization: IOrganization;
    events: IEvent[]; 
}

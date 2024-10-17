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


export interface IPricingPlan {
    id: string
    name: string
    monthlyPrice: number
    annualPrice: number
    eventLimit: number
    teamMembersLimit: number
    dataRetentionDays: number
    integrationsLimit: number
    isPopular: boolean
    features: string[]
    description?: string
    cta?: string
    eventCostPerMillion?: number
}

export interface IcalculateEnterprisePrice {
    eventCount: number;
    monthlyPrice: number;
    annualPrice: number;
    baseEventsLimit: number;
    eventCostPerMillion?: number;
    isAnnual?: boolean
}

export interface ISubscribeOrUpgrade { planId: string, reference: string, eventCount: number | string, price: number | string, isAnnual: boolean }

export interface IGeoPluginResponse {
    geoplugin_request: string;
    geoplugin_status: number;
    geoplugin_delay: string;
    geoplugin_credit: string;
    geoplugin_city: string;
    geoplugin_region: string;
    geoplugin_regionCode: string;
    geoplugin_regionName: string;
    geoplugin_areaCode: string;
    geoplugin_dmaCode: string;
    geoplugin_countryCode: string;
    geoplugin_countryName: string;
    geoplugin_inEU: number;
    geoplugin_euVATrate: boolean;
    geoplugin_continentCode: string;
    geoplugin_continentName: string;
    geoplugin_latitude: string;
    geoplugin_longitude: string;
    geoplugin_locationAccuracyRadius: string;
    geoplugin_timezone: string;
    geoplugin_currencyCode: string;
    geoplugin_currencySymbol: string;
    geoplugin_currencySymbol_UTF8: string;
    geoplugin_currencyConverter: number;
}


export interface ICreateApiKey { name: string; expiresAt: string; permissions: string[]; projectId: string; ipRestrictions?: string }

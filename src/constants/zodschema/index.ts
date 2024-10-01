import * as z from "zod"


export const addTeamFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    role: z.string().min(1, {
        message: "Please select a role.",
    }),
    team: z.string().min(2, {
        message: "Team name must be at least 2 characters.",
    }),
})

export const createOrganization = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
})

export const projectFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    organizationId: z.string().min(1, {
        message: "Please select an organization.",
    }),
})
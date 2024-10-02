// components/OrganizationSelect.tsx
'use client'

import React, { useState } from 'react'
import {
    Building,
    ChevronLeft,
    ChevronRight,
    PlusCircle,
} from 'lucide-react'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createOrganization } from '@/constants/zodschema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import organisationService from '@/services/Organisation/org.service'
import { MutationError } from '@/types'

interface OrganizationSelectProps {
    sidebarCollapsed?: boolean
    setSidebarCollapsed?: (value: boolean) => void
    selectedOrganizationValue?: string,
    setSelectedOrganizationValue?: (value: string) => void
}

export default function OrganizationSelect({ sidebarCollapsed, setSidebarCollapsed,selectedOrganizationValue,setSelectedOrganizationValue }: OrganizationSelectProps) {
    const [selectedOrganization, setSelectedOrganization] = useState<string>(selectedOrganizationValue || '')
    const [isCreateOrgDialogOpen, setIsCreateOrgDialogOpen] = useState(false)
    const { toast } = useToast()
    const queryClient = useQueryClient()

    // Fetch organizations
    const { data: organizations, isLoading: isOrgLoading } = useQuery({
        queryKey: ['organizations'],
        queryFn: organisationService.getUserOrganizations,
    })

    // Form setup for creating organization
    const userForm = useForm<z.infer<typeof createOrganization>>({
        resolver: zodResolver(createOrganization),
        defaultValues: {
            name: '',
        },
    })

    const [loading, setLoading] = useState(false)

    const createOrganizationMu = useMutation({
        mutationFn: (data: { name: string }) => organisationService.createOrganization(data),
        onSuccess: () => {
            toast({
                title: 'Organization created successfully',
                description: 'Your organization has been created.',
            })
            setLoading(false)
            // Refetch organizations to include the new one
            queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
        onError: (error: MutationError) => {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: error.response?.data?.message || 'An error occurred!',
            })
            setLoading(false)
        },
        onSettled: () => {
            setIsCreateOrgDialogOpen(false)
        },
    })

    function onSubmitUserForm(values: z.infer<typeof createOrganization>) {
        setLoading(true)
        createOrganizationMu.mutate(values)
        userForm.reset()
    }

    return (
        <>
            {/* Organization Selection */}
            <div className="flex items-center justify-between p-4 border-b border-indigo-500">
                {!sidebarCollapsed ? (
                    <div className="flex items-center w-full">
                        <Select
                            value={selectedOrganization}
                            onValueChange={(value) => {
                                if (value === 'create_new') {
                                    setIsCreateOrgDialogOpen(true)
                                } else if (value !== 'no_orgs') {
                                    setSelectedOrganization(value)
                                    setSelectedOrganizationValue?.(value)
                                }
                            }}
                            disabled={isOrgLoading}
                        >
                            <SelectTrigger className="w-full bg-indigo-700 hover:bg-indigo-600 border-none text-white">
                                <Building className="mr-2 h-5 w-5" />
                                <SelectValue placeholder={isOrgLoading ? 'Loading...' : 'Select Organization'} />
                            </SelectTrigger>
                            <SelectContent>
                                {!isOrgLoading && organizations && organizations.data?.length > 0 ? (
                                    organizations.data.map((org:{name:string,id:string}) => (
                                        <SelectItem key={org.id} value={org.id}>
                                            {org.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <>
                                        {!isOrgLoading && (
                                            <SelectItem value="no_orgs" disabled>
                                                No organizations found
                                            </SelectItem>
                                        )}
                                    </>
                                )}
                                {!isOrgLoading && (
                                    <SelectItem value="create_new">
                                        <span className="flex items-center text-indigo-600">
                                            <PlusCircle className="mr-2 h-5 w-5" />
                                            Create New Organization
                                        </span>
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setIsCreateOrgDialogOpen(true)}
                                    className="text-white hover:bg-indigo-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <Building className="h-6 w-6" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right" align="center">
                                Select Organization
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <button
                    onClick={() => setSidebarCollapsed?.(!sidebarCollapsed)}
                    className="text-white hover:bg-indigo-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                    {sidebarCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                </button>
            </div>

            {/* Create Organization Dialog */}
            <Dialog open={isCreateOrgDialogOpen} onOpenChange={setIsCreateOrgDialogOpen}>
                <DialogContent className="sm:max-w-lg bg-white">
                    <DialogHeader>
                        <DialogTitle className='text-black'>Create Organization</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new organization. Click create when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...userForm}>
                        <form onSubmit={userForm.handleSubmit(onSubmitUserForm)} className="space-y-6">
                            <FormField
                                control={userForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-gray-600'>Organization Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter organization name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Creating...' : 'Create'}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

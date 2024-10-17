'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useToast } from "@/hooks/use-toast"
import { InfoIcon, Plus } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQuery } from '@tanstack/react-query'
import projectServices from '@/services/projects/index.service'
import { ICreateApiKey, IProject, MutationError } from '@/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { apiKeyService } from '@/services/apikey/apiKey.service'

// Define the permissions options as plain text
const permissionsList = [
    { value: "read", label: "Read" },
    { value: "write", label: "Write" },
];

const apiKeyFormSchema = z.object({
    name: z.string().min(2, {
        message: "API key name must be at least 2 characters.",
    }),
    permissions: z.array(z.string()), // Multi-select expects an array of strings
    expiresAt: z.enum(['90', '1095']),
    ipRestrictions: z.string().optional(),
    projectId: z.string().min(1, { message: "project Id is required." }),
})

export default function CreateApiKey() {
    const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false)
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)


    const apiKeyForm = useForm<z.infer<typeof apiKeyFormSchema>>({
        resolver: zodResolver(apiKeyFormSchema),
        defaultValues: {
            name: "",
            permissions: [], // Default empty array for multi-select
            expiresAt: '1095',
            ipRestrictions: '',
            projectId: '',
        },
    })

    const { mutate } = useMutation({
        mutationFn: (data: ICreateApiKey) => apiKeyService.CreateApiKey(data),
        onSuccess: () => {
            setLoading(false)
            setIsCreateKeyModalOpen(false)
            apiKeyForm.reset()
            toast({
                title: "API Key Created",
                description: "Your new API key has been created successfully.",
            })
        },
        onError: (error: MutationError) => {
            setLoading(false)
            toast({
                variant: "destructive",
                description: error.response?.data?.message || 'An Error Occurred!'
            })
        }
    })

    function onApiKeySubmit(values: z.infer<typeof apiKeyFormSchema>) {
        mutate(values)
    }

    const { data: projects, isLoading: isProjectsLoading, error, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: () => projectServices.getAllProjects({}),
    })

    return (
        <Dialog open={isCreateKeyModalOpen} onOpenChange={setIsCreateKeyModalOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create New API Key
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-black">Create New API Key</DialogTitle>
                    <DialogDescription>
                        Enter a name for your new API key.
                    </DialogDescription>
                </DialogHeader>
                <TooltipProvider>
                    <Form {...apiKeyForm}>
                        <form onSubmit={apiKeyForm.handleSubmit(onApiKeySubmit)} className="space-y-8">
                            <FormField
                                control={apiKeyForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FormLabel className="text-black flex items-center gap-1">
                                                    API Key Name<InfoIcon size={12} className='text-gray-400' />
                                                </FormLabel>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                This name will help you identify this API key later.
                                            </TooltipContent>
                                        </Tooltip>
                                        <FormControl>
                                            <Input placeholder="Enter API key name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={apiKeyForm.control}
                                name="permissions"
                                render={({ field }) => (
                                    <FormItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FormLabel className="text-black flex items-center gap-1">
                                                    Permissions<InfoIcon size={12} className='text-gray-400' />
                                                </FormLabel>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                What this API key can do. Select all that apply
                                            </TooltipContent>
                                        </Tooltip>
                                        <FormControl>
                                            <select
                                                {...field}
                                                multiple
                                                onChange={(e) => {
                                                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                                    field.onChange(selectedOptions);
                                                }}
                                                className="w-full border border-gray-300 rounded-md"
                                            >
                                                {permissionsList.map(permission => (
                                                    <option className='border' key={permission.value} value={permission.value}>
                                                        {permission.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={apiKeyForm.control}
                                name="expiresAt"
                                render={({ field }) => (
                                    <FormItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FormLabel className="text-black flex items-center gap-1">
                                                    Expires At<InfoIcon size={12} className='text-gray-400' />
                                                </FormLabel>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                How long should this API key be valid?
                                            </TooltipContent>
                                        </Tooltip>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full text-black">
                                                <SelectValue placeholder="Select expiration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="90">90 days</SelectItem>
                                                <SelectItem value="1095">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={apiKeyForm.control}
                                name="ipRestrictions"
                                render={({ field }) => (
                                    <FormItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FormLabel className="text-black flex items-center gap-1">
                                                    Allowed IPs<InfoIcon size={12} className='text-gray-400' />
                                                </FormLabel>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                From what IPs should we allow requests using this API?
                                            </TooltipContent>
                                        </Tooltip>
                                        <FormControl>
                                            <Input className='text-black' placeholder="Enter IP addresses (comma-separated)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={apiKeyForm.control}
                                name="projectId"
                                render={({ field }) => (
                                    <FormItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FormLabel className="text-black flex items-center gap-1">
                                                    Project<InfoIcon size={12} className='text-gray-400' />
                                                </FormLabel>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                The API key must be associated with a project.
                                            </TooltipContent>
                                        </Tooltip>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full text-black">
                                                <SelectValue placeholder="Select a project" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {isProjectsLoading ? (
                                                        <p>Loading...</p>
                                                    ) : (
                                                        projects?.projects?.map((item: IProject, index: number) => (
                                                            <SelectItem key={index} value={item.id}>
                                                                {item.name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Create API Key</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </TooltipProvider>
            </DialogContent>
        </Dialog>
    )
}

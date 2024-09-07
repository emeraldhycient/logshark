'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {  ArrowLeft, Plus, Trash, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from 'next/link'
import Header from '@/components/common/dashboard/header'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Alert name must be at least 2 characters.",
    }),
    description: z.string().optional(),
    type: z.enum(["error", "warning", "info"]),
    metric: z.string().min(1, {
        message: "Please select a metric.",
    }),
    threshold: z.coerce.number().min(0, {
        message: "Threshold must be a positive number.",
    }),
    condition: z.enum(["greater_than", "less_than", "equal_to"]),
    duration: z.coerce.number().min(1, {
        message: "Duration must be at least 1 minute.",
    }),
    channels: z.array(z.string()).min(1, {
        message: "Select at least one notification channel.",
    }),
    isActive: z.boolean(),
})

export default function CreateAlert() {
    const router = useRouter()
    const [channels, setChannels] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            type: "warning",
            metric: "",
            threshold: 0,
            condition: "greater_than",
            duration: 5,
            channels: [],
            isActive: true,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // Here you would typically send the data to your backend
        router.push('/alerts')
    }

    const addChannel = () => {
        setChannels([...channels, ""])
    }

    const removeChannel = (index: number) => {
        const newChannels = [...channels]
        newChannels.splice(index, 1)
        setChannels(newChannels)
    }

    return (
        <div className="container mx-auto pb-8">
            <Header title='Create Alert' />
            <div className="flex justify-between items-center px-4 mt-2 mb-6">
                <div className="flex items-center">
                    <Link href="/dashboard/alerts">
                        <Button variant="ghost" className="mr-4">
                            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                            <span className='text-gray-500'>Back to Alerts</span>
                        </Button>
                    </Link>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4 text-gray-500" />
                    <span className='text-gray-500'>Export Logs</span>
                </Button>
            </div>

            <div className="px-4">


                <Card>
                    <CardHeader>
                        <CardTitle>Alert Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alert Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter alert name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Give your alert a descriptive name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the purpose of this alert"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alert Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select alert type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="error">Error</SelectItem>
                                                    <SelectItem value="warning">Warning</SelectItem>
                                                    <SelectItem value="info">Info</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="metric"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Metric</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select metric" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cpu_usage">CPU Usage</SelectItem>
                                                    <SelectItem value="memory_usage">Memory Usage</SelectItem>
                                                    <SelectItem value="disk_space">Disk Space</SelectItem>
                                                    <SelectItem value="response_time">Response Time</SelectItem>
                                                    <SelectItem value="error_rate">Error Rate</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex space-x-4">
                                    <FormField
                                        control={form.control}
                                        name="condition"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Condition</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select condition" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="greater_than">Greater than</SelectItem>
                                                        <SelectItem value="less_than">Less than</SelectItem>
                                                        <SelectItem value="equal_to">Equal to</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="threshold"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Threshold</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Duration (minutes)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="channels"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Notification Channels</FormLabel>
                                            <FormControl>
                                                <div className="space-y-2">
                                                    {channels.map((channel, index) => (
                                                        <div key={index} className="flex items-center space-x-2">
                                                            <Input
                                                                value={channel}
                                                                onChange={(e) => {
                                                                    const newChannels = [...channels]
                                                                    newChannels[index] = e.target.value
                                                                    setChannels(newChannels)
                                                                    form.setValue('channels', newChannels.filter(Boolean))
                                                                }}
                                                                placeholder="Enter notification channel"
                                                            />
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeChannel(index)}>
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button type="button" variant="outline" size="sm" onClick={addChannel}>
                                                        <Plus className="h-4 w-4 mr-2" /> Add Channel
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Add email addresses or webhook URLs for notifications.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Activate Alert
                                                </FormLabel>
                                                <FormDescription>
                                                    Enable or disable this alert.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Create Alert</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
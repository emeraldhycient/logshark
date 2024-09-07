'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from "@/hooks/use-toast"
import { Bell, User,Mail, Smartphone, Globe, Shield, Key } from 'lucide-react'
import Header from '@/components/common/dashboard/header'

const profileFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    bio: z.string().max(160).optional(),
    avatar: z.string().optional(),
})

const securityFormSchema = z.object({
    currentPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const notificationFormSchema = z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    weeklyDigest: z.boolean(),
    marketingEmails: z.boolean(),
})

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile")

    const { toast } = useToast()


    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: "johndoe",
            email: "john@example.com",
            bio: "I'm a software engineer passionate about building great products.",
            avatar: "/placeholder.svg?height=100&width=100",
        },
    })

    const securityForm = useForm<z.infer<typeof securityFormSchema>>({
        resolver: zodResolver(securityFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
        resolver: zodResolver(notificationFormSchema),
        defaultValues: {
            emailNotifications: true,
            pushNotifications: false,
            weeklyDigest: true,
            marketingEmails: false,
        },
    })

    function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        console.log(values)
        toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
        })
    }

    function onSecuritySubmit(values: z.infer<typeof securityFormSchema>) {
        console.log(values)

        toast({
            title: "Password changed",
            description: "Your password has been successfully changed.",
        })
    }

    function onNotificationSubmit(values: z.infer<typeof notificationFormSchema>) {
        console.log(values)
        toast({
            title: "Notification preferences updated",
            description: "Your notification preferences have been saved.",
        })
    }

    return (
        <div className="container mx-auto pb-10">
            <Header title="settings"/>
            <div className="flex items-center justify-end mt-2 mr-4 mb-6">
                <Button>Save All Changes</Button>
            </div>
            <div className="flex flex-col md:flex-row px-4 gap-6">
                <Card className="w-full md:w-64 h-fit">
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            <div className="flex flex-col items-center space-y-2">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={profileForm.getValues('avatar')} alt="Profile" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-semibold">{profileForm.getValues('username')}</h2>
                                <p className="text-sm text-muted-foreground">{profileForm.getValues('email')}</p>
                            </div>
                            <Separator />
                            <nav className="space-y-1">
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("profile")}>
                                    <User className="mr-2 h-4 w-4" /> Profile
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("security")}>
                                    <Shield className="mr-2 h-4 w-4" /> Security
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("notifications")}>
                                    <Bell className="mr-2 h-4 w-4" /> Notifications
                                </Button>
                            </nav>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex-1">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile</CardTitle>
                                    <CardDescription>Manage your profile information</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...profileForm}>
                                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                                            <FormField
                                                control={profileForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Username</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="johndoe" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your public display name.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={profileForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="john@example.com" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            We&apos;ll never share your email with anyone else.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={profileForm.control}
                                                name="bio"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Bio</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Tell us about yourself" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Brief description for your profile. Max 160 characters.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Update Profile</Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security</CardTitle>
                                    <CardDescription>Manage your account security</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...securityForm}>
                                        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-8">
                                            <FormField
                                                control={securityForm.control}
                                                name="currentPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Current Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={securityForm.control}
                                                name="newPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>New Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={securityForm.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm New Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Change Password</Button>
                                        </form>
                                    </Form>
                                    <Separator className="my-8" />
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                                        <Button variant="outline">
                                            <Key className="mr-2 h-4 w-4" /> Enable 2FA
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="notifications">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>Manage your notification preferences</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...notificationForm}>
                                        <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-8">
                                            <FormField
                                                control={notificationForm.control}
                                                name="emailNotifications"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">
                                                                <Mail className="mr-2 h-4 w-4 inline-block" />
                                                                Email Notifications
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Receive notifications via email
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
                                            <FormField
                                                control={notificationForm.control}
                                                name="pushNotifications"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">
                                                                <Smartphone className="mr-2 h-4 w-4 inline-block" />
                                                                Push Notifications
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Receive push notifications on your devices
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
                                            <FormField
                                                control={notificationForm.control}
                                                name="weeklyDigest"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">
                                                                <Globe className="mr-2 h-4 w-4 inline-block" />
                                                                Weekly Digest
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Receive a weekly summary of your account activity
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
                                            <FormField
                                                control={notificationForm.control}
                                                name="marketingEmails"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">
                                                                <Mail className="mr-2 h-4 w-4 inline-block" />
                                                                Marketing Emails
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Receive emails about new features and offers
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
                                            <Button type="submit">Save Preferences</Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
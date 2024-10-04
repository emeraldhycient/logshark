// components/Sidebar.tsx
'use client'

import React, { useState } from 'react'
import {
    Activity,
    Layers,
    Settings,
    HelpCircle,
    LogOut,
    BarChart3,
    ServerCrash,
    Users,
    AlertTriangle,
    Key,
    LayoutDashboard,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import OrganizationSelect from '../../OrganizationSelect'
import { signOut } from "next-auth/react"

const sidebarItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', href: '/dashboard' },
    { icon: <BarChart3 />, label: 'Logs', href: '/dashboard/logs' },
    { icon: <ServerCrash />, label: 'Crashlytics', href: '/dashboard/crashes' },
    { icon: <Activity />, label: 'Activities', href: '/dashboard/activities' },
    { icon: <AlertTriangle />, label: 'Alerts', href: '/dashboard/alerts' },
    { icon: <Layers />, label: 'Projects', href: '/dashboard/projects' },
    { icon: <Users />, label: 'Teams', href: '/dashboard/teams' },
    { icon: <Key />, label: 'Usage', href: '/dashboard/usage' },
    { icon: <Settings />, label: 'Settings', href: '/dashboard/setting' },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

    return (
        <aside
            className={`bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg flex flex-col h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-48'
                }`}
        >
            {/* Organization Selection Component */}
            <OrganizationSelect sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

            {/* Navigation Links */}
            <nav className="flex-1 mt-5 overflow-y-auto">
                <TooltipProvider>
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href
                        const linkClasses = `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`
                        return (
                            <Link key={index} href={item.href} className={linkClasses}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        {React.cloneElement(item.icon, { className: 'h-6 w-6' })}
                                    </TooltipTrigger>
                                    {sidebarCollapsed && (
                                        <TooltipContent side="right" align="center">
                                            {item.label}
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                {!sidebarCollapsed && <span className="ml-3 text-md">{item.label}</span>}
                            </Link>
                        )
                    })}
                </TooltipProvider>
            </nav>

            {/* Footer Links */}
            <div className="border-t border-indigo-500 p-4">
                <div className="flex flex-col space-y-2">
                    <TooltipProvider>
                        <Link
                            href="#"
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-700 ${sidebarCollapsed ? 'justify-center' : ''
                                }`}
                        >
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <HelpCircle className="h-6 w-6" />
                                </TooltipTrigger>
                                {sidebarCollapsed && (
                                    <TooltipContent side="right" align="center">
                                        Help & Support
                                    </TooltipContent>
                                )}
                            </Tooltip>
                            {!sidebarCollapsed && <span className="ml-3 text-md">Help & Support</span>}
                        </Link>
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                signOut({ callbackUrl: '/login'})
                            }}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-700 ${sidebarCollapsed ? 'justify-center' : ''
                                }`}
                        >
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <LogOut className="h-6 w-6" />
                                </TooltipTrigger>
                                {sidebarCollapsed && (
                                    <TooltipContent side="right" align="center">
                                        Log Out
                                    </TooltipContent>
                                )}
                            </Tooltip>
                            {!sidebarCollapsed && <span className="ml-3 text-md">Log Out</span>}
                        </Link>
                    </TooltipProvider>
                </div>
            </div>
        </aside>
    )
}

// components/Sidebar.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {Activity, Layers, Settings, HelpCircle, LogOut, ChartNetwork, ServerCrash, Boxes, MailWarningIcon, KeyIcon, LayoutPanelTop, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
    {
        icon: <LayoutPanelTop className="h-5 w-5" />, label: 'Dashboard', href: '/dashboard'
    },
    { icon: <ChartNetwork className="h-5 w-5" />, label: 'Logs', href: '/dashboard/logs' },
    { icon: <ServerCrash className="h-5 w-5" />, label: 'Crashlytics', href: '/dashboard/crashes' },
    { icon: <Activity className="h-5 w-5" />, label: 'Activities', href: '/dashboard/activities' },
    { icon: <MailWarningIcon className="h-5 w-5" />, label: 'Alerts', href: '/dashboard/alerts' },
    { icon: <Layers className="h-5 w-5" />, label: 'Projects', href: '/dashboard/projects' },
    { icon: <Boxes className="h-5 w-5" />, label: 'Teams', href: '/dashboard/teams' },
    { icon: <KeyIcon className="h-5 w-5" />, label: 'Usage', href: '/dashboard/usage' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/dashboard/setting' },
]

export default function Sidebar() {
    const pathname = usePathname()
    console.log({ pathname })
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <>
            <aside className={`bg-white shadow-md px-4 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    {!sidebarCollapsed && <h2 className="text-xl font-semibold text-gray-800">LogShark</h2>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="ml-auto"
                    >
                        {sidebarCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                    </Button>
                </div>
                <nav className="mt-5">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${sidebarCollapsed ? 'justify-center' : ''}`}
                        >
                            {item.icon}
                            {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-0  py-4 border-t">
                    <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        {!sidebarCollapsed && <span className="ml-2"> Help & Support</span>}
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <LogOut className="h-5 w-5 mr-2" />
                        {!sidebarCollapsed && <span className="ml-2">Log Out</span>}


                    </Link>
                </div>
            </aside>
        </>
    )
}

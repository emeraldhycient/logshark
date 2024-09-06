// components/Sidebar.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Activity, Layers, Settings, HelpCircle, LogOut, ChartNetwork, ServerCrash, Boxes, MailWarningIcon, KeyIcon, LayoutPanelTop } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
    {
        icon: <LayoutPanelTop className="h-5 w-5" />, label: 'Dashboard', href: '/dashboard'
    },
    { icon: <ChartNetwork className="h-5 w-5" />, label: 'Logs', href: '/dashboard/logs' },
    { icon: <ServerCrash className="h-5 w-5" />, label: 'Crashlytics', href: '/dashboard/crashes' },
    { icon: <Activity className="h-5 w-5" />, label: 'Activities', href: '/dashboard/activities' },
    { icon: <MailWarningIcon className="h-5 w-5" />, label: 'Alerts', href: '/dashboard/Alerts' },
    { icon: <Layers className="h-5 w-5" />, label: 'Projects', href: '/dashboard/projects' },
    { icon: <Boxes className="h-5 w-5" />, label: 'Teams', href: '/dashboard/teams' },
    { icon: <KeyIcon className="h-5 w-5" />, label: 'Usage', href: '/dashboard/usage' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/dashboard/setting' },
]

export default function Sidebar() {
    const pathname = usePathname()
    console.log({ pathname })
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            {/* Toggle Button */}
            {!sidebarOpen && (
                <div className="p-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6 text-gray-500" />
                    </Button>
                </div>
            )
            }

            {/* Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:relative lg:translate-x-0"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">LogShark</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden"
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </Button>
                        </div>
                        <nav className="mt-5 px-4 overflow-y-auto h-fit">
                            {sidebarItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center px-4 mb-4 rounded  py-2 text-gray-700 hover:bg-gray-200 ${pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="absolute bottom-0 w-full p-4 border-t">
                            <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                                <HelpCircle className="h-5 w-5 mr-2" /> Help & Support
                            </Link>
                            <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                                <LogOut className="h-5 w-5 mr-2" /> Log Out
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    )
}

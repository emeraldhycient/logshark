// components/Sidebar.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Home, Activity, Layers, Settings, HelpCircle, LogOut } from 'lucide-react'
import Link from 'next/link'

const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', href: '/' },
    { icon: <Activity className="h-5 w-5" />, label: 'Analytics', href: '#' },
    { icon: <Layers className="h-5 w-5" />, label: 'Projects', href: '#' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '#' },
]

export default function Sidebar() {
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
                        <nav className="mt-5">
                            {sidebarItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
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
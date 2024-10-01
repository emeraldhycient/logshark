'use client'

import React, { useState } from 'react'
import {
    Bell,
    Users,
    Activity,
    AlertTriangle,
    Settings,
    ChevronDown,
    Menu,
    Search,
    ArrowUpRight,
    Sun,
    Moon,
    DollarSign,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title as ChartTitle,
    Tooltip as ChartTooltip,
    Legend as ChartLegend,
    ArcElement,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ChartTitle,
    ChartTooltip,
    ChartLegend,
    ArcElement
)

export default function Dashboard() {
    const [darkMode, setDarkMode] = useState(false)

    

    // Sample data for charts
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Active Users',
                data: [1200, 1900, 3000, 5000, 2300, 3400, 4200],
                fill: true,
                backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                borderColor: darkMode ? 'rgba(79, 70, 229, 1)' : 'rgba(99, 102, 241, 1)',
                tension: 0.4,
            },
        ],
    }

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    color: darkMode ? '#D1D5DB' : '#6B7280',
                },
                grid: {
                    color: darkMode ? '#374151' : '#E5E7EB',
                },
            },
            x: {
                ticks: {
                    color: darkMode ? '#D1D5DB' : '#6B7280',
                },
                grid: {
                    display: false,
                },
            },
        },
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            </Button>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDarkMode(!darkMode)}
                                className="hidden md:inline-flex"
                            >
                                {darkMode ? (
                                    <Sun className="w-6 h-6 text-yellow-400" />
                                ) : (
                                    <Moon className="w-6 h-6 text-gray-800" />
                                )}
                            </Button>
                            <div className="relative hidden md:block">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="pr-10 w-80 dark:bg-gray-700 dark:text-gray-200"
                                />
                                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                            </div>
                            <Button variant="ghost" size="icon">
                                <Bell className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Settings className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            </Button>
                            <div className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <ChevronDown className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Dashboard */}
                <main className="flex-1 overflow-y-auto">
                    <div className="px-6 py-8">
                        {/* Welcome Message */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                                Welcome back, <span className="text-indigo-600 dark:text-indigo-400">Alex</span>!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Here&apos;s what&apos;s happening with your projects today.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex items-center justify-between pb-3">
                                    <CardTitle className="text-gray-600 dark:text-gray-400">Total Revenue</CardTitle>
                                    <div className="p-2 bg-indigo-500 rounded-full">
                                        <DollarSign className="w-5 h-5 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">$24,500</h3>
                                    <p className="text-sm text-green-500 flex items-center mt-2">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        15% increase
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex items-center justify-between pb-3">
                                    <CardTitle className="text-gray-600 dark:text-gray-400">New Users</CardTitle>
                                    <div className="p-2 bg-green-500 rounded-full">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">1,254</h3>
                                    <p className="text-sm text-green-500 flex items-center mt-2">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        8% increase
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex items-center justify-between pb-3">
                                    <CardTitle className="text-gray-600 dark:text-gray-400">Server Uptime</CardTitle>
                                    <div className="p-2 bg-yellow-500 rounded-full">
                                        <Activity className="w-5 h-5 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">99.99%</h3>
                                    <p className="text-sm text-green-500 flex items-center mt-2">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        Stable
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex items-center justify-between pb-3">
                                    <CardTitle className="text-gray-600 dark:text-gray-400">Error Rate</CardTitle>
                                    <div className="p-2 bg-red-500 rounded-full">
                                        <AlertTriangle className="w-5 h-5 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">0.5%</h3>
                                    <p className="text-sm text-red-500 flex items-center mt-2">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        2% increase
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts */}
                        <div className="grid gap-6 mb-8 md:grid-cols-2">
                            {/* Line Chart */}
                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 dark:text-gray-200">
                                        Active Users Over Time
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Line data={lineChartData} options={lineChartOptions} />
                                </CardContent>
                            </Card>

                            {/* Pie Chart */}
                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 dark:text-gray-200">User Demographics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Replace with your Pie Chart component */}
                                    <div className="h-64 flex items-center justify-center">
                                        <p className="text-gray-500 dark:text-gray-400">Pie Chart Placeholder</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activities and Notifications */}
                        <div className="grid gap-6 mb-8 md:grid-cols-2">
                            {/* Recent Activities */}
                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 dark:text-gray-200">Recent Activities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-64">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="flex items-start mb-4 last:mb-0">
                                                <div className="flex-shrink-0">
                                                    <Avatar>
                                                        <AvatarImage
                                                            src={`/avatars/user${i + 1}.jpg`}
                                                            alt={`User ${i + 1}`}
                                                        />
                                                        <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                        User {i + 1} performed an action
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {['Just now', '5 mins ago', '1 hr ago', 'Yesterday'][i % 4]}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Notifications */}
                            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 dark:text-gray-200">Notifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-64">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start mb-4 last:mb-0 p-3 bg-indigo-50 dark:bg-indigo-900 rounded-md"
                                            >
                                                <Bell className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mr-3 mt-1" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                                                        Notification {i + 1}
                                                    </p>
                                                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                                                        This is the detail of notification {i + 1}.
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Projects Overview */}
                        <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow mb-8">
                            <CardHeader>
                                <CardTitle className="text-gray-800 dark:text-gray-200">Projects Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                                                    Project
                                                </th>
                                                <th className="py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                                                    Status
                                                </th>
                                                <th className="py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                                                    Progress
                                                </th>
                                                <th className="py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(5)].map((_, i) => (
                                                <tr
                                                    key={i}
                                                    className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                                                >
                                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                                                        Project {i + 1}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400"
                                                        >
                                                            Active
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Progress
                                                            value={Math.floor(Math.random() * 100)}
                                                            className="w-40"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Button variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Metrics */}
                        <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-gray-800 dark:text-gray-200">Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="responseTime">
                                    <TabsList className="mb-4">
                                        <TabsTrigger value="responseTime">Response Time</TabsTrigger>
                                        <TabsTrigger value="throughput">Throughput</TabsTrigger>
                                        <TabsTrigger value="errorRate">Error Rate</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="responseTime">
                                        {/* Replace with your Bar Chart component */}
                                        <div className="h-64 flex items-center justify-center">
                                            <p className="text-gray-500 dark:text-gray-400">Bar Chart Placeholder</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="throughput">
                                        {/* Replace with your Bar Chart component */}
                                        <div className="h-64 flex items-center justify-center">
                                            <p className="text-gray-500 dark:text-gray-400">Bar Chart Placeholder</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="errorRate">
                                        {/* Replace with your Bar Chart component */}
                                        <div className="h-64 flex items-center justify-center">
                                            <p className="text-gray-500 dark:text-gray-400">Bar Chart Placeholder</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </main>

               
            </div>
        </div>
    )
}

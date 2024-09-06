'use client'
import { useQuery } from '@tanstack/react-query'
import {
    BarChart,
    Users,
    Clock,
    PhoneCall,
    TrendingUp,
    Zap,
    Bell,
    User,
} from 'lucide-react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Metric } from '@/components/common/dashboard/metrics'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

// Type definitions for the dashboard data
interface Metric {
    id: string
    name: string
    value: number
    icon: React.ReactNode
}

interface TrafficData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor: string
        tension: number
    }[]
}

interface DeviceDistribution {
    labels: string[]
    datasets: {
        data: number[]
        backgroundColor: string[]
    }[]
}

interface UserEngagement {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        backgroundColor: string
    }[]
}

interface Alert {
    id: string
    message: string
    type: 'warning' | 'error'
}

interface DashboardData {
    metrics: Metric[]
    trafficData: TrafficData
    deviceDistribution: DeviceDistribution
    userEngagement: UserEngagement
    alerts: Alert[]
}

const fetchDashboardData = async (): Promise<DashboardData> => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
        metrics: [
            { id: '1', name: 'Total Page Views', value: 1234567, icon: <BarChart className="h-6 w-6" /> },
            { id: '2', name: 'Average Session Duration', value: 245, icon: <Clock className="h-6 w-6" /> },
            { id: '3', name: 'API Call Volume', value: 987654, icon: <PhoneCall className="h-6 w-6" /> },
            { id: '4', name: 'Conversion Rate', value: 3.45, icon: <TrendingUp className="h-6 w-6" /> },
            { id: '5', name: 'Custom Events Completed', value: 56789, icon: <Zap className="h-6 w-6" /> },
            { id: '6', name: 'Active Users', value: 98765, icon: <Users className="h-6 w-6" /> },
        ],
        trafficData: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'Traffic',
                    data: [1000, 1200, 1800, 2400, 2200, 1800],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        },
        deviceDistribution: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [
                {
                    data: [60, 30, 10],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        },
        userEngagement: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'User Engagement',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }
            ]
        },
        alerts: [
            { id: '1', message: 'API response time exceeded threshold', type: 'warning' },
            { id: '2', message: 'High error rate detected in user authentication', type: 'error' },
        ]
    }
}

export default function Dashboard() {
    const { data, isLoading, error } = useQuery<DashboardData>({
        queryKey: ['dashboardData'],
        queryFn: fetchDashboardData,
    })

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
    if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

    // const sidebarItems = [
    //     { icon: <Home className="h-5 w-5" />, label: 'Dashboard', href: '#' },
    //     { icon: <Activity className="h-5 w-5" />, label: 'Analytics', href: '#' },
    //     { icon: <Layers className="h-5 w-5" />, label: 'Projects', href: '#' },
    //     { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '#' },
    // ]

    return (
        <section>
            <header className="bg-white shadow-sm z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Button variant="ghost" size="icon">
                                    <Bell className="h-5 w-5 text-gray-500" />
                                </Button>
                            </div>
                            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="mr-4 w-64"
                                />
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5 text-gray-500" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className='p-4'>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to LogShark</h2>
                <p className="text-gray-600 mb-8">Real-time insights for your websites, APIs, and mobile apps.</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {data!.metrics.map((metric) => (
                        <Metric key={metric.id} {...metric} />
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Real-time Traffic</h3>
                        <div style={{ height: '300px' }}>
                            <Line data={data!.trafficData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Device Distribution</h3>
                        <div style={{ height: '300px' }}>
                            <Pie data={data!.deviceDistribution} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                {/* User Engagement */}
                <div className="bg-white overflow-hidden shadow rounded-lg mb-8 p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">User Engagement</h3>
                    <div style={{ height: '300px' }}>
                        <Bar
                            data={data!.userEngagement}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Critical Alerts</h3>
                    {data!.alerts.map((alert) => (
                        <Alert key={alert.id} variant={alert.type === 'error' ? 'destructive' : 'default'} className="mb-2">
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    ))}
                </div>
            </section>
        </section>
    )
}

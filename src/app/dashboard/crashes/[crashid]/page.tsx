'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Download, Clock, Repeat, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import Header from '@/components/common/dashboard/header'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

interface CrashDetail {
    id: string
    errorMessage: string
    occurrences: number
    lastSeen: string
    affectedUsers: number
    platform: string
    stackTrace: string
    deviceInfo: {
        os: string
        version: string
        device: string
    }
    occurrencesByDay: {
        labels: string[]
        datasets: {
            label: string
            data: number[]
            backgroundColor: string
        }[]
    }
}

const fetchCrashDetail = async (id: string): Promise<CrashDetail> => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
        id,
        errorMessage: 'Null pointer exception in UserService',
        occurrences: 156,
        lastSeen: '2023-05-28 14:32:15',
        affectedUsers: 89,
        platform: 'Android',
        stackTrace: `java.lang.NullPointerException: Attempt to invoke virtual method 'java.lang.String com.example.User.getName()' on a null object reference
    at com.example.UserService.processUser(UserService.java:42)
    at com.example.MainActivity.onButtonClick(MainActivity.java:23)
    at android.view.View.performClick(View.java:5637)
    at android.view.View$PerformClick.run(View.java:22429)
    at android.os.Handler.handleCallback(Handler.java:751)
    at android.os.Handler.dispatchMessage(Handler.java:95)
    at android.os.Looper.loop(Looper.java:154)
    at android.app.ActivityThread.main(ActivityThread.java:6119)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:886)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:776)`,
        deviceInfo: {
            os: 'Android',
            version: '11',
            device: 'Samsung Galaxy S20'
        },
        occurrencesByDay: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Occurrences',
                data: [12, 19, 15, 25, 22, 30, 33],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            }]
        }
    }
}

export default function CrashDetails({ params }: { params: { id: string } }) {
    const { data: crash, isLoading, error } = useQuery<CrashDetail>({
        queryKey: ['crashDetail', params.id],
        queryFn: () => fetchCrashDetail(params.id),
    })

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
    if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

    return (
        <div className="container mx-auto  pb-8">
            <Header title='Crash details' />
            <div className="flex justify-between items-center px-4 mt-2 mb-6">
                <div className="flex items-center">
                    <Link href="/dashboard/crashes">
                        <Button variant="ghost" className="mr-4">
                            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                            <span className='text-gray-500'>Back to Crashes</span>
                        </Button>
                    </Link>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4 text-gray-500" />
                    <span className='text-gray-500'>Export Logs</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Occurrences</CardTitle>
                        <Repeat className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{crash?.occurrences}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Affected Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{crash?.affectedUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Seen</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{crash?.lastSeen}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Crash Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <span className="font-semibold">Error Message:</span>
                                <p className="mt-1">{crash?.errorMessage}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Platform:</span>
                                <p className="mt-1">{crash?.platform}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Stack Trace</h3>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                                    <code>{crash?.stackTrace}</code>
                                </pre>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Device Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <span className="font-semibold">OS:</span>
                                <p className="mt-1">{crash?.deviceInfo.os}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Version:</span>
                                <p className="mt-1">{crash?.deviceInfo.version}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Device:</span>
                                <p className="mt-1">{crash?.deviceInfo.device}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Occurrences Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    {crash?.occurrencesByDay && (
                        <Bar data={crash.occurrencesByDay} options={{ responsive: true, maintainAspectRatio: false }} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

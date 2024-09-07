'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Download, Clock, Activity, Zap, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Header from '@/components/common/dashboard/header'

interface ActivityDetail {
    id: string
    type: string
    description: string
    timestamp: string
    user: string
    impact: 'low' | 'medium' | 'high'
    details: {
        [key: string]: string
    }
    relatedActivities: {
        id: string
        type: string
        timestamp: string
    }[]
}

const fetchActivityDetail = async (id: string): Promise<ActivityDetail> => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
        id,
        type: 'API Call',
        description: 'GET /api/users',
        timestamp: '2023-05-28 14:30:05',
        user: 'system',
        impact: 'low',
        details: {
            'Method': 'GET',
            'Endpoint': '/api/users',
            'Status Code': '200',
            'Response Time': '120ms',
            'IP Address': '192.168.1.1',
            'User Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        relatedActivities: [
            { id: '1', type: 'Database Query', timestamp: '2023-05-28 14:30:06' },
            { id: '2', type: 'Cache Update', timestamp: '2023-05-28 14:30:07' },
            { id: '3', type: 'Log Entry', timestamp: '2023-05-28 14:30:08' }
        ]
    }
}

export default function ActivityDetails({ params }: { params: { id: string } }) {
    const { data: activity, isLoading, error } = useQuery<ActivityDetail>({
        queryKey: ['activityDetail', params.id],
        queryFn: () => fetchActivityDetail(params.id),
    })

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
    if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

    return (
        <div className="container mx-auto  pb-8">
            <Header title='Activity Details' />
            <div className="flex justify-between items-center px-4 mt-2 mb-6">
                <div className="flex items-center">
                    <Link href="/dashboard/activities">
                        <Button variant="ghost" className="mr-4">
                            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                            <span className='text-gray-500'>Back to Activities</span>
                        </Button>
                    </Link>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4 text-gray-500" />
                    <span className='text-gray-500'>Export Logs</span>
                </Button>
            </div>
            <div className="px-4">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Activity Type</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activity?.type}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Timestamp</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activity?.timestamp}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Impact</CardTitle>
                            <Zap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${activity?.impact === 'high' ? 'text-red-600' :
                                activity?.impact === 'medium' ? 'text-yellow-600' :
                                    'text-green-600'
                                }`}>
                                {activity?.impact ? (activity?.impact.charAt(0).toUpperCase() + activity?.impact.slice(1)) : ""}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Activity Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-semibold">Description:</span>
                                    <p className="mt-1">{activity?.description}</p>
                                </div>
                                <div>
                                    <span className="font-semibold">User:</span>
                                    <p className="mt-1">{activity?.user}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Details</h3>
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {Object.entries(activity?.details || {}).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Related Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {activity?.relatedActivities.map((relatedActivity) => (
                                    <li key={relatedActivity.id} className="flex items-start">
                                        <Server className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">{relatedActivity.type}</p>
                                            <p className="text-sm text-gray-500">{relatedActivity.timestamp}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
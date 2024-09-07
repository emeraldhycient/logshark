'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Download, Clock, Server, Code, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Header from '@/components/common/dashboard/header'

interface LogDetail {
    id: string
    timestamp: string
    level: 'info' | 'warning' | 'error'
    message: string
    source: string
    stackTrace: string
    metadata: {
        userId?: string
        requestId?: string
        ip?: string
    }
}

const fetchLogDetail = async (id: string): Promise<LogDetail> => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
        id,
        timestamp: '2023-05-28 14:32:15',
        level: 'error',
        message: 'Failed to connect to database',
        source: '/api/user/me',
        stackTrace: `Error: Failed to connect to database
    at Database.connect (/app/src/database.ts:42:7)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async UserController.getUser (/app/src/controllers/user.ts:15:5)`,
        metadata: {
            userId: 'user_123',
            requestId: 'req_abc456',
            ip: '192.168.1.1'
        }
    }
}

export default function LogDetails({ params }: { params: { id: string } }) {
    const { data: log, isLoading, error } = useQuery<LogDetail>({
        queryKey: ['logDetail', params.id],
        queryFn: () => fetchLogDetail(params.id),
    })

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
    if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

    return (
        <div className="container mx-auto  pb-8">
            <Header title='Log Details' />
            <div className="flex justify-between items-center px-4 mt-2 mb-6">
                <div className="flex items-center">
                    <Link href="/dashboard/logs">
                        <Button variant="ghost" className="mr-4">
                            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                            <span className='text-gray-500'>Back to logs</span>
                        </Button>
                    </Link>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4 text-gray-500" />
                    <span className='text-gray-500'>Export Logs</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Log Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="font-semibold mr-2">Timestamp:</span>
                                {log?.timestamp}
                            </div>
                            <div className="flex items-center">
                                <Server className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="font-semibold mr-2">Source:</span>
                                {log?.source}
                            </div>
                            <div className="flex items-start">
                                <MessageSquare className="h-5 w-5 mr-2 mt-1 text-gray-500" />
                                <div>
                                    <span className="font-semibold mr-2">Message:</span>
                                    <p className="mt-1">{log?.message}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center">
                                    <Code className="h-5 w-5 mr-2 text-gray-500" />
                                    Stack Trace
                                </h3>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                                    <code>{log?.stackTrace}</code>
                                </pre>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(log?.metadata || {}).map(([key, value]) => (
                                <div key={key}>
                                    <span className="font-semibold mr-2">{key}:</span>
                                    {value}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import Header from '@/components/common/dashboard/header'

interface Log {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
  source: string
}

interface LogViewsData {
  logs: Log[]
  totalLogs: number
  currentPage: number
  totalPages: number
}

const fetchLogs = async (page: number): Promise<LogViewsData> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    logs: [
      { id: '1', timestamp: '2023-05-28 14:32:15', level: 'error', message: 'Failed to connect to database', source: '/api/user/me' },
      { id: '2', timestamp: '2023-05-28 14:30:05', level: 'warning', message: 'High memory usage detected', source: '/api/analytics' },
      { id: '3', timestamp: '2023-05-28 14:28:30', level: 'info', message: 'User authentication successful', source: '/api/auth' },
      { id: '4', timestamp: '2023-05-28 14:25:12', level: 'error', message: 'Invalid API key', source: '/api/data' },
      { id: '5', timestamp: '2023-05-28 14:20:45', level: 'info', message: 'New user registered', source: '/api/user/register' },
    ],
    totalLogs: 100,
    currentPage: page,
    totalPages: 20
  }
}

export default function LogViews() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState<string | undefined>()

  const { data, isLoading, error } = useQuery<LogViewsData>({
    queryKey: ['logs', currentPage],
    queryFn: () => fetchLogs(currentPage),
  })

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

  const filteredLogs = data?.logs.filter(log =>
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterLevel || log.level === filterLevel)
  )

  return (
    <div className="container mx-auto  pb-8">
      <Header title='Logs' />
      <div className="px-4">
        <div className="flex justify-end items-center pr-4 mb-6 mt-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4 text-gray-500" />
            <span className='text-gray-500'>Export Logs</span>
          </Button>
        </div>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${log.level === 'error' ? 'bg-red-100 text-red-800' :
                        log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                        {log.level}
                      </span>
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.source}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/logs/${log.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" /> View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing {(data?.currentPage ? (data?.currentPage - 1) : 1) * 5 + 1} to {Math.min(data?.currentPage ? data?.currentPage * 5 : 1, data?.totalLogs || 0)} of {data?.totalLogs} results
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, data?.totalPages || 1))}
              disabled={currentPage === data?.totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
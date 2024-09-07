'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  AlertTriangle,
  Clock
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
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Header from '@/components/common/dashboard/header'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface AlertLog {
  id: string
  alertName: string
  type: 'error' | 'warning' | 'info'
  message: string
  timestamp: string
  status: 'active' | 'resolved'
}

interface AlertLogsData {
  logs: AlertLog[]
  totalLogs: number
  currentPage: number
  totalPages: number
  alertTrend: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      tension: number
    }[]
  }
}

const fetchAlertLogs = async (page: number): Promise<AlertLogsData> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    logs: [
      { id: '1', alertName: 'High CPU Usage', type: 'warning', message: 'CPU usage exceeded 90%', timestamp: '2023-05-28 14:32:15', status: 'active' },
      { id: '2', alertName: 'API Error Rate', type: 'error', message: 'Error rate above 5%', timestamp: '2023-05-28 14:30:05', status: 'active' },
      { id: '3', alertName: 'Low Disk Space', type: 'warning', message: 'Disk space below 10%', timestamp: '2023-05-28 14:28:30', status: 'resolved' },
      { id: '4', alertName: 'High Memory Usage', type: 'info', message: 'Memory usage at 80%', timestamp: '2023-05-28 14:25:12', status: 'active' },
      { id: '5', alertName: 'Database Connectivity', type: 'error', message: 'Database connection failed', timestamp: '2023-05-28 14:20:45', status: 'resolved' },
    ],
    totalLogs: 100,
    currentPage: page,
    totalPages: 20,
    alertTrend: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [{
        label: 'Alert Count',
        data: [5, 8, 12, 15, 10, 7],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }]
    }
  }
}

export default function AlertLogs() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string | undefined>()

  const { data, isLoading, error } = useQuery<AlertLogsData>({
    queryKey: ['alertLogs', currentPage],
    queryFn: () => fetchAlertLogs(currentPage),
  })

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

  const filteredLogs = data?.logs.filter(log =>
    log.alertName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterType || log.type === filterType)
  )

  return (
    <div className="container mx-auto  pb-8">
      <Header title='Alerts'/>
      <div className="flex justify-end px-4 py-2 items-center mb-6">
        <div className="space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4 text-gray-500" />
            <span className='text-gray-500'>Export Logs</span>
          </Button>
          <Link href="/dashboard/alerts/create">
            <Button>
              <Bell className="mr-2 h-4 w-4" /> Create Alert
            </Button>
          </Link>
        </div>
      </div>
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalLogs}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.logs.filter(log => log.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45m</div>
              <p className="text-xs text-muted-foreground">-10m from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Alert Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={data!.alertTrend} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search alerts..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Types</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.alertName}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${log.type === 'error' ? 'bg-red-100 text-red-800' :
                        log.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                        {log.type}
                      </span>
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${log.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {log.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing {(data?.currentPage ? data?.currentPage : 1 - 1) * 5 + 1} to {Math.min(data?.currentPage ? data?.currentPage * 5 : 1, data?.totalLogs || 0)} of {data?.totalLogs} results
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
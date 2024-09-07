'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Activity,
  Users,
  Clock,
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

interface ActivityData {
  id: string
  type: string
  description: string
  timestamp: string
  user: string
  impact: 'low' | 'medium' | 'high'
}

interface ActivitiesData {
  activities: ActivityData[]
  totalActivities: number
  currentPage: number
  totalPages: number
  activityTrend: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      tension: number
    }[]
  }
}

const fetchActivities = async (page: number): Promise<ActivitiesData> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    activities: [
      { id: '1', type: 'User Login', description: 'User logged in successfully', timestamp: '2023-05-28 14:32:15', user: 'john@example.com', impact: 'low' },
      { id: '2', type: 'API Call', description: 'GET /api/users', timestamp: '2023-05-28 14:30:05', user: 'system', impact: 'low' },
      { id: '3', type: 'Database Query', description: 'SELECT * FROM users', timestamp: '2023-05-28 14:28:30', user: 'system', impact: 'medium' },
      { id: '4', type: 'Error', description: 'Failed to process payment', timestamp: '2023-05-28 14:25:12', user: 'jane@example.com', impact: 'high' },
      { id: '5', type: 'User Registration', description: 'New user registered', timestamp: '2023-05-28 14:20:45', user: 'newuser@example.com', impact: 'low' },
    ],
    totalActivities: 100,
    currentPage: page,
    totalPages: 20,
    activityTrend: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [{
        label: 'Activity Count',
        data: [10, 15, 30, 50, 40, 25],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  }
}

export default function Activities() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string | undefined>()

  const { data, isLoading, error } = useQuery<ActivitiesData>({
    queryKey: ['activities', currentPage],
    queryFn: () => fetchActivities(currentPage),
  })

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

  const filteredActivities = data?.activities.filter(activity =>
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterType || activity.type === filterType)
  )

  return (
    <div className="container mx-auto  pb-8">
      <Header title='Activities'/>
  
      <div className="px-4">
        <div className="flex justify-end items-center pr-4 mb-6 mt-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4 text-gray-500" />
            <span className='text-gray-500'>Export Logs</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalActivities}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">250ms</div>
              <p className="text-xs text-muted-foreground">-10ms from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={data!.activityTrend} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search activities..."
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
                  <SelectItem value="User Login">User Login</SelectItem>
                  <SelectItem value="API Call">API Call</SelectItem>
                  <SelectItem value="Database Query">Database Query</SelectItem>
                  <SelectItem value="Error">Error</SelectItem>
                  <SelectItem value="User Registration">User Registration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities?.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${activity.impact === 'high' ? 'bg-red-100 text-red-800' :
                        activity.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                        {activity.impact}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/activities/${activity.id}`}>
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
            Showing {(data?.currentPage ? (data?.currentPage - 1) : 1) * 5 + 1}  to {Math.min(data?.currentPage ? data?.currentPage * 5 : 1, data?.totalActivities || 0)} of {data?.totalActivities} results
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
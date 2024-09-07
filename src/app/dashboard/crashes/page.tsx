'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  AlertTriangle,
  Smartphone,
  Users
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

interface CrashData {
  id: string
  errorMessage: string
  occurrences: number
  lastSeen: string
  affectedUsers: number
  platform: string
}

interface CrashAnalyticsData {
  crashes: CrashData[]
  totalCrashes: number
  currentPage: number
  totalPages: number
  crashesByDay: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
    }[]
  }
}

const fetchCrashAnalytics = async (page: number): Promise<CrashAnalyticsData> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    crashes: [
      { id: '1', errorMessage: 'Null pointer exception in UserService', occurrences: 156, lastSeen: '2023-05-28 14:32:15', affectedUsers: 89, platform: 'Android' },
      { id: '2', errorMessage: 'Network timeout in API client', occurrences: 98, lastSeen: '2023-05-28 13:45:22', affectedUsers: 76, platform: 'iOS' },
      { id: '3', errorMessage: 'Uncaught TypeError: Cannot read property', occurrences: 75, lastSeen: '2023-05-28 12:18:03', affectedUsers: 62, platform: 'Web' },
      { id: '4', errorMessage: 'OutOfMemoryError in ImageProcessor', occurrences: 54, lastSeen: '2023-05-28 11:05:47', affectedUsers: 41, platform: 'Android' },
      { id: '5', errorMessage: 'Unhandled Promise rejection', occurrences: 37, lastSeen: '2023-05-28 10:22:31', affectedUsers: 29, platform: 'Web' },
    ],
    totalCrashes: 100,
    currentPage: page,
    totalPages: 20,
    crashesByDay: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Crashes',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }]
    }
  }
}

export default function CrashAnalytics() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlatform, setFilterPlatform] = useState<string | undefined>()

  const { data, isLoading, error } = useQuery<CrashAnalyticsData>({
    queryKey: ['crashAnalytics', currentPage],
    queryFn: () => fetchCrashAnalytics(currentPage),
  })

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

  const filteredCrashes = data?.crashes.filter(crash =>
    crash.errorMessage.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterPlatform || crash.platform === filterPlatform)
  )

  return (
    <div className="container mx-auto  pb-8">
      <Header title='Crashlytics' />
      <div className="flex justify-end items-center pr-4 mb-6 mt-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4 text-gray-500" />
          <span className='text-gray-500'>Export Logs</span>
        </Button>
      </div>
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crashes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalCrashes}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Affected Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">297</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crash-Free Sessions</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">-0.5% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Crashes Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={data!.crashesByDay} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search crashes..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Platforms</SelectItem>
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="iOS">iOS</SelectItem>
                  <SelectItem value="Web">Web</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Crashes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Error Message</TableHead>
                  <TableHead>Occurrences</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Affected Users</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCrashes?.map((crash) => (
                  <TableRow key={crash.id}>
                    <TableCell className="font-medium">{crash.errorMessage}</TableCell>
                    <TableCell>{crash.occurrences}</TableCell>
                    <TableCell>{crash.lastSeen}</TableCell>
                    <TableCell>{crash.affectedUsers}</TableCell>
                    <TableCell>{crash.platform}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/crashes/${crash.id}`}>
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
            Showing {(data?.currentPage ? (data?.currentPage - 1) : 1) * 5 + 1} to {Math.min(data?.currentPage ? data?.currentPage * 5 : 1, data?.totalPages || 0)} of {data?.totalCrashes} results
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
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Folder,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import Header from '@/components/common/dashboard/header'

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  members: number
  logs: number
}

interface ProjectsData {
  projects: Project[]
  totalProjects: number
  currentPage: number
  totalPages: number
}

const fetchProjects = async (page: number): Promise<ProjectsData> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    projects: [
      { id: '1', name: 'E-commerce Platform', description: 'Main website and mobile app', createdAt: '2023-05-28', members: 8, logs: 15000 },
      { id: '2', name: 'CRM System', description: 'Internal customer management', createdAt: '2023-05-25', members: 5, logs: 8000 },
      { id: '3', name: 'Data Analytics Pipeline', description: 'Big data processing system', createdAt: '2023-05-20', members: 3, logs: 25000 },
      { id: '4', name: 'Mobile Game', description: 'iOS and Android puzzle game', createdAt: '2023-05-15', members: 6, logs: 12000 },
      { id: '5', name: 'IoT Dashboard', description: 'Monitoring system for IoT devices', createdAt: '2023-05-10', members: 4, logs: 18000 },
    ],
    totalProjects: 20,
    currentPage: page,
    totalPages: 4
  }
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, error } = useQuery<ProjectsData>({
    queryKey: ['projects', currentPage],
    queryFn: () => fetchProjects(currentPage),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the data to your backend
    setIsModalOpen(false)
    form.reset()
  }

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>

  const filteredProjects = data?.projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-autopy-8">
      <Header title="projects" />
      <div className="flex justify-between px-4 py-2 items-center mb-6">
        <div className=""></div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-gray-600">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter the details for your new project. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your project&apos;s display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Project</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" px-4 ">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalProjects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.projects.reduce((sum, project) => sum + project.members, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.projects.reduce((sum, project) => sum + project.logs, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project_Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Logs</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.logs.toLocaleString()}</TableCell>
                    <TableCell>{project.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing {(data?.currentPage ? data?.currentPage - 1 : 0) * 5 + 1} to {Math.min(data?.currentPage ? data?.currentPage * 5 : 0, data?.totalProjects || 0)} of {data?.totalProjects} results
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
'use client'

import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Folder,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Users,
  Trash,
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
import OrganizationSelect from '@/components/common/OrganizationSelect'
import projectServices from '@/services/projects/index.service'
import { Checkbox } from '@/components/ui/checkbox'
import { DataSourceType } from '@prisma/client'
import { IProject, MutationError } from '@/types'
import { Alert, AlertDescription } from '@/components/ui/alert'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  dataSources: z.array(z.enum(Object.values(DataSourceType) as [string, ...string[]])).nonempty({ message: "Select at least one data source type." }),
})

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedOrganizationValue, setSelectedOrganizationValue] = useState('')
  const [globalError, setGlobalError] = useState<string | null>(null)

  const [isLoading, setisLoading] = useState(false)

  const queryClient = useQueryClient();

  const { data, isLoading: isProjectsLoading, error,isError } = useQuery({
    queryKey: ['projects', currentPage, searchTerm],
    queryFn: () => projectServices.getAllProjects({ currentPage, search: searchTerm }),
  })

  useEffect(() => {
    console.log({error})
    setGlobalError('An Error Occurred!')
  }, [isError])
  

  const createProjectMutation = useMutation({
    mutationFn: projectServices.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      form.reset();
    },
    onError: (error:MutationError) => {
      // Handle error
      console.error(error);
      setGlobalError(error.response?.data?.message || 'An Error Occurred!')

    },
    onSettled: () => {
      setisLoading(false);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectServices.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: MutationError) => {
      console.error(error);
      setGlobalError(error.response?.data?.message || 'An Error Occurred!')

    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      dataSources: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true)
    createProjectMutation.mutate({
      ...values,
      organizationId: selectedOrganizationValue,
      dataSources: values.dataSources as DataSourceType[]
    });
  }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const [totalLogs, setTotalLogs] = useState(0)

  const getLogCount = () => {
    const count = data?.projects?.reduce((acc: number, item: IProject) => acc + (item.events?.length || 0), 0) || 0;
    setTotalLogs(count);
  }

  useEffect(() => {
   getLogCount()
  }, [data])
  

  
  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsDeleteDialogOpen(true);
  };

  // if (error) return <div className="flex items-center justify-center h-screen">An error occurred</div>
  

  return (
    <div className="container mx-auto pb-8">
      <Header title="Projects" />
      <div className="flex justify-between px-4 py-2 items-center mb-6">
        <div></div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-gray-600">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              {globalError && (
                <Alert variant="destructive">
                  <AlertDescription>{globalError}</AlertDescription>
                </Alert>
              )}
              <DialogDescription>
                Enter the details for your new project. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <OrganizationSelect selectedOrganizationValue={selectedOrganizationValue} setSelectedOrganizationValue={(val: string) => setSelectedOrganizationValue(val)} />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataSources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Source Types</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {Object.values(DataSourceType).map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`dataSourceTypes-${type}`}
                                checked={field.value?.includes(type) || false}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, type]);
                                  } else {
                                    field.onChange(currentValues.filter((value) => value !== type));
                                  }
                                }}
                              />
                              <label htmlFor={`dataSourceTypes-${type}`}>{type}</label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {createProjectMutation.isError && (
                  <p className="text-red-500">{createProjectMutation.error?.response?.data?.message || 'An error occurred'}</p>
                )}

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="px-4">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Projects Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.pagination?.totalCount}</div>
            </CardContent>
          </Card>

          {/* Total Members Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>

          {/* Total Logs Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLogs}</div>
            </CardContent>
          </Card>
        </div>
        {globalError && (
          <Alert variant="destructive">
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}
        {/* Search Input */}
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

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Event Count</TableHead>
                  <TableHead>Data Sources</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  !isProjectsLoading ?
                  data?.projects.map((project:IProject) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.eventCount}</TableCell>
                    <TableCell>
                      {project?.dataSources?.map((item: string) => (
                        <span key={item} className="mr-1 text-black bg-gray-200 rounded text-sm px-1 py-1">{item}</span>
                      ))}
                    </TableCell>
                    <TableCell>{project?.organization?.name}</TableCell>
                    <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                          size="sm"
                          className='border-red-500 text-red-500 hover:bg-red-100'
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash className="h-4 w-4" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  )) :
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing {(data?.pagination?.currentPage ? data?.pagination?.currentPage - 1 : 0) * 5 + 1} to {Math.min(data?.pagination?.currentPage ? data?.pagination?.currentPage * 5 : 0, data?.pagination?.totalPages || 0)} of {data?.data?.totalPages} results
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
              disabled={currentPage === data?.pagination?.totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle className='text-red-500'>Confirm Deletion</DialogTitle>
            {globalError && (
              <Alert variant="destructive">
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            )}
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-6">
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              variant="outline"
              className='border-red-500 text-red-500 hover:bg-red-100'
              onClick={() => {
                if (projectToDelete) {
                  deleteProjectMutation.mutate(projectToDelete);
                  setIsDeleteDialogOpen(false);
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

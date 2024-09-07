'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from "@/hooks/use-toast"
import { Copy, Key, Plus } from 'lucide-react'
import Header from '@/components/common/dashboard/header'

const apiKeyFormSchema = z.object({
  name: z.string().min(2, {
    message: "API key name must be at least 2 characters.",
  }),
})

type Subscription = {
  name: string
  price: string
  features: string[]
  current: boolean
}

type ApiKey = {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string
}

const subscriptions: Subscription[] = [
  {
    name: "Basic",
    price: "$9.99/month",
    features: ["100,000 API calls/month", "Basic analytics", "Email support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29.99/month",
    features: ["500,000 API calls/month", "Advanced analytics", "Priority support"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "Custom pricing",
    features: ["Unlimited API calls", "Custom analytics", "24/7 dedicated support"],
    current: false,
  },
]

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_prod_1234567890abcdef",
    createdAt: "2023-05-01",
    lastUsed: "2023-05-28",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "sk_dev_0987654321fedcba",
    createdAt: "2023-05-15",
    lastUsed: "2023-05-27",
  },
]

export default function Usage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys)
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false)
  const { toast } = useToast()

  const apiKeyForm = useForm<z.infer<typeof apiKeyFormSchema>>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      name: "",
    },
  })

  function onApiKeySubmit(values: z.infer<typeof apiKeyFormSchema>) {
    const newApiKey: ApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: values.name,
      key: `sk_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
    }
    setApiKeys([...apiKeys, newApiKey])
    setIsCreateKeyModalOpen(false)
    apiKeyForm.reset()
    toast({
      title: "API Key Created",
      description: "Your new API key has been created successfully.",
    })
  }

  function copyApiKey(key: string) {
    navigator.clipboard.writeText(key)
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  function deleteApiKey(id: string) {
    setApiKeys(apiKeys.filter(key => key.id !== id))
    toast({
      title: "API Key Deleted",
      description: "The API key has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto pb-10">
      <Header title="Usage & Billing" />
      <Card className="mb-8 mx-4 mt-6">
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {subscriptions.map((sub) => (
              <Card key={sub.name} className={sub.current ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{sub.name}</CardTitle>
                  <CardDescription>{sub.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {sub.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {sub.current ? (
                    <Button className="w-full" disabled>Current Plan</Button>
                  ) : (
                    <Button className="w-full">Upgrade</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className='mx-4'>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Dialog open={isCreateKeyModalOpen} onOpenChange={setIsCreateKeyModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New API Key
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Enter a name for your new API key.
                  </DialogDescription>
                </DialogHeader>
                <Form {...apiKeyForm}>
                  <form onSubmit={apiKeyForm.handleSubmit(onApiKeySubmit)} className="space-y-8">
                    <FormField
                      control={apiKeyForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter API key name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This name will help you identify this API key later.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Create API Key</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      {apiKey.key.slice(0, 8)}...{apiKey.key.slice(-4)}
                    </code>
                  </TableCell>
                  <TableCell>{apiKey.createdAt}</TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => copyApiKey(apiKey.key)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteApiKey(apiKey.id)}>
                      <Key className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
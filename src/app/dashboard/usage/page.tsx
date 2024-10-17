'use client'

import { Button } from '@/components/ui/button'
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"
import { Copy, Key } from 'lucide-react'
import Header from '@/components/common/dashboard/header'
import CreateApiKey from '@/components/usage/createApiKey'
import { apiKeyService } from '@/services/apikey/apiKey.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IApiKey } from '@/types'
import dynamic from 'next/dynamic'
// import { m } from 'framer-motion'
const PricingSection = dynamic(() => import('@/components/landing-2/PricingSection'), { ssr: false })


// type Subscription = {
//   name: string
//   price: string
//   features: string[]
//   current: boolean
// }



// const subscriptions: Subscription[] = [
//   {
//     name: "Basic",
//     price: "$9.99/month",
//     features: ["100,000 API calls/month", "Basic analytics", "Email support"],
//     current: false,
//   },
//   {
//     name: "Pro",
//     price: "$29.99/month",
//     features: ["500,000 API calls/month", "Advanced analytics", "Priority support"],
//     current: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom pricing",
//     features: ["Unlimited API calls", "Custom analytics", "24/7 dedicated support"],
//     current: false,
//   },
// ]

export default function Usage() {
  const { toast } = useToast()



  function copyApiKey(key: string) {
    navigator.clipboard.writeText(key)
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const mutate = useMutation({
    mutationFn: (id: string) => apiKeyService.deleteApiKey(id),
    onSuccess: () => {
      toast({
        variant: "destructive",
        title: "API Key Deleted",
        description: "The API key has been deleted successfully.",
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  })

  function deleteApiKey(id: string) {
    mutate.mutate(id)
    toast({
      title: "API Key Deleted",
      description: "The API key has been deleted successfully.",
    })
  }

  const { data: apiKeys, isLoading, error, isError } = useQuery({
    queryKey: ['apiKeys'],
    queryFn: () => apiKeyService.getApiKeys(),
  })


  return (
    <div className="container mx-auto pb-10">
      <Header title="Usage & Billing" />
      <Card className="mb-8 mx-4 mt-6">
        <CardHeader>
          <CardTitle>Upgrade Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        {/* <CardContent>
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
        </CardContent> */}
        <PricingSection showFooter={false} showHeader={false} />
      </Card>

      <Card className='mx-4'>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateApiKey />
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-red-500">{error.message}</TableCell>
                </TableRow>
              ) : apiKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No API Keys available.</TableCell>
                </TableRow>
              ) : (
                apiKeys.map((apiKey: IApiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>{apiKey.name}</TableCell>
                    <TableCell>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {apiKey.key.slice(0, 8)}...{apiKey.key.slice(-4)}
                      </code>
                    </TableCell>
                    <TableCell>{apiKey.createdAt}</TableCell>
                    <TableCell>{apiKey.lastUsedAt ? apiKey.lastUsedAt : "Never used"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => copyApiKey(apiKey.key)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteApiKey(apiKey.id)}>
                        <Key className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

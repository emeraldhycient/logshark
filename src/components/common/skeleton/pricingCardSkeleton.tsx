import { Skeleton } from '@/components/ui/skeleton'
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    // CardTitle,
} from '@/components/ui/card'
import React from 'react'

export const PricingCardSkeleton = () => (
    <Card className="flex flex-col justify-between border-gray-200 w-full">
        <CardHeader>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="text-center">
                <Skeleton className="h-10 w-24 mx-auto" />
                <Skeleton className="mt-2 h-6 w-16 mx-auto" />
            </div>
            <ul className="mt-8 space-y-4">
                {[...Array(3)].map((_, idx) => (
                    <li key={idx} className="flex items-start">
                        <Skeleton className="h-6 w-full" />
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Skeleton className="h-10 w-full" />
        </CardFooter>
    </Card>
)

const PricingCardSkeletonLoader = () => (
    <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {[...Array(3)].map((_, idx) => (
            <PricingCardSkeleton key={idx} />
        ))}
    </div>
)

export default PricingCardSkeletonLoader

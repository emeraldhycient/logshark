'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { pricingPlanService } from '@/services/pricingPlan'
import { IPricingPlan } from '@/types'
// import { usePaystackPayment } from 'react-paystack';
import PricingCardSkeletonLoader from '../common/skeleton/pricingCardSkeleton'

import PaystackPop from '@paystack/inline-js';



// Function to generate event options
const generateEventOptions = (valuesInMillions: number[]) => {
    return valuesInMillions.map((valueInMillions: number) => {
        let label = ''
        if (valueInMillions >= 1000) {
            label = `${(valueInMillions / 1000).toLocaleString()} Billion`
        } else {
            label = `${valueInMillions.toLocaleString()} Million`
        }
        return {
            value: valueInMillions * 1_000_000,
            label: label,
        }
    })
}

// Event values in millions
const eventValuesInMillions = [
    10, 11, 12, 13, 14, 15, 20, 25, 30, 50, 100, 200, 500, 1000,
]

// Generate the ENTERPRISE_EVENT_OPTIONS array
const ENTERPRISE_EVENT_OPTIONS = generateEventOptions(eventValuesInMillions)

export default function PricingSection({ isDisplay = true }) {
    const [isAnnual, setIsAnnual] = useState(true)
    const [enterpriseEvents, setEnterpriseEvents] = useState(10_000_000) // Default to 10 million events

    const paystack = new PaystackPop();


    // Fetch pricing plans using React Query
    const {
        data: plans,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['pricingPlans'],
        queryFn: pricingPlanService.getAll
    })

    if (isError) {
        return (
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xl text-red-500">
                        Error loading pricing plans: {error.message}
                    </p>
                </div>
            </div>
        )
    }

    // Extract the Enterprise plan from the fetched plans
    const enterprisePlan = plans && plans.find((plan: IPricingPlan) => plan.name === 'Enterprise')

    // Function to calculate the enterprise price using values from the database
    const calculateEnterprisePrice = () => {
        if (!enterprisePlan) return '$0'

        const events = enterpriseEvents
        const basePrice = enterprisePlan.monthlyPrice
        const baseEvents = enterprisePlan.eventLimit
        const eventCostPerMillion = enterprisePlan.eventCostPerMillion || 19

        const eventsOverBase = Math.max(0, events - baseEvents)
        const extraMillions = eventsOverBase / 1_000_000
        const totalPrice = basePrice + extraMillions * eventCostPerMillion

        if (isAnnual) {
            const annualPrice = totalPrice * 12 * 0.8 || enterprisePlan.annualPrice
            return `${annualPrice.toFixed(0)}`
        }

        return `${totalPrice.toFixed(0)}`
    }


    const PaystackHookButton = ({ isPopular, cta, amount }: { isPopular: boolean, cta: string, amount: number }) => {
        const amountInCents = amount * 100
        return (
            <Button onClick={() => {
                paystack.newTransaction({
                    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '',
                    email: 'example@email.com',
                    amount: amountInCents,
                    "currency": "USD",
                    onSuccess: (transaction: string) => {
                        console.log({ transaction })
                        // Payment complete! Reference: transaction.reference 
                    },
                    onCancel: () => {
                        console.log("modal closed")
                        // user closed popup
                    }
                });

            }}
                className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                variant={isPopular ? 'default' : 'outline'}
                size="lg"
            >{cta}</Button>
        );
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                        Pricing Plans
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. Unlock powerful analytics and insights.
                    </p>
                </div>

                {/* Toggle between Monthly and Annual billing */}
                <div className="mt-12 flex justify-center items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">Monthly</span>
                    <Switch
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                        className="data-[state=checked]:bg-blue-600"
                        thumbClassName="data-[state=checked]:bg-white data-[state=unchecked]:bg-blue-600 "
                    />
                    <span className="text-sm font-medium text-gray-500">Annually</span>
                    <Badge variant="secondary" className="ml-2">
                        Save up to 20%
                    </Badge>
                </div>

                {/* Pricing Cards */}
                <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
                    {
                        isLoading ?
                            <PricingCardSkeletonLoader />
                            :
                            plans
                                .filter((plan: IPricingPlan) => plan.name !== 'Enterprise')
                                .map((plan: IPricingPlan) => (
                                    <Card
                                        key={plan.id}
                                        className={`flex flex-col justify-between ${plan.isPopular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-gray-200'
                                            }`}
                                    >
                                        <CardHeader>
                                            {plan.isPopular && (
                                                <Badge className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white">
                                                    Most Popular
                                                </Badge>
                                            )}
                                            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                            <CardDescription>{plan.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <div className="text-center">
                                                <span className="text-5xl font-extrabold">
                                                    {isAnnual ? `$${plan.annualPrice}` : `$${plan.monthlyPrice}`}
                                                </span>
                                                <span className="text-xl font-medium text-gray-500">
                                                    /{isAnnual ? 'year' : 'month'}
                                                </span>
                                            </div>
                                            <ul className="mt-8 space-y-4">
                                                {plan.features.map((feature: string, idx: number) => (
                                                    <li key={idx} className="flex items-start">
                                                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                                        <span className="ml-3 text-base text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            {
                                                !isDisplay ?
                                                    <PaystackHookButton isPopular={plan.isPopular} cta={plan.cta || 'Get Started'} amount={isAnnual ? Number(plan.annualPrice) : Number(plan.monthlyPrice)} />
                                                    :
                                                    <Button
                                                        className={`w-full ${plan.isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                                        variant={plan.isPopular ? 'default' : 'outline'}
                                                        size="lg"
                                                    >
                                                        <Link href="/register">{plan.cta || 'Get Started'}</Link>
                                                    </Button>
                                            }
                                        </CardFooter>
                                    </Card>
                                ))}

                    {/* Enterprise Plan */}
                    {enterprisePlan && (
                        <Card className="flex flex-col justify-between border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{enterprisePlan.name}</CardTitle>
                                <CardDescription>
                                    {enterprisePlan.description ||
                                        'For large-scale applications with advanced needs. Customize your plan by selecting events.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-center">
                                    <span className="text-5xl font-extrabold">${calculateEnterprisePrice()}</span>
                                    <span className="text-xl font-medium text-gray-500">
                                        /{isAnnual ? 'year' : 'month'}
                                    </span>
                                </div>

                                {/* Events Dropdown */}
                                <div className="mt-6">
                                    <label htmlFor="events-select" className="block text-lg font-medium text-gray-700">
                                        Events per Month:
                                    </label>
                                    <Select
                                        onValueChange={(value) => setEnterpriseEvents(parseInt(value))}
                                        defaultValue={enterpriseEvents.toString()}
                                    >
                                        <SelectTrigger className="mt-2 w-full">
                                            <SelectValue placeholder="Select event count" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ENTERPRISE_EVENT_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value.toString()}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <ul className="mt-8 space-y-4">
                                    {enterprisePlan.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                            <span className="ml-3 text-base text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {
                                    !isDisplay ?
                                        <PaystackHookButton isPopular={true} cta={'Get Started'} amount={Number(calculateEnterprisePrice()) || (isAnnual ? enterprisePlan?.annualPrice : enterprisePlan?.monthlyPrice)} />
                                        :
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700" variant="default" size="lg">
                                            <Link href="/register">Get Started</Link>
                                        </Button>
                                }
                            </CardFooter>
                        </Card>
                    )}
                </div>

                {/* Consultation Call to Action */}
                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                        Not sure which plan is right for you?
                    </h3>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Our team of experts is here to help. Schedule a free consultation to find the perfect
                        fit for your needs.
                    </p>
                    <Link href={'/register'} className="mt-8">
                        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                <span>Schedule Consultation</span>
                                <svg
                                    fill="none"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.75 8.75L14.25 12L10.75 15.25"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

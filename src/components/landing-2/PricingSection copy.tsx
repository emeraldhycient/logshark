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

// Constants for Enterprise plan pricing
const ENTERPRISE_BASE_PRICE = 190 // Base price for Enterprise plan
const ENTERPRISE_EVENT_COST_PER_MILLION = 19 // Price per additional million events

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

const plans = [
    {
        name: 'Starter',
        price: { monthly: '$10', annually: '$100' },
        description: 'For individuals and small projects starting out.',
        features: [
            'Basic User Behavior Analytics',
            'Up to 600,000 events/month',
            'Email Support',
            '1 Team Member',
            '30-day data retention',
            'Limited to 1 website/app/API integration',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Growth',
        price: { monthly: '$19', annually: '$180' },
        description: 'For growing teams and businesses needing more insights.',
        features: [
            'All Starter plan features',
            'Real-Time Engagement Metrics',
            'Up to 1,000,000 events/month',
            'Priority Support',
            'Up to 5 Team Members',
            '60-day data retention',
            'Limited to 5 website/app/API integrations',
        ],
        cta: 'Start Logging',
        popular: true,
    },
]

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false)
    const [enterpriseEvents, setEnterpriseEvents] = useState(10_000_000) // Default to 10 million events

    // Function to calculate the enterprise price
    const calculateEnterprisePrice = () => {
        const events = enterpriseEvents
        const basePrice = ENTERPRISE_BASE_PRICE
        const eventsOverBase = Math.max(0, events - 10_000_000) // Base events is 10 million
        const extraMillions = eventsOverBase / 1_000_000
        const totalPrice = basePrice + extraMillions * ENTERPRISE_EVENT_COST_PER_MILLION

        if (isAnnual) {
            return `$${(totalPrice * 12 * 0.8).toFixed(0)}` // Annual price with 20% discount
        }

        return `$${totalPrice.toFixed(0)}` // Monthly price
    }

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
                    />
                    <span className="text-sm font-medium text-gray-500">Annually</span>
                    <Badge variant="secondary" className="ml-2">
                        Save up to 20%
                    </Badge>
                </div>

                {/* Pricing Cards */}
                <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`flex flex-col justify-between ${plan.popular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-gray-200'
                                }`}
                        >
                            <CardHeader>
                                {plan.popular && (
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
                                        {isAnnual ? plan.price.annually : plan.price.monthly}
                                    </span>
                                    <span className="text-xl font-medium text-gray-500">
                                        /{isAnnual ? 'year' : 'month'}
                                    </span>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                            <span className="ml-3 text-base text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                    variant={plan.popular ? 'default' : 'outline'}
                                    size="lg"
                                >
                                    <Link href={"/register"}>
                                        {plan.cta}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {/* Enterprise Plan */}
                    <Card className="flex flex-col justify-between border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                            <CardDescription>
                                For large-scale applications with advanced needs. Customize your plan by selecting
                                events.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="text-center">
                                <span className="text-5xl font-extrabold">{calculateEnterprisePrice()}</span>
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
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    <span className="ml-3 text-base text-gray-700">All Growth plan features</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    <span className="ml-3 text-base text-gray-700">Unlimited Team Members</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    <span className="ml-3 text-base text-gray-700">Dedicated Account Manager</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    <span className="ml-3 text-base text-gray-700">Custom Integrations</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" variant="default" size="lg">
                                <Link href={"/register"}>
                                    Get Started
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
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
                    <Link href={'register'} className="mt-8">
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
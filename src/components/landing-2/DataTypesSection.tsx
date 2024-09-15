'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const dataCategories = [
    {
        title: 'User Behavior Analytics',
        description: 'Gain deep insights into how users interact with your application, from page views to detailed click tracking.',
        items: ['Page Views', 'Session Duration', 'Click Tracking', 'Scroll Depth', 'Heatmaps'],
        image: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
        title: 'Performance Metrics',
        description: 'Monitor and optimize your application\'s performance with comprehensive metrics and error tracking.',
        items: ['Page Load Time', 'API Response Times', 'Error Tracking', 'Crash Reports'],
        image: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
        title: 'API Usage Analytics',
        description: 'Track and analyze your API usage to ensure reliability and optimize performance.',
        items: ['API Call Volume', 'Success vs Failure Rates', 'Latency Metrics'],
        image: 'https://picsum.photos/seed/picsum/200/300',
    },
]

const DataTypeCard = ({ category, index }: { category: typeof dataCategories[0]; index: number }) => {
    const isEven = index % 2 === 0

    return (
        <Card className="overflow-hidden shadow-0 border-o">
            <div className="flex flex-col md:flex-row">
                {isEven ? (
                    <>
                        <CardContent className="flex-1 p-6 md:p-10">
                            <CardHeader className="p-0 mb-6">
                                <Badge variant="outline" className="mb-2 w-fit">
                                    {`Data Type ${index + 1}`}
                                </Badge>
                                <CardTitle className="text-2xl font-bold mb-2">{category.title}</CardTitle>
                                <CardDescription className="text-base">{category.description}</CardDescription>
                            </CardHeader>
                            <ul className="space-y-2">
                                {category.items.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex items-center space-x-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    >
                                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="flex-1 relative h-64 md:h-auto">
                            <Image
                                src={category.image}
                                alt={category.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 relative h-64 md:h-auto">
                            <Image
                                src={category.image}
                                alt={category.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <CardContent className="flex-1 p-6 md:p-10">
                            <CardHeader className="p-0 mb-6">
                                <div className="w-fit">
                                    <Badge variant="outline" className="mb-2">
                                        {`Data Type ${index + 1}`}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl font-bold mb-2">{category.title}</CardTitle>
                                <CardDescription className="text-base">{category.description}</CardDescription>
                            </CardHeader>
                            <ul className="space-y-2">
                                {category.items.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex items-center space-x-2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    >
                                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </CardContent>
                    </>
                )}
            </div>
        </Card>
    )
}

export default function DataTypesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">Data Types</Badge>
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                        Types of Data We Capture
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive analytics across user behavior, performance, and API usage to give you a complete picture of your application.
                    </p>
                </div>
                <div className="space-y-12">
                    {dataCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <DataTypeCard category={category} index={index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
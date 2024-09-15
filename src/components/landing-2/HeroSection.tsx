'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'

// Data for Tabs
const codeExamples = [
    {
        label: 'Next.js',
        value: 'nextjs',
        code: `// Next.js API usage
import { logEvent } from 'logshark';

export default function HomePage() {
  useEffect(() => {
    logEvent('page_view', { path: window.location.pathname });
  }, []);

  return <div>Welcome to LogShark!</div>;
}`,
        language: 'javascript',
    },
    {
        label: 'Express',
        value: 'express',
        code: `// Express.js API usage
const express = require('express');
const { logEvent } = require('logshark');

const app = express();

app.get('/', (req, res) => {
  logEvent('api_request', { path: req.path });
  res.send('Logged with LogShark');
});

app.listen(3000, () => console.log('Server running on port 3000'));`,
        language: 'javascript',
    },
    {
        label: 'SvelteKit',
        value: 'sveltekit',
        code: `<!-- SvelteKit API usage -->
<script>
  import { logEvent } from 'logshark';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    logEvent('page_view', { path: data.path });
  });
</script>

<h1>Welcome to {data.path}</h1>`,
        language: 'html',
    },
    {
        label: 'Qwik',
        value: 'qwik',
        code: `// Qwik API usage
import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { logEvent } from 'logshark';

export default component$(() => {
  useVisibleTask$(() => {
    logEvent('page_view', { path: '/home' });
  });

  return <div>Welcome to LogShark!</div>;
});`,
        language: 'javascript',
    },
]

const words = [
    { text: 'Real-Time' },
    { text: 'Analytics' },
    { text: 'for' },
    { text: 'Web,' },
    { text: 'APIs,' },
    { text: 'and' },
    { text: 'Mobile' },
    { text: 'Apps' },
]

export default function HeroSection() {
    // UseState to handle activeTab
    const [activeTab, setActiveTab] = useState('nextjs')

    return (
        <section className=" text-white py-24 md:py-32 lg:py-44 relative overflow-hidden ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="flex items-center max-w-5xl justify-center">
                            <TypewriterEffectSmooth words={words} />
                        </div>
                        {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"> */}
                        {/* </h1> */}
                        <p className="text-lg md:text-xl lg:text-2xl mb-6 max-w-3xl mx-auto">
                            Unlock deep insights into user behavior, performance, and system metrics.
                        </p>
                    </motion.div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/register">
                            Get Started
                        </Link>
                    </Button>
                    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <Link href="/docs">
                            View Source
                        </Link>
                    </button>
                </div>

                {/* Tabs for code examples */}
                <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value)} // Changing active tab based on selection
                    className="max-w-4xl mx-auto"
                >
                    <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 bg-transparent">
                        {/* Render tab labels */}
                        {codeExamples.map((example) => (
                            <TabsTrigger
                                key={example.value}
                                value={example.value}
                                className={`px-4 py-2 rounded-full text-sm ${activeTab === example.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-white hover:bg-blue-600'
                                    } transition`}
                            >
                                {example.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Render code content for each tab */}
                    {codeExamples.map((example) => (
                        <TabsContent key={example.value} value={example.value}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                                    <span className="text-sm font-medium">{example.label} Example</span>
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    language={example.language}
                                    style={dark}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1rem',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.5',
                                        maxHeight: '400px',
                                    }}
                                >
                                    {example.code}
                                </SyntaxHighlighter>
                            </motion.div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Background beams or other effects */}
            <BackgroundBeams />
        </section>
    )
}

'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
// Importing Icons (you can replace these with your custom SVGs)
import { SiNextdotjs, SiExpress, SiSvelte, SiQwik } from 'react-icons/si'
import { getOS } from '@/utils/getOs'
import { ArrowBigLeft } from 'lucide-react'
import { RightTailedArrow } from '@/icons/arrow'
import Navbar from './navbar'

// Data for Tabs with icons
const codeExamples = [
    {
        label: 'Next.js',
        value: 'nextjs',
        icon: <SiNextdotjs size={24} />,
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
        icon: <SiExpress size={24} />,
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
        icon: <SiSvelte size={24} />,
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
        icon: <SiQwik size={24} />,
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

// const words = [
// 	{ text: "Deliver" },
// 	{ text: "Modern" },
// 	{ text: "Real-Time" },
// 	{ text: "Analytics" },
// 	{ text: "for" },
// 	{ text: "Web," },
// 	{ text: "APIs," },
// 	{ text: "Mobile," },
// 	{ text: "and" },
// 	{ text: "Enterprise" },
// 	{ text: "Applications" },
// ];

const words = [
	{ text: "Modern" },
	{ text: "analytics" },
	{ text: "for" },
	{ text: "the" },
	{ text: "modern" },
	{ text: "world" },
	{ text: "and" },
	{ text: "enterprise" },
	{ text: "applications" },
];


export default function HeroSection() {
    // UseState to handle activeTab
    const [activeTab, setActiveTab] = useState('nextjs')

    const [os, setOS] = useState<string | null>(null);

    useEffect(() => {
        const detectedOS = getOS();
        setOS(detectedOS);
    }, []);

    return (
		<section className=" text-white relative overflow-hidden ">
			<Navbar />
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-32 flex flex-col items-center text-center">
				<div className="flex flex-row items-center gap-x-5 rounded-full w-fit px-2 py-1.5 border">
					<div className="text-center flex flex-row items-center justify-center h-9 px-3 rounded-full bg-white text-black font-light">
						New Feature
					</div>
					<div className="flex flex-row items-center justify-center gap-x-2 font-light text-white">
						<span>Announcing our new feature v1.2.9</span>
						<span>
							<RightTailedArrow />
						</span>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
							type: "spring",
							stiffness: 70,
						}}
						style={{
							transform: "translate3d(0, 0, 0)",
							overflow: "visible",
						}}
						className={`mb-8 ${os == "iOS" ? "hidden" : "block"} `}
						id="motion"
					>
						<div
							id="motion-2"
							className="flex items-center max-w-5xl justify-center"
						>
							<TypewriterEffectSmooth words={words} />
						</div>
						<p className="text-lg md:text-xl lg:text-2xl font-light mb-6 max-w-3xl mx-auto">
							Unlock deep insights into user behavior,
							performance, and system metrics.
						</p>
					</motion.div>
					<div className={`mb-8 ${os == "iOS" ? "block" : "hidden"}`}>
						<div className="flex items-center max-w-5xl justify-center ">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">
								Deliver Real-Time Analytics for Web, APIs, and
								Mobile Apps
							</h1>
						</div>
						<p className="text-lg md:text-xl lg:text-2xl font-light mb-6 max-w-3xl mx-auto">
							Unlock deep insights into user behavior,
							performance, and system metrics.
						</p>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
					<Button
						size="lg"
						className="border border-blue-600 h-12 bg-blue-600 rounded-full hover:bg-blue-700 text-white"
					>
						<Link href="/register" className='text-base'>Get Started</Link>
					</Button>

					<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
						<Link href="https://github.com/emeraldhycient/logShark-sdks">
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
									<span className="text-sm font-medium hidden md:block">
										{example.label} Example
									</span>
									<TabsList className="flex flex-row gap-2 bg-transparent">
										{/* Render tab icons instead of labels */}
										{codeExamples.map((example) => (
											<TabsTrigger
												key={example.value}
												value={example.value}
												className={`flex justify-center items-center px-4 py-2 rounded-full text-sm ${
													activeTab === example.value
														? "bg-purple-600 text-white hover:bg-purple-600"
														: "bg-gray-800 text-white hover:bg-blue-600"
												} transition`}
											>
												{example.icon}{" "}
												{/* Display the icon */}
											</TabsTrigger>
										))}
									</TabsList>
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
										padding: "1rem",
										fontSize: "0.875rem",
										lineHeight: "1.5",
										maxHeight: "400px",
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
	);
}

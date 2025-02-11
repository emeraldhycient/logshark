// import React, { useEffect, useState } from 'react'
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { SiNextdotjs, SiExpress, SiSvelte, SiQwik } from 'react-icons/si'
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'


// // Data for Tabs with icons
// const codeExamples = [
//     {
//         label: 'Next.js',
//         value: 'nextjs',
//         icon: <SiNextdotjs size={24} />,
//         code: `// Next.js API usage
// import { logEvent } from 'logshark';

// export default function HomePage() {
//   useEffect(() => {
//     logEvent('page_view', { path: window.location.pathname });
//   }, []);

//   return <div>Welcome to LogShark!</div>;
// }`,
//         language: 'javascript',
//     },
//     {
//         label: 'Express',
//         value: 'express',
//         icon: <SiExpress size={24} />,
//         code: `// Express.js API usage
// const express = require('express');
// const { logEvent } = require('logshark');

// const app = express();

// app.get('/', (req, res) => {
//   logEvent('api_request', { path: req.path });
//   res.send('Logged with LogShark');
// });

// app.listen(3000, () => console.log('Server running on port 3000'));`,
//         language: 'javascript',
//     },
//     {
//         label: 'SvelteKit',
//         value: 'sveltekit',
//         icon: <SiSvelte size={24} />,
//         code: `<!-- SvelteKit API usage -->
// <script>
//   import { logEvent } from 'logshark';
//   import { onMount } from 'svelte';

//   export let data;

//   onMount(() => {
//     logEvent('page_view', { path: data.path });
//   });
// </script>

// <h1>Welcome to {data.path}</h1>`,
//         language: 'html',
//     },
//     {
//         label: 'Qwik',
//         value: 'qwik',
//         icon: <SiQwik size={24} />,
//         code: `// Qwik API usage
// import { component$, useVisibleTask$ } from '@builder.io/qwik';
// import { logEvent } from 'logshark';

// export default component$(() => {
//   useVisibleTask$(() => {
//     logEvent('page_view', { path: '/home' });
//   });

//   return <div>Welcome to LogShark!</div>;
// });`,
//         language: 'javascript',
//     },
// ]

// const CodeConsole = () => {
//      // UseState to handle activeTab
//     const [activeTab, setActiveTab] = useState('nextjs')
//     const [os, setOS] = useState<string | null>(null);

//     useEffect(() => {
//         const detectedOS = getOS();
//         setOS(detectedOS);
//     }, []);
//   return (
//     {/* Tabs for code examples */}
// 				<Tabs
// 					value={activeTab}
// 					onValueChange={(value) => setActiveTab(value)} // Changing active tab based on selection
// 					className="max-w-4xl mx-auto"
// 				>
// 					{/* Render code content for each tab */}
// 					{codeExamples.map((example) => (
// 						<TabsContent key={example.value} value={example.value}>
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ duration: 0.5 }}
// 								className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
// 							>
// 								<div className="flex items-center justify-between px-4 py-2 bg-gray-800">
// 									<span className="text-sm font-medium hidden md:block">
// 										{example.label} Example
// 									</span>
// 									<TabsList className="flex flex-row gap-2 bg-transparent">
// 										{/* Render tab icons instead of labels */}
// 										{codeExamples.map((example) => (
// 											<TabsTrigger
// 												key={example.value}
// 												value={example.value}
// 												className={`flex justify-center items-center px-4 py-2 rounded-full text-sm ${
// 													activeTab === example.value
// 														? "bg-purple-600 text-white hover:bg-purple-600"
// 														: "bg-gray-800 text-white hover:bg-blue-600"
// 												} transition`}
// 											>
// 												{example.icon}{" "}
// 												{/* Display the icon */}
// 											</TabsTrigger>
// 										))}
// 									</TabsList>
// 									<div className="flex space-x-2">
// 										<div className="w-3 h-3 rounded-full bg-red-500" />
// 										<div className="w-3 h-3 rounded-full bg-yellow-500" />
// 										<div className="w-3 h-3 rounded-full bg-green-500" />
// 									</div>
// 								</div>
// 								<SyntaxHighlighter
// 									language={example.language}
// 									style={dark}
// 									customStyle={{
// 										margin: 0,
// 										padding: "1rem",
// 										fontSize: "0.875rem",
// 										lineHeight: "1.5",
// 										maxHeight: "400px",
// 									}}
// 								>
// 									{example.code}
// 								</SyntaxHighlighter>
// 							</motion.div>
// 						</TabsContent>
// 					))}
// 				</Tabs>
//   )
// }

// export default CodeConsole
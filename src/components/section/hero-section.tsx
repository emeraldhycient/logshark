'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
// import { BackgroundBeams } from '@/components/ui/background-beams'
import Link from 'next/link'
// Importing Icons (you can replace these with your custom SVGs)
import Navbar from '../landing-2/navbar'
import HeroNotification from '../hero-notification'
import HeroEmail from '../hero-email'


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

    return (
		<section className=" text-white relative flex flex-col gap-20">
			<Navbar />
			<div className="container mx-auto gap-y-7 pb-24 md:pb-32 flex flex-col items-center text-center">
				<div className="flex flex-col items-center justify-center">
					<HeroNotification />

					<div>
						<div
							id="motion-2"
							className="flex items-center max-w-5xl justify-center"
						>
							<TypewriterEffectSmooth words={words} />
						</div>
						<p className="text-lg md:text-xl lg:text-2xl font-light  max-w-3xl mx-auto">
							Unlock deep insights into user behavior,
							performance, and system metrics.
						</p>
					</div>
				</div>
				<HeroEmail />

				{/* Buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-y-0 sm:gap-x-4 ">
					<Button
						size="lg"
						className="border border-blue-600 h-12 bg-blue-600 rounded-full hover:bg-blue-700 text-white"
					>
						<Link href="/register" className="text-base">
							Get Started
						</Link>
					</Button>

					<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
						<Link href="https://github.com/emeraldhycient/logShark-sdks">
							View Source
						</Link>
					</button>
				</div>
			</div>

			{/* Background beams or other effects */}
		</section>
	);
}

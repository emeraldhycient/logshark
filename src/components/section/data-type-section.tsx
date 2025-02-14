"use client";
import { Meteors } from "@/components/ui/meteors";
import { CheckCircle } from "lucide-react";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { motion } from 'framer-motion';

const dataCategories = [
	{
		title: "User Behavior Analytics",
		description:
			"Gain deep insights into how users interact with your application, from page views to detailed click tracking.",
		items: [
			"Page Views",
			"Session Duration",
			"Click Tracking",
			"Scroll Depth",
			"Heatmaps",
		],
	},
	{
		title: "Performance Metrics",
		description:
			"Monitor and optimize your application's performance with comprehensive metrics and error tracking.",
		items: [
			"Page Load Time",
			"API Response Times",
			"Error Tracking",
			"Crash Reports",
		],
	},
	{
		title: "API Usage Analytics",
		description:
			"Track and analyze your API usage to ensure reliability and optimize performance.",
		items: [
			"API Call Volume",
			"Success vs Failure Rates",
			"Latency Metrics",
		],
	},
	{
		title: "",
		description: "",
		items: [],
	},
];

const MeteorCard = ({ items }: { items: string[] }) => (
	<div className="relative h-full w-full max-w-xs p-8 bg-gray-900 border border-gray-800 shadow-lg overflow-hidden">
		<div className="absolute inset-0 transform scale-[0.80] bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-3xl" />
		<div className="relative z-10">
			{/* <h1 className="text-xl font-bold text-white mb-4">{title}</h1>
            <p className="text-base text-slate-400 mb-6">{description}</p> */}

			<ul className="space-y-4">
				{items.map((item, idx) => (
					<li key={idx} className="flex items-start">
						<CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
						<span className="ml-3 text-base text-gray-400">
							{item}
						</span>
					</li>
				))}
			</ul>
		</div>
		<Meteors number={30} className="z-0" />
	</div>
);

export default function DataTypesSection() {
	const formattedContent = dataCategories.map((category) => ({
		title: category.title,
		description: category.description,
		content: (
			<MeteorCard
				// title={category.title}
				// description={category.description}
				items={category.items} // Pass the items for the list
			/>
		),
    }));

	return (
		<motion.section className="py-36 rounded-t-3xl bg-gradient-to-b from-gray-50 to-white">
			<div className="mx-auto ">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-4xl font-extrabold sm:text-4xl lg:text-5xl text-black bg-clip-text inline-block animate-shine"
						style={{
							backgroundImage:
								"linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
							backgroundSize: "200% 100%",
							WebkitBackgroundClip: "text",
							animationDuration: `${5}s`,
						}}
					>
						Types of Data We Capture
					</motion.h2>
					<p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Unlock comprehensive analytics for user behavior,
						performance, and API usage to get a complete picture of
						your application.
					</p>
				</div>

				{/* StickyScroll with Meteor Cards */}
				<StickyScroll content={formattedContent} />
			</div>
		</motion.section>
	);
}

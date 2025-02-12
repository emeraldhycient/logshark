"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
	AppWindowIcon,
	CloudLightningIcon,
	CogIcon,
	MousePointerClickIcon,
	TargetIcon,
	UsersRoundIcon,
} from "lucide-react";
import React from "react";

const features = [
	{
		title: "User Behavior Analytics",
		description:
			"Gain insights into how users interact with your application through page views, clicks, and navigation patterns.",
		icon: <MousePointerClickIcon className="w-8 h-8" />,
		color: "bg-blue-500",
	},
	{
		title: "Powerful API",
		description:
			"Monitor active users, session durations, and retention rates in real-time to understand user engagement.",
		icon: <UsersRoundIcon className="w-8 h-8" />,
		color: "bg-green-500",
	},
	{
		title: "Performance Analytics",
		description:
			"Track page load times, API response times, and resource usage to optimize performance.",
		icon: <CloudLightningIcon className="w-8 h-8" />,
		color: "bg-yellow-500",
	},
	{
		title: "API Usage Analytics",
		description:
			"Monitor API call volumes, latency, and error rates to ensure API reliability.",
		icon: <CogIcon className="w-8 h-8" />,
		color: "bg-red-500",
	},
	{
		title: "Mobile App Metrics",
		description:
			"Track app installations, in-app purchases, and device-specific performance metrics.",
		icon: <AppWindowIcon className="w-8 h-8" />,
		color: "bg-indigo-500",
	},
	{
		title: "Custom Events & Goals",
		description:
			"Set up custom event tracking and goal completions tailored to your business needs.",
		icon: <TargetIcon className="w-8 h-8" />,
		color: "bg-teal-500",
	},
];

const FeatureCard = ({
	feature,
	index,
}: {
	feature: (typeof features)[0];
	index: number;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 50 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay: index * 0.1 }}
	>
		<Card className="h-full rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-black cursor-pointer">
			<CardHeader className="relative p-6 flex flex-col gap-y-3">
				<div
					className={`absolute top-0 right-0 w-32 h-32 ${feature.color} rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300`}
				/>
				<div
					className={`${feature.color} text-white p-3 rounded-full inline-block w-fit`}
				>
					{feature.icon}
				</div>
				<CardTitle className="mt-4 text-2xl font-medium bg-gradient-to-tl from-white via-slate-300 to-zinc-400 bg-clip-text text-transparent">
					{feature.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-base text-white">
					{feature.description}
				</CardDescription>
			</CardContent>
		</Card>
	</motion.div>
);

export default function FeaturesSection() {
	return (
		<section className="py-20 ">
			<div className="w-[90%] md:w-[85%] mx-auto flex flex-col gap-y-20">
				<div className="text-center ">
					{/* <Badge variant="secondary" className="mb-4 text-sm font-semibold">Features</Badge> */}
					<h2 className="text-3xl font-extrabold bg-gradient-to-tl from-white via-slate-300 to-zinc-400 bg-clip-text text-transparent sm:text-4xl lg:text-5xl">
						Why LogShark?
					</h2>
					<p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
						Unlock deep insights and optimize your application with
						our comprehensive suite of analytics tools.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							feature={feature}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

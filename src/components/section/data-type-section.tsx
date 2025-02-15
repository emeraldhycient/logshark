"use client";
import { Meteors } from "@/components/ui/meteors";
import { CheckCircle } from "lucide-react";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { motion } from 'framer-motion';
import Activities from "../../app/dashboard/activities/page";

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
		<motion.section className="">
			<div className="flex flex-col items-center justify-center rounded-3xl py-20 w-[95%] bg-gradient-to-b from-gray-50 to-white mx-auto ">
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
						Key benefits of our system for your business efficiency
						& growth
					</p>
				</div>

				<div className="flex flex-row items-center justify-center w-full gap-x-10 ">
					<div className="hidden md:flex w-[25rem] h-full relative">
						<motion.img
							initial={{ scale: 0, opacity: 0, y: 5 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="w-[25rem] h-full object-cover"
							src={`/images/doodle.jpg`}
							alt=""
						/>
					</div>

					<div className="flex flex-col gap-y-5 w-[90%] md:w-[35%]">
						<div className="text-black text-2xl">
							<motion.p
								initial={{ opacity: 0, translateY: 40 }}
								whileInView={{
									opacity: 1,
									translateY: 0,
									transition: { ease: "linear", duration: 1 },
								}}
								viewport={{ once: true }}
							>
								Out system boosts productivity cut cost and
								drive business growth
							</motion.p>
						</div>

						<div className="flex flex-col gap-y-5 ">
							{formattedContent.map(
								({ content, description, title }, index) => (
									<motion.div
										key={`${title}-${index}`}
										initial={{ opacity: 0, translateY: 80 }}
										whileInView={{
											opacity: 1,
											translateY: 0,
											transition: {
												ease: "linear",
												duration: 1,
												delay: index * 0.2
											},
										}}
										viewport={{ once: true }}
										className="flex flex-row items-center"
									>
										<div className="flex flex-col items-start gap-y-2 ">
											<p className="font-medium text-black text-xl">
												{title}
											</p>

											<div
												className="text-sm text-[#b5b5b5a4] bg-clip-text inline-block animate-shine"
												style={{
													backgroundImage:
														"linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
													backgroundSize: "200% 100%",
													WebkitBackgroundClip:
														"text",
													animationDuration: `${5}s`,
												}}
											>
												<p>{description}</p>
											</div>
										</div>
									</motion.div>
								)
							)}
						</div>
					</div>
				</div>

				{/* StickyScroll with Meteor Cards */}
				{/* <StickyScroll content={formattedContent} /> */}
			</div>
		</motion.section>
	);
}

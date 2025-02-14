"use client";

import { motion } from "framer-motion";
import {
	AppWindowIcon,
	CloudLightningIcon,
	CogIcon,
	MousePointerClickIcon,
	TargetIcon,
	UsersRoundIcon,
} from "lucide-react";
import React, { useRef, useState } from "react";

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

interface Position {
	x: number;
	y: number;
}

interface FeatureCardProps extends React.PropsWithChildren {
	className?: string;
	spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
	feature: (typeof features)[0];
	index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	children,
	className = "",
	spotlightColor = "rgba(255, 255, 255, 0.25)",
	feature,
	index,
}) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState<number>(0);

	const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!divRef.current || isFocused) return;

		const rect = divRef.current.getBoundingClientRect();
		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(0.6);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(0.6);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
				style={{
					opacity,
					background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
				}}
			/>
			<div className="flex flex-col gap-y-5">
				<div className="relative  flex flex-col gap-y-3">
					<div
						className={`${feature.color} text-white p-3 rounded-full inline-block w-fit`}
					>
						{feature.icon}
					</div>

					<div className="mt-4 text-2xl bg-gradient-to-tl from-white via-slate-300 to-zinc-400 bg-clip-text text-transparent">
						{feature.title}
					</div>
				</div>

				<div
					className={`text-[#b5b5b5a4] bg-clip-text inline-block animate-shine`}
					style={{
						backgroundImage:
							"linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
						backgroundSize: "200% 100%",
						WebkitBackgroundClip: "text",
						animationDuration: `${5}s`,
					}}
				>
					{feature.description}
				</div>
			</div>
		</motion.div>
	);
};

export default function FeaturesSection() {
	return (
		<section className="pt-20 pb-44 snap-x snap-proximity">
			<div className="w-[90%] md:w-[85%] mx-auto flex flex-col gap-y-20">
				<div className="text-center ">
					<motion.h2
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-4xl font-extrabold sm:text-4xl lg:text-5xl text-[#b5b5b5a4] bg-clip-text inline-block animate-shine"
						style={{
							backgroundImage:
								"linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
							backgroundSize: "200% 100%",
							WebkitBackgroundClip: "text",
							animationDuration: `${5}s`,
						}}
					>
						Why LogShark?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, translateY: 50 }}
						whileInView={{ opacity: 1, translateY: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mt-4 text-xl text-white max-w-2xl mx-auto"
					>
						Transform your error logging into actionable insights
						and enhance your application&apos;s performance with
						LogShark&apos;s powerful analytics suite.
					</motion.p>
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

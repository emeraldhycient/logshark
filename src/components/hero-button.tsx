import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type Props = {
	containerClassName?: string;
};

const HeroButton = ({ containerClassName }: Props) => {
	useGSAP(() => {
		gsap.fromTo(
			".hero--button",
			{
				yPercent: 100,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: 0.9,
				delay: 0.1,
				ease: "back.inOut",
			}
		);
	}, {});

	return (
		<div
			className={`flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-y-0 sm:gap-x-4 overflow-y-hidden ${containerClassName}`}
		>
			<Button
				size="lg"
				className="hero--button border border-blue-600 h-12 bg-blue-600 rounded-full hover:bg-blue-700 text-white opacity-0"
			>
				<Link href="/register" className="text-base">
					Get Started
				</Link>
			</Button>

			<button className="hero--button inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 opacity-0">
				<Link href="https://github.com/emeraldhycient/logShark-sdks">
					View Source
				</Link>
			</button>
		</div>
	);
};

export default HeroButton;

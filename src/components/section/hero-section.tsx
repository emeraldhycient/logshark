"use client";

import { motion } from "framer-motion";
import React from "react";
import HeroButton from "../hero-button";
import HeroEmail from "../hero-email";
import HeroNotification from "../hero-notification";
import Navbar from "../landing-2/navbar";
import ParallaxText from "../parallax-text";

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
		<section className=" text-white relative flex flex-col gap-20 snap-x snap-mandatory">
			<Navbar />
			<div className="w-[90%] md:container mx-auto gap-y-7 pb-24 md:pb-32 flex flex-col items-center justify-center text-center">
				<div className="flex flex-col items-center justify-center">
					<HeroNotification />

					<div>
						<div
							id="motion-2"
							className="flex items-center max-w-5xl justify-center"
						>
							<ParallaxText words={words} />
						</div>

						<motion.p
							initial={{ opacity: 0, translateY: 100 }}
							animate={{
								opacity: 1,
								translateY: 0,
								transition: { ease: "linear", duration: 1 },
							}}
							className="text-lg md:text-xl lg:text-2xl font-light  max-w-3xl mx-auto"
						>
							Unlock deep insights into user behavior,
							performance, and system metrics.
						</motion.p>
					</div>
				</div>
				<HeroEmail />

				<HeroButton />
			</div>
		</section>
	);
}

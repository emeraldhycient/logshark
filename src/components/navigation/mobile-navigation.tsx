import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import React from "react";

type Props = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavigation = ({ isOpen, setIsOpen }: Props) => {
	// initial={{
	// 				opacity: 0,
	// 				translateY: -100,
	// 				backgroundColor: "black",
	// 				position: "fixed",
	// 				width: "100vw",
	// 				height: "100vh",
	// 			}}
	// 			animate={{
	// 				opacity: isOpen ? 1 : 0,
	// 				translateY: isOpen ? 0 : -100,
	// 				height: "100vh",
	// 				position: "fixed",
	// 				top: "0",
	// 				z: "99999",
	// 				width: "100vw",
	// 			}}
	// 			transition={{
	// 				duration: 0.5,
	// 				ease: "easeInOut",
	// 			}}
	// 			exit={{
	// 				opacity: 0,
	// 				translateY: -100,
	// 			}}

	useGSAP(
		() => {
			if (isOpen) {
				gsap.fromTo(
					".mobile--navigation",
					{
						yPercent: -100,
					},
					{
						yPercent: -0,
					}
				);
			} else {
				gsap.fromTo(
					".mobile--navigation",
					{
						yPercent: -0,
					},
					{
						yPercent: -100,
					}
				);
			}
		},
		{ dependencies: [isOpen] }
	);

	return (
		<div className="mobile--navigation md:hidden bg-black w-screen h-screen -translate-y-full top-0 shadow-lg z-[999999] fixed ">
			<div className="flex flex-col h-screen w-[90%] mx-auto py-10">
				<div className="flex flex-col gap-y-5">
					<a
						href="#getting-started"
						className="text-white hover:text-blue-400 transition-colors duration-300 text-2xl font-medium underline"
						onClick={() => setIsOpen(false)}
					>
						Getting Started
					</a>
					<a
						href="#guides"
						className="text-white hover:text-blue-400 transition-colors duration-300 text-2xl font-medium underline"
						onClick={() => setIsOpen(false)}
					>
						Guides
					</a>
					<a
						href="#api"
						className="text-white hover:text-blue-400 transition-colors duration-300 text-2xl font-medium underline"
						onClick={() => setIsOpen(false)}
					>
						API Reference
					</a>
					<a
						href="#concepts"
						className="text-white hover:text-blue-400 transition-colors duration-300 text-2xl font-medium underline"
						onClick={() => setIsOpen(false)}
					>
						Concepts
					</a>
					<a
						href="#security"
						className="text-white hover:text-blue-400 transition-colors duration-300 text-2xl font-medium underline"
						onClick={() => setIsOpen(false)}
					>
						Security
					</a>
				</div>
				<div className="mt-auto">
					<div className="w-full flex items-center space-x-6">
						<Link
							href="/register"
							className="relative inline-flex h-10 overflow-hidden rounded-full p-px outline-none active:scale-90 transition-all w-full"
							onClick={() => setIsOpen(false)}
						>
							<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
							<p className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-5 py-1 text-sm font-medium text-black backdrop-blur-3xl">
								Log In
							</p>
						</Link>
						<Link
							href="/register"
							className="relative inline-flex h-10 overflow-hidden rounded-full p-px outline-none active:scale-90 transition-all w-full"
							onClick={() => setIsOpen(false)}
						>
							<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
							<p className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
								Sign Up
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileNavigation;

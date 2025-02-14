import { headerLinkContents } from "@/contents";
import { motion } from "framer-motion";
import { BarChart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileNavigation from "../navigation/mobile-navigation";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [hoverStyle, setHoverStyle] = useState({});
	const [activeStyle, setActiveStyle] = useState({
		left: "0px",
		width: "0px",
	});
	const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

	useEffect(() => {
		if (hoveredIndex !== null) {
			const hoveredElement = tabRefs.current[hoveredIndex];
			if (hoveredElement) {
				const { offsetLeft, offsetWidth } = hoveredElement;
				setHoverStyle({
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`,
				});
			}
		}
	}, [hoveredIndex]);

	useEffect(() => {
		const activeElement = tabRefs.current[activeIndex];
		if (activeElement) {
			const { offsetLeft, offsetWidth } = activeElement;
			setActiveStyle({
				left: `${offsetLeft}px`,
				width: `${offsetWidth}px`,
			});
		}
	}, [activeIndex]);

	useEffect(() => {
		requestAnimationFrame(() => {
			const overviewElement = tabRefs.current[0];
			if (overviewElement) {
				const { offsetLeft, offsetWidth } = overviewElement;
				setActiveStyle({
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`,
				});
			}
		});
	}, []);

	return (
		<div className="flex">
			<div className="container mx-auto py-5 flex justify-between items-center">
				{/* Logo */}
				<div className="flex items-center space-x-2 ">
					<BarChart className="h-8 w-8 text-blue-400" />
					<span className="text-2xl font-bold">LogShark</span>
				</div>
				<div className="hidden md:flex relative">
					<div
						className="absolute h-[30px] transition-all duration-300 ease-out bg-white rounded-[6px] flex items-center"
						style={{
							...hoverStyle,
							opacity: hoveredIndex !== null ? 1 : 0,
						}}
					/>

					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${activeStyle?.width}` }}
						className="absolute bottom-[-6px] h-[2px] bg-white transition-all duration-300 ease-out"
						style={activeStyle}
					/>

					<div className="relative flex space-x-[6px] items-center">
						{headerLinkContents.map(({ text, url }, index) => (
							<motion.a
								initial={{
									translateY: -30,
									opacity: 0,
								}}
								animate={{
									opacity: 1,
									translateY: 0,
									transition: {
										ease: "linear",
										duration: 1,
										delay: index * 0.1,
									},
								}}
								href={`${url}`}
								key={`${text}-${index}`}
								ref={(el: HTMLAnchorElement) => {
									tabRefs.current[index] = el;
								}}
								className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
									index === activeIndex
										? "text-[#0e0e10] dark:text-white"
										: "text-[#0e0f1199] dark:text-[#ffffff99]"
								}`}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
								onClick={() => setActiveIndex(index)}
							>
								<div className="text-white leading-5 whitespace-nowrap flex items-center justify-center h-full text-base font-light hover:text-black duration-300 active:scale-90 transition-all">
									{text}
								</div>
							</motion.a>
						))}
					</div>
				</div>

				{/* Search and CTA */}
				<div className="hidden md:flex items-center gap-x-5">
					<Link
						href="/register"
						className="relative inline-flex h-10 overflow-hidden rounded-full p-px outline-none active:scale-90 transition-all"
					>
						<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
						<p className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-5 py-1 text-sm font-medium text-black backdrop-blur-3xl">
							Log In
						</p>
					</Link>
					<Link
						href="/register"
						className="relative inline-flex h-10 overflow-hidden rounded-full p-px outline-none active:scale-90 transition-all"
					>
						<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
						<p className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
							Sign Up
						</p>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden flex items-center">
					<button
						title="Open Menu"
						onClick={() => setIsOpen(!isOpen)}
						className="focus:outline-none text-gray-400 hover:text-white transition-colors"
					>
						<svg
							className="w-8 h-8 absolute top-3.5 right-3 z-[99999999]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={
									isOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>
				</div>
			</div>

			<MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export default Navbar;

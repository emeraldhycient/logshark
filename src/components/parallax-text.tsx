import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ParallaxText = ({
	words,
	className,
}: {
	words: {
		text: string;
		className?: string;
	}[];
	className?: string;
}) => {
	const textRefs = useRef<HTMLDivElement[]>([]);
	const textContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			textRefs.current.forEach((el, index) => {
				gsap.fromTo(
					el,
					{ y: 100, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						ease: "back.out",
						duration: 1.2,
						delay: index * 0.1,
					}
				);
			});
		},
		{ dependencies: [], scope: textContainerRef }
	);

	const wordsArray = words.map((word) => {
		return {
			...word,
			text: word.text.split(""),
		};
	});

	return (
		<div
			ref={textContainerRef}
			className={cn(
				"flex space-x-1 my-6 overflow-hidden pb-2",
				className
			)}
		>
			<div className="text-3xl md:text-6xl font-medium !leading-tight">
				{wordsArray.map((word, idx) => {
					return (
						<div
							key={`word-${idx}`}
							ref={(el) => {
								if (el) textRefs.current[idx] = el;
							}}
							className="inline-block character-container opacity-0"
						>
							{word.text.map((char, index) => (
								<span
									key={`char-${index}`}
									className={cn(
										`text-white character`,
										word.className
									)}
								>
									{char}
								</span>
							))}
							&nbsp;
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ParallaxText;

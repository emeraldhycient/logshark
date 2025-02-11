"use client";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(""),
        };
    });

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    display: "inline-block",
                    opacity: 1,
                    width: "auto",  // Ensure width is correctly set
                },
                {
                    duration: 0.3,
                    delay: stagger(0.1),
                    ease: "easeInOut",
                }
            );
        }
    }, [isInView]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline">
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <motion.span
                                    initial={{}}
                                    key={`char-${index}`}
                                    className={cn(
                                        `text-white text-black opacity-0 hidden`,
                                        word.className
                                    )}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </div>
                    );
                })}
            </motion.div>
        );
    };
    return (
        <div
            className={cn(
                "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};

// export const TypewriterEffectSmooth = ({
//     words,
//     className,
//     cursorClassName,
// }: {
//     words: {
//         text: string;
//         className?: string;
//     }[];
//     className?: string;
//     cursorClassName?: string;
//     }) => {
    
    
    
//     // split text inside of words into array of characters
//     const wordsArray = words.map((word) => {
//         return {
//             ...word,
//             text: word.text.split(""),
//         };
//     });
//     const renderWords = () => {
//         return (
//             <div>
//                 {wordsArray.map((word, idx) => {
//                     return (
// 						<div
// 							key={` word-${idx}`}
// 							className="inline-block character-container"
// 						>
// 							{word.text.map((char, index) => (
// 								<span
// 									key={`char-${index}`}
// 									className={cn(
// 										`text-white character`,
// 										word.className
// 									)}
// 								>
// 									{char}
// 								</span>
// 							))}
// 							&nbsp;
// 						</div>
// 					);
//                 })}
//             </div>
//         );
//     };

//     return (
//         <div className={cn("flex space-x-1 my-6", className)}>
//             <div
//                 className="overflow-hidden pb-2 border"
//                 // initial={{
//                 //     width: "0%",
//                 // }}
//                 // whileInView={{
//                 //     width: "100%"
//                 // }}
//                 // transition={{
//                 //     duration: 2,
//                 //     ease: "linear",
//                 //     delay: 1,
//                 // }}
//             >
//                 <div
//                     className="text-2xl md:text-6xl font-medium !leading-tight"
//                     // style={{
//                     //     whiteSpace: "nowrap",
//                     //     textWrap: "pretty",
//                     //     WebkitTextFillColor: 'white',  // Ensure text is visible on iOS
//                     // }}
//                 >
//                     {renderWords()}{" "}
//                 </div>{" "}
//             </div>
//             {/* <motion.span
//                 initial={{
//                     opacity: 0,
//                 }}
//                 animate={{
//                     opacity: 1,
//                 }}
//                 transition={{
//                     duration: 0.8,

//                     repeat: Infinity,
//                     repeatType: "reverse",
//                 }}
//                 className={cn(
//                     "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500",
//                     cursorClassName
//                 )}
//             ></motion.span> */}
//         </div>
//     );
// };


gsap.registerPlugin(ScrollTrigger);

export const TypewriterEffectSmooth = ({
	words,
	className,
}: {
	words: {
		text: string;
		className?: string;
	}[];
	className?: string;
	cursorClassName?: string;
}) => {
	const textRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		textRefs.current.forEach((el, index) => {
			gsap.fromTo(
				el,
				{ y: 100, opacity: 0 },
				{
					y: 0,
                    opacity: 1,
                    ease: "power2.inOut",
                    duration: 0.8,
                    delay: index * 0.2,
				}
			);
		});
	}, []);

	// split text inside of words into array of characters
	const wordsArray = words.map((word) => {
		return {
			...word,
			text: word.text.split(""),
		};
	});

	const renderWords = () => {
		return (
			<div>
				{wordsArray.map((word, idx) => {
					return (
						<div
							key={`word-${idx}`}
							ref={(el) => {
								if (el) textRefs.current[idx] = el;
							}}
							className="inline-block character-container"
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
		);
	};

	return (
		<div className={cn("flex space-x-1 my-6", className)}>
			<div className="overflow-hidden pb-2">
				<div className="text-2xl md:text-6xl font-medium !leading-tight">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};


// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface ParallaxTextProps {
// 	textArray: string[];
// 	className?: string;
// }

// const ParallaxText: React.FC<ParallaxTextProps> = ({
// 	textArray,
// 	className,
// }) => {
// 	const textRefs = useRef<HTMLDivElement[]>([]);

// 	useEffect(() => {
// 		textRefs.current.forEach((el, index) => {
// 			gsap.fromTo(
// 				el,
// 				{ y: 100, opacity: 0 },
// 				{
// 					y: 0,
// 					opacity: 1,
// 					scrollTrigger: {
// 						trigger: el,
// 						start: "top 80%",
// 						end: "bottom 20%",
// 						scrub: true,
// 					},
// 				}
// 			);
// 		});
// 	}, []);

// 	return (
// 		<div className={`parallax-text-container ${className}`}>
// 			{textArray.map((text, idx) => (
// 				<div
// 					key={idx}
// 					ref={(el) => {
// 						if (el) textRefs.current[idx] = el;
// 					}}
// 					className="parallax-text"
// 				>
// 					{text.split("").map((char, index) => (
// 						<span key={index} className="parallax-char">
// 							{char}
// 						</span>
// 					))}
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default ParallaxText;
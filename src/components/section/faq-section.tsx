import { faqContent } from "@/contents";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const FaqSection = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const accordionRefContainer = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const accordionContainers = gsap.utils.toArray(
				".accordion-container"
			) as HTMLDivElement[];

			accordionContainers.forEach((element, index) => {
				const accordionAnswer = element.querySelector(
					`.accordion-answer`
				) as HTMLDivElement;

				if (!accordionAnswer) return;

				gsap.set(accordionAnswer, {
					maxHeight: "0px",
					opacity: 0,
					overflow: "hidden",
				});

				if (openIndex === index) {
					gsap.to(accordionAnswer, {
						maxHeight: "192px",
						opacity: 1,
						duration: 0.5,
						ease: "bounce.out",
						overflow: "visible",
					});
				} else {
					gsap.to(accordionAnswer, {
						maxHeight: "0px",
						opacity: 0,
						duration: 0.5,
						ease: "bounce.out",
						overflow: "hidden",
					});
				}
			});
		},
		{
			scope: accordionRefContainer,
			dependencies: [openIndex],
		}
	);

	const toggleAccordion = (index: number) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div ref={accordionRefContainer} className="py-36">
			<div className="flex flex-col items-center gap-y-10 w-[90%] md:w-[65%] mx-auto">
				<div className="flex flex-row text-4xl text-white">
					<p>Frequently Asked Questions</p>
				</div>

				<div className="flex flex-col gap-y-5">
					{faqContent.map((faq, index) => (
						<div
							onClick={() => toggleAccordion(index)}
							aria-label={`${faq.question}`}
							className={`accordion-container border rounded-lg px-7 py-5 outline-none outline-0 w-full transition-colors duration-300 cursor-pointer ${
								openIndex === index ? "border-black" : ""
							}`}
							key={`${faq?.id}-${index}`}
						>
							<div className="flex flex-col items-start w-full select-none">
								<div className="flex flex-row items-center justify-between text-lg w-full text-white">
									<div>{faq?.question}</div>
									<div>
										<svg
											width="18"
											height="10"
											viewBox="0 0 18 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`transition-transform duration-300 ${
												openIndex === index
													? "rotate-45"
													: "-rotate-45"
											} text-white`}
										>
											<path
												d="M1.5 9 9 1.5 16.5 9"
												stroke="#fff"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</div>

								<div
									className={`accordion-answer opacity-0 overflow-hidden max-h-0 transition-all duration-500 w-full`}
								>
									<div className="w-full leading-6 text-sm text-[#727272] pt-4">
										{faq.answer}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FaqSection;

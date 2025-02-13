import { motion } from "framer-motion";
import React from "react";

const HeroEmail = () => {
	return (
		<motion.form
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { ease: "linear", duration: 1, delay: 0.5 },
			}}
			className="flex flex-row items-enter justify-center w-full md:w-[30rem]"
		>
			<motion.div
				initial={{
					width: "8.1rem",
				}}
				animate={{
					width: "100%",
					transition: { duration: 1, ease: ["easeIn", "easeOut"] },
				}}
				className="relative h-fit "
			>
				<input
					type="search"
					id="default-search"
					className="rounded-full text-black block h-fit w-full px-4 py-[1rem] ps-5 text-sm border-none border-0 outline-none outline-0 placeholder:text-base"
					placeholder="Enter your email"
					required
				/>
				<button
					type="submit"
					className="rounded-full text-white absolute right-1.5 top-1/2 border-none border-0 outline-0 outline-none  -translate-y-1/2 bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-3 "
				>
					Get a Demo
				</button>
			</motion.div>
		</motion.form>
	);
};

export default HeroEmail;

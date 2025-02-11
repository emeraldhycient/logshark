import React from 'react'

const HeroEmail = () => {
  return (
		<form className="w-full md:w-[30rem]">
			<div className="relative h-fit w-full md:w-[30rem]">
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
			</div>
		</form>
  );
}

export default HeroEmail
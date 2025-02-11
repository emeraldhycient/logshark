import { RightTailedArrow } from '@/icons/arrow';
import React from 'react'

const HeroNotification = () => {
	return (
		<div className="flex flex-row items-center gap-x-5 rounded-full w-fit px-3 md:px-2 py-1.5 border">
			<div className="text-center text-sm font-medium flex-row items-center justify-center h-8 px-3 rounded-full bg-white text-black hidden md:flex">
				New Feature
			</div>
			<div className="flex flex-row items-center justify-center gap-x-2 font-light text-white">
				<span>Announcing our new feature v1.2.9</span>
				<span>
					<RightTailedArrow />
				</span>
			</div>
		</div>
	);
}

export default HeroNotification
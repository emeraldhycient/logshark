import React, { useState } from "react";
type Props = {
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: number;
	onChangeHandler?: (n: any) => void;
};

const PricingSliderSection = ({
	min = 0,
	max = 7,
	step = 1,
	defaultValue = 0,
	onChangeHandler,
}: Props) => {
	const [value, setValue] = useState(defaultValue);
	const emailOptions = [1, 2, 3, 4, 5, 6, 7];

	const handleChange = (event: any) => {
		const newValue = Number(event.target.value);
		setValue(newValue);
		if (onChangeHandler) {
			onChangeHandler(newValue);
		}
	};


	const thumbPosition = (value / emailOptions.length) * 100;

	return (
		<div className="w-full max-w-2xl">
			<div className="relative flex flex-row items-center  w-full price--slider">
				<div
					className={`line `}
					style={{ width: `${thumbPosition}%` }}
				></div>
				<input
					type="range"
					min={min}
					max={max}
					value={value}
					onChange={handleChange}
					step={step}
					className={`
            w-full 
            appearance-none 
            cursor-pointer
            custom--slider
          `}
				/>
				{/* Custom Thumb */}
				<div
					className="w-5 h-5 absolute !top-1/2 !-translate-y-1/2 left-0 transform -translate-x-1/2 pointer-events-none bg-white rounded-full z-30"
					style={{
						left: `${thumbPosition}%`,
					}}
				/>
			</div>


			{/* <div className="flex justify-between text-sm text-gray-600">
				<span>1,000</span>
				<span>5,000</span>
				<span>10,000</span>
				<span>25,000</span>
				<span>50,000</span>
				<span>100,000</span>
				<span>150,000+</span>
			</div> */}
		</div>
	);
};

export default PricingSliderSection;

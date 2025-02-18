import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
type Props = {
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: number;
	onChangeHandler?: (n: any) => void;
};

const PriceSlider = ({
	min = 0,
	max = 7,
	step = 1,
	defaultValue = 0,
	onChangeHandler,
}: Props) => {
	const values = [
		3000, 50000, 100000, 200000, 500000, 1000000, 1500000, 2500000, 3000000,
	];
	const [value, setValue] = useState(defaultValue);
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	const formatCurrency = (value) => {
		return value.toLocaleString("en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
	};
	const findClosestValue = (target: number) => {
		const closest = values?.reduce((prev, curr) => {
			return Math.abs(curr - target) < Math.abs(prev - target)
				? curr
				: prev;
		});
		return closest;
	};

	const calculatePercentage = () => {
		const index = values.indexOf(findClosestValue(value));
		return (index / (values.length - 1)) * 100;
	};

	const handleSliderChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = sliderRef.current?.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const percentage = x / rect.width;
		const index = Math.round(percentage * (values.length - 1));
		const clampedIndex = Math.min(Math.max(index, 0), values.length - 1);
		const newValue = values[clampedIndex];

		setValue(newValue);
		// onChange?.(newValue);
	};

	const handleMouseDown = () => {
		setIsDragging(true);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (event: MouseEvent | any) => {
		if (isDragging) {
			handleSliderChange(event);
		}
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging]);

	return (
		<div className="w-full max-w-[44rem]">
			<div className="relative pt-2">
				<motion.div
					ref={sliderRef}
					className="relative h-[6px] bg-gray-200 rounded-full cursor-pointer"
					onMouseDown={handleMouseDown}
					onClick={(e) => handleSliderChange(e)}
				>
					<div
						className="absolute h-full bg-black rounded-full"
						style={{ width: `${calculatePercentage()}%` }}
					/>

					<motion.div
						className={`absolute w-5 h-5 bg-white border-0 border-none rounded-full -mt-[7px] transform -translate-x-1/2 transition-transform
              ${isDragging ? "scale-110" : "hover:scale-110"}
            `}
						style={{ left: `${calculatePercentage()}%` }}
					/>
				</motion.div>

				<div className="relative mt-4 w-full">
					{values.map((value, index) => (
						<div
							key={value}
							className="absolute text-xs text-gray-600 transform -translate-x-1/2 font-medium select-none"
							style={{
								left: `${(index / (values.length - 1)) * 100}%`,
							}}
						>
							{formatCurrency(value)}
							{value === 3000000 ? "+" : ""}
						</div>
					))}
				</div>
			</div>
			<input
				type="range"
				min={0}
				max={values.length - 1}
				step={1}
				value={values.indexOf(findClosestValue(value))}
				onChange={(e) => {
					const newValue = values[Number(e.target.value)];
					setValue(newValue);
					// onChange?.(newValue);
				}}
				className="sr-only"
			/>
		</div>
	);
};

export default PriceSlider;

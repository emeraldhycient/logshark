"use client";

import dynamic from "next/dynamic";
import React from "react";
// import PricingSection from '@/components/landing-2/PricingSection'
const PricingSection = dynamic(
	() => import("@/components/landing-2/pricing-section"),
	{ ssr: false }
);

function Page() {
	return (
		<div>
			<PricingSection isDisplay={false} />
		</div>
	);
}

export default Page;

"use client";

import Footer from "@/components/common/footer";
import { GoogleGeminiEffectDemo } from "@/components/common/joinus";
import DataTypesSection from "@/components/landing-2/DataTypesSection";
import FeaturesSection from "@/components/landing-2/feature-section";
import Navbar from "@/components/landing-2/navbar";
import HeroSection from "@/components/section/hero-section";
import dynamic from "next/dynamic";
// import PricingSection from "@/components/landing-2/PricingSection";
const PricingSection = dynamic(
	() => import("@/components/landing-2/PricingSection"),
	{ ssr: false }
);

const HomePage = () => {
	return (
		<>
			<Navbar />
			<HeroSection />
			<FeaturesSection />
			<DataTypesSection />
			{/* <GapsSection /> */}
			<PricingSection />
			<GoogleGeminiEffectDemo />
			<Footer />
		</>
	);
};

export default HomePage;

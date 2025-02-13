"use client";

import Footer from "@/components/common/footer";
import { GoogleGeminiEffectDemo } from "@/components/common/joinus";
import DataTypesSection from "@/components/landing-2/DataTypesSection";
import FeaturesSection from "@/components/landing-2/feature-section";
// import GapsSection from "@/components/landing-2/GapsSection";
// import Navbar from "@/components/landing-2/navbar";
import PricingSection from "@/components/landing-2/pricing-section";
import FaqSection from "@/components/section/faq-section";
import HeroSection from "@/components/section/hero-section";
import { BackgroundBeams } from "@/components/ui/background-beams";

const HomePage = () => {
	return (
		<>
			<BackgroundBeams />
			<HeroSection />
			<FeaturesSection />
			<DataTypesSection />

			{/* <GapsSection /> */}
			{/* <PricingSection /> */}
			<FaqSection />

			<GoogleGeminiEffectDemo />
			<Footer />
		</>
	);
};

export default HomePage;

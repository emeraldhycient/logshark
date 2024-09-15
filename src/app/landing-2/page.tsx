'use client'

import Footer from "@/components/common/footer";
import { GoogleGeminiEffectDemo } from "@/components/common/joinus";
import DataTypesSection from "@/components/landing-2/DataTypesSection";
import FeaturesSection from "@/components/landing-2/FeaturesSection";
import HeroSection from "@/components/landing-2/HeroSection";
import Navbar from "@/components/landing-2/navbar";
import PricingSection from "@/components/landing-2/PricingSection";

const HomePage = () => {
    return (
        <>
            <Navbar/>
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

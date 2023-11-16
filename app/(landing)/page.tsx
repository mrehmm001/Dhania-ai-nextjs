"use client";

import HeroSection from "@/components/landing_page_components/HeroSection";
import Navbar from "@/components/landing_page_components/Navbar";

const LandingPage = () => {
    return ( 
        <div className="bg-zinc-900 text-white flex justify-center">
            <div className="w-1/2">
                <Navbar/>
                <HeroSection/>
            </div>
        </div>
     );
}
 
export default LandingPage;
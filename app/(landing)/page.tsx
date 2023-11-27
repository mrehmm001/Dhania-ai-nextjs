"use client";

import HeroSection from "@/components/landing_page_components/HeroSection";
import Navbar from "@/components/landing_page_components/Navbar";

const LandingPage = () => {
    return ( 
        <div className="bg-zinc-900 text-white flex justify-center">
            <div className="mx-10 md:mx-32 lg:mx-52 xl:mx-72">
                <Navbar/>
                <HeroSection/>
            </div>
        </div>
     );
}
 
export default LandingPage;
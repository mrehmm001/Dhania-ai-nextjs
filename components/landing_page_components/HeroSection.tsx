import Paragraph from "./Paragraph";
import Typed from 'react-typed';
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

// Define the HeroSection component
function HeroSection() {
    return ( 
        <div className="flex items-center h-[100vh]">
            <div className="flex-1 md:text-left">
                <h1 className="md:text-6xl text-4xl text-center text-green-600 font-bold">
                    Discover with Dhania:
                </h1>
                <h1 className="md:text-6xl text-4xl text-center">
                    Revolutionary AI-Powered Search for:
                </h1>
                <div className="text-center">
                    <Typed
                        className="md:text-6xl text-4xl"
                        strings={['CRM', 'Start ups', 'E-commerce','Businesses']}
                        typeSpeed={120}
                        backSpeed={70}
                        loop
                    />
                </div>
                <Paragraph className="text-center">Explore with Dhania: AI-Power Discovery. Unveiling knowledge through nature-inspuired AI.</Paragraph>
                <div className="flex justify-center">
                    <Link href="/dashboard">
                        <Button className="bg-green-600 hover:bg-green-500 text-lg">Start now for free</Button>
                    </Link>
                </div>
                <Paragraph className="text-center">No credit card required.</Paragraph>
            </div>
        </div>
     );
}

export default HeroSection;
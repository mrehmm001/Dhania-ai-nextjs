import { useState } from "react";
import Image from "next/image";
import { X, Menu } from "lucide-react";

// Define the Navar component
function Navar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return ( 
        <nav className="flex items-center justify-between">
            <a data-logo href="/" className="cursor-pointer flex items-center">
                <div className="w-10 h-10 relative">
                    <Image fill src="/logo.png" alt="Dhania logo" />
                </div>
                <div className="uppercase text-2xl">Dhania.Ai</div>
            </a>
            <div className="hidden justify-between md:flex">
                <a data-link="api" className="p-4" href="https://dhania.readme.io/docs">API</a>
                <a data-link="dashboard" className="p-4" href="/dashboard">Account</a>
            </div>
            <div className="md:hidden block" onClick={()=>setMenuOpen(!isMenuOpen)}>
                {isMenuOpen? <X className="text-3xl mr-2 hover:cursor-pointer invert"/> :<Menu className="text-3xl mr-2 md:hidden block hover:cursor-pointer"/>}
            </div>
            <div className={`${!isMenuOpen && "hidden"} md:hidden w-[50%] text-left fixed h-screen flex flex-col border border-l-0 border-y-0 border-r-gray-600 bg-[#121212] top-0 left-0`}>
                <a href="/"  className="p-4 mb-8 cursor-pointer flex items-center">
                    <div className="w-10 h-10">
                        <Image fill src="/logo.png" alt="Dhania logo" />
                    </div>
                    <div className="uppercase text-2xl">Dhania.Ai</div>
                </a>
                <div className="flex flex-col p-4">
                    <a data-link="api" className="p-4 border-b border-gray-600" href="https://dhania.readme.io/docs">API</a>
                    <a data-link="dashboard" className="p-4" href="/dashboard">Account</a>
                </div>
            </div>
        </nav>
     );
}

export default Navar;
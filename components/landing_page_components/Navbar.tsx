import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Sidebar from "../sidebar";

// Define the Navar component
function Navar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    // used for solving hydration errors
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return ( 
        <nav className="flex items-center justify-between">
            <a data-logo href="/" className="cursor-pointer flex items-center">
                <div className="w-10 h-10 relative">
                    <Image fill src="/logo.png" alt="Dhania logo" />
                </div>
                <div className="uppercase text-2xl">Dhania.Ai</div>
            </a>
            <div className="hidden justify-between md:flex ml-auto">
                <a data-link="api" className="p-4" href="https://dhania.readme.io/docs">API</a>
                <a data-link="dashboard" className="p-4" href="/dashboard">Account</a>
            </div>
            <Sheet>
                <SheetTrigger>
                        <Button onClick={()=>setMenuOpen(!isMenuOpen)} variant="ghost" size="icon" className="md:hidden">
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent data-navbar side="left" className="p-0 bg-primary text-secondary">
                        <div>
                            <a href="/"  className="p-4 mb-8 cursor-pointer flex items-center">
                                <div className="w-10 h-10 relative">
                                    <Image fill src="/logo.png" alt="Dhania logo" />
                                </div>
                                <div className="uppercase text-2xl">Dhania.Ai</div>
                            </a>
                            <div className="flex flex-col p-4">
                                <a data-link="api" className="p-4 border-b border-gray-600" href="https://dhania.readme.io/docs">API</a>
                                <a data-link="dashboard" className="p-4" href="/dashboard">Account</a>
                            </div>
                        </div>
                    </SheetContent>
            </Sheet>
        </nav>
     );
}

export default Navar;
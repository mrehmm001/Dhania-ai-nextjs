"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";


interface NavbarProps{
    apiLimitCount:number;
}

const Navbar = ({apiLimitCount=0}:NavbarProps) => {
    // const isPro = await checkSubscription();
    const isPro = false;
    const router = useRouter();
    return ( 
        <div className="flex items-center p-4">
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
     );
}
 
export default Navbar;
"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
// import { checkSubscription } from "@/lib/subscription";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports.json";
import { UserButton } from "@clerk/nextjs";

Amplify.configure({ ...awsExports, ssr: true });

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
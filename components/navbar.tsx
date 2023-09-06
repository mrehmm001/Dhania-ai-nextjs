"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
// import { checkSubscription } from "@/lib/subscription";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports.json";

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
                {/* <UserButton afterSignOutUrl="/"/> */}
                <Button onClick={ async()=>{
                try {
                        await Auth.signOut();
                        router.push("/signin");
                    } catch (error) {
                        console.log("error signing out: ", error);
                    }
                }}>Sign out</Button>
            </div>
        </div>
     );
}
 
export default Navbar;
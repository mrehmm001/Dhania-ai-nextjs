"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {usePathname} from "next/navigation"
import { cn } from "@/lib/utils";
import { Code, Database, ImageIcon, LayoutDashboard, MessageSquare, Music, Search, Settings, VideoIcon } from "lucide-react";
import FreeCounter from "@/components/free-counter";
const montserrat = Montserrat({weight:"600", subsets:["latin"]});

const routes = [
    {
        label:"Dashboard",
        icon:LayoutDashboard,
        href: "/dashboard",
        colour: "text-sky-500"
    },
    {
        label:"Conversation",
        icon:MessageSquare,
        href: "/conversation",
        colour: "text-violet-500"
    },
    // {
    //     label:"Image Generation",
    //     icon:ImageIcon,
    //     href: "/image",
    //     colour: "text-pink-700"
    // },
    // {
    //     label:"Video Generation",
    //     icon:VideoIcon,
    //     href: "/video",
    //     colour: "text-orange-700"
    // },
    // {
    //     label:"Music Generation",
    //     icon:Music,
    //     href: "/music",
    //     colour: "text-emerald-500"
    // },
    {
        label:"Code Generation",
        icon:Code,
        href: "/code",
        colour: "text-green-700"
    },
    {
        label:"Search",
        icon:Search,
        href: "/search",
        colour: "text-orange-700"
    },
    {
        label:"Data Ingestion",
        icon:Database,
        href: "/data",
        colour: "text-pink-700"
    },
    {
        label:"Settings",
        icon:Settings,
        href: "/settings",
    }
]

interface SidebarProps{
    apiLimitCount:number
    isPro:boolean,
}

const Sidebar = ({apiLimitCount=0, isPro=false}:SidebarProps) => {
    const pathName = usePathname();
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#00081a] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Dhania</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map(route=>(
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathName===route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.colour)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount}/>
        </div>
     );
};
 
export default Sidebar;
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
    },
    {
        label:"Query",
        icon:MessageSquare,
        href: "/query",
    },
    {
        label:"Data Ingestion",
        icon:Database,
        href: "/data",
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
        <div className="space-y-4 py-4 flex flex-col h-full bg-primary text-white">
            <div data-sidebar className="px-3 py-2 flex-1">
                <Link data-link="logo" href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Dhania</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map(route=>(
                        <Link
                            data-link={route.label}
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
        </div>
     );
};
 
export default Sidebar;
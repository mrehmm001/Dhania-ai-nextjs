"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, Database, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label:"Query",
    icon:MessageSquare,
    iconColour:"text-white",
    bgColour:"bg-primary",
    href: "/query"
  },
  {
    label:"Data Ingestion",
    icon:Database,
    iconColour:"text-white",
    bgColour:"bg-primary",
    href: "/data"
  },
]

export default function DashboardPage() {
  const router = useRouter();
  return (
      <div>
          <div className="mb-8 space-y-4">
            <h2 data-heading className="text-2xl md:text-4xl font-bold text-center">
                Explore the power of Dhania
            </h2>
            <p data-description className="text-muted-foreground font-light text-sm md:text-lg text-center">Query with Dhania - Experience the power of AI</p>
          </div>
          <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {tools.map(tool=>(
              <Card onClick={()=>router.push(tool.href)} key={tool.href}
                data-item={tool.label}
                className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColour)}>
                    <tool.icon className={cn("w-8 h-8", tool.iconColour)}/>
                  </div>
                  <div className="font-semibold">
                    {tool.label}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5"/>
              </Card>
            ))}
          </div>
      </div>
  )
}

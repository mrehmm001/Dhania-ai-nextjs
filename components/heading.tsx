import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps{
    title:string,
    description:string,
    icon:LucideIcon,
    iconColour?:string,
    bgColour?:string,
}
const Heading = ({
    title,
    description,
    icon: Icon,
    iconColour,
    bgColour}
    :HeadingProps) => {
    return ( 
        <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
            <div className={cn("p-2 w-fit rounded-md",bgColour)}>
                <Icon className={cn("w-10 h-10", iconColour)}/>
            </div>
            <div>
                <h2 data-heading className="text-3xl font-bold">
                    {title}
                </h2>
                <p data-description className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
     );
}
 
export default Heading;
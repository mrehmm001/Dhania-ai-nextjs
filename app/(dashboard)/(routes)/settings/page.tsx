"use client";

import Heading from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { Settings } from "lucide-react";

const SettingsPage = () => {
    const isPro = false;
    return ( 
            <div>
                <Heading
                    title= "Settings"
                    description="Manage account settings"
                    icon={Settings}
                    iconColour="text-white"
                    bgColour="bg-primary"
                />
                <div className="px-4 lg:px-8 space-y-4">
                    <div className="text-muted-foreground text-sm">
                        {isPro? "You are currently on a pro plan." : "You are currently on a free plan"}
                    </div>
                    <SubscriptionButton
                        isPro={isPro}
                    />
                </div>
            </div>
     );
}
 
export default SettingsPage;
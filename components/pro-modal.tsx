"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Check, Zap, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
    {
      label:"Query",
      icon:MessageSquare,
      colour:"text-white",
      bgColour:"bg-primary",
    },
    {
      label:"Data Ingestion",
      icon:Database,
      colour:"text-white",
      bgColour:"bg-primary",
    },
  ]
  

const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);
    const onSubscribe = async()=>{
        try{
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        }catch(error){
            console.log(error, "STRIPE_CLIENT_ERROR");
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }
    return ( 
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to premium
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map(tool=>(
                            <Card key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColour)}>
                                        <tool.icon className={cn("w-6 h-6", tool.colour)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} variant="premium" size="lg" className="w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default ProModal;
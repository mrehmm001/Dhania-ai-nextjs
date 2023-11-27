"use client";

import Heading from "@/components/heading";
import { Database} from "lucide-react";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";

const AddDataPage = () => {
    const proModal = useProModal();
    const [file,setFile] = useState<File>();
    const [isLoading, setLoading] = useState(false);
    
    const onSubmit = async (e:FormEvent)=>{
        e.preventDefault();
       if(!file) return;

       try{ 
        setLoading(true);
        if(file.type!="application/pdf"){
            toast.error("Invalid file: PDF file type only");
            setLoading(false);
            return;
        }
        const data = new FormData();
        data.set("file",file);
        await axios("/api/documents",{
            method: "post",
            url: "myurl",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          })
        toast.success("File uploaded!");
        setLoading(false);
       }catch(error:any){
        setLoading(false);
        if(error?.response?.status=="400"){
            proModal.onOpen();
        }else if(error?.response?.status=="300"){
            toast.error("Invalid file: PDF file type only");
        }else{
            toast.error("Something went wrong");
        }
       }
    }

    return ( 
            <div className="flex-1 flex flex-col">
                <Heading
                    title="Add your data here"
                    description="Insert your data here"
                    icon={Database}
                    iconColour="text-white"
                    bgColour="bg-primary"
                />
                <div className="px-4 lg:px-8 flex-1 flex flex-col">
                        <div className="flex-col w-80 space-x-1 mt-2">
                            <form onSubmit={onSubmit}>
                                <Label htmlFor="file" className="ml-2">Select document (pdf only)</Label>
                                <div className="flex space-x-3">
                                    <Input data-input="file" disabled={isLoading} onChange={(e)=>setFile(e.target.files?.[0])} id="file" type="file" />
                                    <Button data-input="submit" disabled={isLoading} type="submit">Upload</Button>
                                </div>
                            </form>
                        </div> 
                </div>
            </div>
     );
}
 
export default AddDataPage;
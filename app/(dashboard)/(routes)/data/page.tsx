"use client";

import Heading from "@/components/heading";
import { Database, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table,TableHeader,TableRow,TableHead,TableBody,TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Document{
    id: string;
    userId: string;
    createdAt: Date;
    fileType: string;
    fileSize: number;
    fileName: string;
    fileData: string;
}

const DataPage = () => {
    const [documents, setDocuments] = useState<Document[]>();
    const [backup, setBackup] = useState<Document[]>()
    const router = useRouter();
    const fetchDocuments = async ()=>{
        const data = await axios.get("/api/documents");
        setDocuments(data.data);
        setBackup(data.data);
    }
    useEffect(()=>{
        fetchDocuments();
    },[]);

    const formatBytes = (bytes:number, decimals = 2)=> {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const onSearch = (query:string) =>{
        setDocuments(backup!.filter(d=>d.fileName.toLowerCase().search(query.toLowerCase())>=0));
    }


    return ( 
            <div className="flex-1 flex flex-col">
                <Heading
                    title="Data Ingestion"
                    description="View your data sources here"
                    icon={Database}
                    iconColour="text-white"
                    bgColour="bg-primary"
                />
                <div className="px-4 lg:px-8 flex-1 flex flex-col">
                    <div className="flex space-x-1 w-72">
                        <Input onChange={(e)=>onSearch(e.target.value)} placeholder="Search..."/>
                        <Button onClick={()=>router.push("/data/new-data")}><Plus/></Button>
                    </div>
                    <div>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>File name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents && documents.map(doc=>(
                            <TableRow key={doc.id}>
                                <TableCell>{doc.fileName}</TableCell>
                                <TableCell>{doc.fileType}</TableCell>
                                <TableCell>{formatBytes(doc.fileSize)}</TableCell>
                                <TableCell className="text-right"><Button onClick={async(e)=>{
                                    axios.delete("/api/documents",{data:{fileName:doc.fileName}}).then(()=>{
                                        toast.success("Removed "+doc.fileName);
                                        setDocuments(documents.filter(d=>d.fileName!=doc.fileName));
                                    }).catch((e)=>{
                                        toast.error("Something went wrong! "+e);
                                    });
                                }}><Trash/></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                    </div>
                </div>
            </div>
     );
}
 
export default DataPage;
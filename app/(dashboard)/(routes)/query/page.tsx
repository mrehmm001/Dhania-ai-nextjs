"use client";

import Heading from "@/components/heading";
import { MessageSquare, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";
import { useEffect, useRef, useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import DhaniaAvatar from "@/components/dhania-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';
import { useUser } from "@clerk/nextjs";

const QueryPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<CreateChatCompletionRequestMessage[]>([]);
    const [isStreaming, setStreaming] = useState(false);
    const socket = io("http://localhost:3001",);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const ref = useRef<HTMLInputElement>(null);
    const user = useUser();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    useEffect(()=>{
        let currentReponse = "";
        socket.on("response",({token})=>{
            // setcurrReponse(prev=>prev+token);
            currentReponse = currentReponse+token;
            // const response: CreateChatCompletionRequestMessage = {
            //     role:"system",
            //     content:currentReponse
            // };
            // if(currentReponse){
            //     setMessages((current)=>[...current.slice(0,current.length-1) , response]);
            // }else{
            //     setMessages((current)=>[...current , response]);
            // }
            ref.current!.innerText=currentReponse;
        });

        socket.on("end",()=>{
            if(messages){
                const response: CreateChatCompletionRequestMessage = {
                    role:"system",
                    content:currentReponse
                };
                setMessages(current=>[...current.slice(0,current.length-1),response]);
                setStreaming(false);
                currentReponse="";
            }
            setStreaming(false);
        });
    },[socket, messages]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit =async (values:z.infer<typeof formSchema>) => {
        try{
            const userMessage: CreateChatCompletionRequestMessage = {
                role:"user",
                content:values.prompt
            };
            const response: CreateChatCompletionRequestMessage = {
                    role:"system",
                    content:""
            };
            const newMessages = [...messages, userMessage];
            // const response = await axios.post("/api/conversation", {
            //     messages:newMessages
            // });
            setMessages((current)=>[...current , userMessage, response]);
            socket.emit("get-response",{messages:newMessages,userId:user.user?.id});
            setStreaming(true);
            // setMessages((current)=>[...current , userMessage, response.data]);
            form.reset();
        }catch(error:any){
            if(error?.response?.status=="403"){
                proModal.onOpen();
            }else{
                toast.error("Something went wrong");
            }

        }finally{
            // router.refresh()
        }
    }

    return ( 
            <div className="flex-1 flex flex-col">
                <Heading
                    title="Query"
                    description="Our most advanced query model"
                    icon={MessageSquare}
                    iconColour="text-white"
                    bgColour="bg-primary"
                />
                <div className="px-4 lg:px-8 flex-1 flex flex-col">
                    <div className="space-y-4 mt-4 flex-1">
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader/>
                            </div>
                        )}
                        {messages.length===0 && !isLoading && (
                            <div> 
                                <Empty label="No conversation started."/>
                            </div>
                        )}
                        <div className="flex flex-col-reverse gap-y-4 max-h-[60%] overflow-y-auto">
                            {messages.map(message=>(
                                <div 
                                    key={message.content}
                                    className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", 
                                        message.role==="user"? "bg-white border border-black/10" : "bg-muted")
                                    }
                                >
                                    {message.role==="user"? <UserAvatar/> : <DhaniaAvatar/>}

                                    <p className="text-sm" ref={ref}>
                                        {/* <ReactMarkdown 
                                            className="text-sm overflow-hidden leading-7"
                                            components={{
                                                pre:({node, ...props})=>(
                                                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                        <pre {...props}/>
                                                    </div>
                                                ),
                                                code:({node, ...props})=>(
                                                        <code className="bg-black/10 rounded-lg p-1" {...props}/>
                                                )
                                            }}
                                        >
                                            {(message.role=="user"? message.content : (!isStreaming || message.content)  && message.content) || ""}
                                        </ReactMarkdown> */}
                                        {(message.role=="user"? message.content : (!isStreaming || message.content)  && message.content) || ""}

                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="py-4">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                            >
                                <FormField 
                                    name="prompt"
                                    render={({field})=>(
                                        <FormItem className="col-span-12 lg:col-span-10">
                                            <FormControl className="m-0 p-0">
                                                <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Select all customers from United States"
                                                {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} className="col-span-12 lg:col-span-2 w-full">Enter <Sparkles className="w-4 ml-3 fill-white"/></Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
     );
}
 
export default QueryPage;
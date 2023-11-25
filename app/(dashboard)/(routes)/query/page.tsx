"use client";

import Heading from "@/components/heading";
import { ChevronDown, ChevronUp, MessageSquare, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import {useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import DhaniaAvatar from "@/components/dhania-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

type chatCompetionInterface = ChatCompletionMessageParam &{
    metaData?:string,
}


const QueryPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<chatCompetionInterface[]>([]);
    const [toggleMetaData, setToggleMetaData] = useState(new Map<chatCompetionInterface,boolean>());
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit =async (values:z.infer<typeof formSchema>) => {
        try{
            const userMessage: chatCompetionInterface = {
                role:"user",
                content:values.prompt
            };
            setMessages((current)=>[...current , userMessage])
            const response = await axios.post("/api/query", {
                query:userMessage.content
            });
            const assistantMessage: chatCompetionInterface= {
                role:"assistant",
                content:response.data["text"],
                metaData: response.data["sourceDocuments"]
            };
            toggleMetaData.set(assistantMessage,false);
            setMessages((current)=>[...current , assistantMessage]);
            form.reset();
        }catch(error:any){
            if(error?.response?.status=="403"){
                proModal.onOpen();
            }else{
                toast.error("Something went wrong");
            }

        }finally{
            router.refresh()
        }
    }

    const handleToggleMetaData = (message: chatCompetionInterface) => {
        setToggleMetaData(prevState => {
          const newMap = new Map(prevState);
          newMap.set(message, !newMap.get(message));
          return newMap;
        });
      };

    return ( 
            <div className="flex-1 flex flex-col">
                <Heading
                    title="Query"
                    description="Query your data here"
                    icon={MessageSquare}
                    iconColour="text-white"
                    bgColour="bg-primary"
                />
                <div className="px-4 lg:px-8 flex-1 flex flex-col">
                    <div className="space-y-4 mt-4 flex-1">
                        {messages.length===0 && !isLoading && (
                            <div> 
                                <Empty label="No conversation started."/>
                            </div>
                        )}
                        <div className="flex flex-col gap-y-4 overflow-y-auto">
                            {messages.map(message=>(
                                <div 
                                    key={message.content}
                                    data-mesage={message.role}
                                    className={cn("p-8 w-full flex-col items-start gap-x-8 rounded-lg", 
                                        message.role==="user"? "bg-white border border-black/10" : "bg-muted")
                                    }
                                >
                                    <div className="flex space-x-2">
                                        {message.role==="user"? <UserAvatar/> : <DhaniaAvatar/>}
                                        <ReactMarkdown 
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
                                            {message.content || ""}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="mt-9 flex-col">
                                        {message.metaData && <Button onClick={()=>handleToggleMetaData(message)} variant={"link"}>{!toggleMetaData.get(message)?"Show sources": "Hide sources"}{!toggleMetaData.get(message)?<ChevronDown/> : <ChevronUp/>}</Button>}
                                        {message.metaData && toggleMetaData.get(message) &&
                                            <pre className="bg-blue-950 max-h-96 overflow-y-auto text-gray-300 p-3 overflow-auto">
                                                    {JSON.stringify(message.metaData,null, 2)!}
                                            </pre>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isLoading && (
                            <div data-loading className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader/>
                            </div>
                        )}
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
                                                <Input data-input="query" className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" 
                                                disabled={isLoading}
                                                placeholder="Hey Dhania..."
                                                {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button data-button="submit" disabled={isLoading} className="col-span-12 lg:col-span-2 w-full">Enter <Sparkles className="w-4 ml-3 fill-white"/></Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
     );
}
 
export default QueryPage;
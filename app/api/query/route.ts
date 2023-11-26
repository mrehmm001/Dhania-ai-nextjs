import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAIApi from "openai"
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";
import { getPGVectorStore } from "@/lib/pgvectorStore";
import { PromptTemplate } from "langchain/prompts";
import { checkMessageLimit, increaseMessageCount } from "@/lib/api-limit";

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    req:Request
){
    try{
        const {userId} = auth();
        const body = await req.json();
        const {query} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        if(!(await checkMessageLimit())){
            return new NextResponse("Message limit for user reached!", {status:400}) 
        }
        if(!openai.apiKey){
            return new NextResponse("OpenAI API Key not configured", {status:500}) 
        }
        if(!query){
            return new NextResponse("Messages are required", {status:400});
        }

        const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo"});
        const pgVectorStore = await getPGVectorStore();
        const retreiver = pgVectorStore!.asRetriever();
        // const prompt = new PromptTemplate({
        //     inputVariables: ["query","context"],
        //     template: "You are Dhania, a query bot. Your primary task is to provide responses to various queries '{query}'. First, evaluate the query to understand its nature and complexity. Depending on this assessment, decide whether to incorporate the provided context '{context}' into your response. If the query is complex or requires specific background knowledge, use the given context to enhance your answer. For more straightforward queries, a direct response without additional context might be more suitable. Regardless of the context usage, ensure your response is formatted in Markdown, utilizing bullet points, headings, and bold text to ensure clarity and emphasis. Your goal is to provide clear, concise, and relevant answers, tailored to the specific requirements of each query.",
        // });
        const chain = RetrievalQAChain.fromLLM(model, retreiver,{returnSourceDocuments:true});
        const result = await chain.call({query:query})
        await increaseMessageCount();
        return NextResponse.json(result);
    }catch(error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error", {status:500});
    }
}

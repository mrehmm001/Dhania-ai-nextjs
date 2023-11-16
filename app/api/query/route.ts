import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAIApi from "openai"
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";
import { getPGVectorStore } from "@/lib/pgvectorStore";
import { PromptTemplate } from "langchain/prompts";

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
        if(!openai.apiKey){
            return new NextResponse("OpenAI API Key not configured", {status:500}) 
        }
        if(!query){
            return new NextResponse("Messages are required", {status:400});
        }

        const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo"});
        const pgVectorStore = await getPGVectorStore();
        const retreiver = pgVectorStore!.asRetriever();
        const prompt = new PromptTemplate({
            inputVariables: ["query","context"],
            template: "You are query bot called Dhania. You need to answer this query {query} based from this context {context}. Give normal response to any query that seems normal like e.g 'hello'. Your answer should be in markdown format, so make sure to use bullet points, headings, bold text.",
          });
        const chain = RetrievalQAChain.fromLLM(model, retreiver,{returnSourceDocuments:true, prompt:prompt});
        const result = await chain.call({query:query})
        return NextResponse.json(result);
    }catch(error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error", {status:500});
    }
}

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAIApi from "openai"
import { Pinecone } from '@pinecone-database/pinecone';
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";

const pinecone = new Pinecone({
    apiKey: process.env["PINECONE_API_KEY"]!,
    environment: 'gcp-starter',
});

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
        
        const embeddings = new OpenAIEmbeddings({openAIApiKey:process.env["OPENAI_API_KEY"]})
        const index = pinecone.index("medium-blog-embeddings-index");
        const retreiver = new PineconeStore(embeddings, {pineconeIndex:index}).asRetriever();
        const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo"});
        const chain = RetrievalQAChain.fromLLM(model, retreiver,{returnSourceDocuments:true});
        const result = await chain.call({query:query.content})
        console.log("hello",)
        
        return NextResponse.json(result["text"]);
    }catch(error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error", {status:500});
    }
}

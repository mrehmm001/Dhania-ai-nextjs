import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader} from "langchain/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import { PGVectorStore } from "langchain/vectorstores/pgvector";
import { PoolConfig } from "pg";
import { getPGVectorStore, getUserPoolConfig } from "@/lib/pgvectorStore";

export async function POST(
    req:Request
){
    const {userId} = auth();
    const data = await req.formData();
    const fileBlob:Blob = data.get("file") as Blob;

    if(!userId){
        return new NextResponse("Access denied", {status:401})
    }
    
    const response = await prismadb.userFile.findUnique({
        where:{fileName:fileBlob.name}
    })
    if(!response){
        const res = await prismadb.userFile.create({
            data:{
                fileName:fileBlob.name,
                fileSize:fileBlob.size,
                fileType:fileBlob.type,
                userId
            }
        })
        const loader = new PDFLoader(fileBlob)
        const document = await loader.load();
        document.forEach(doc=>{
            doc.metadata["pdf"]["info"]["name"]=fileBlob.name;
        })
        
        const text_splitter = new RecursiveCharacterTextSplitter({chunkSize:1000,chunkOverlap:0,separators:[" ", ",", "\n"]})
        const documents = await text_splitter.splitDocuments(document);
        const embeddings = new OpenAIEmbeddings({openAIApiKey:process.env["OPENAI_API_KEY"]})

        //Store data to pgvector
        await PGVectorStore.fromDocuments(documents,embeddings,getUserPoolConfig()!);
    }
    
    return new NextResponse("success", {status:200});
}


export async function GET(){
    const {userId} = auth();
    if(!userId){
        return new NextResponse("Access denied", {status:401})
    }
    const data = await prismadb.userFile.findMany({
        where:{userId:userId}
    })
    return new NextResponse(JSON.stringify(data));
}

export async function DELETE(req:Request){
    const {userId} = auth();
    if(!userId){
        return new NextResponse("Access denied", {status:401})
    }
    const {fileName} = await req.json();
    if(!fileName){
        return new NextResponse("File not found", {status:400})
    }

    await prismadb.userFile.delete({
        where:{fileName}
    });
    
    await prismadb.$queryRawUnsafe(`DELETE FROM ${userId} WHERE metadata -> 'pdf' -> 'info' ->> 'name' = '${fileName}'`)
    
    return new NextResponse("File deleted", {status:200})
}
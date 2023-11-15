import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader} from "langchain/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone";

const pinecone = new Pinecone({
    apiKey: process.env["PINECONE_API_KEY"]!,
    environment: 'gcp-starter',
  });
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
    
    //Store data to pineconedb
    const loader = new PDFLoader(fileBlob)
    const document = await loader.load();

    
    const text_splitter = new RecursiveCharacterTextSplitter({chunkSize:1000,chunkOverlap:0,separators:[" ", ",", "\n"]})
    const documents = await text_splitter.splitDocuments(document);

    const embeddings = new OpenAIEmbeddings({openAIApiKey:process.env["OPENAI_API_KEY"]})
    const index = pinecone.index("medium-blog-embeddings-index");
    await PineconeStore.fromDocuments(documents,embeddings,{pineconeIndex:index})


    if(!response){
        await prismadb.userFile.create({
            data:{
                fileName:fileBlob.name,
                fileSize:fileBlob.size,
                fileType:fileBlob.type,
                userId
            }
        })
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

    return new NextResponse("File deleted", {status:200})
}
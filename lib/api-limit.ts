import {auth} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import { MAX_FREE_DOCUMENT_UPLOADS, MAX_FREE_MESSAGE_COUNT } from "@/constants"

export const increaseMessageCount = async () => {
    const {userId} = auth();
    if(!userId){
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    })

    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where:{userId},
            data:{
                messageCount: userApiLimit.messageCount+1
            }
        })
    }
}

export const increaseDocumentCount = async () => {
    const {userId} = auth();
    if(!userId){
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    })

    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where:{userId},
            data:{
                documentCount: userApiLimit.documentCount+1
            }
        })
    }else{
        await prismadb.userApiLimit.create({
            data:{
                userId:userId,
                documentCount:1,
            }
        })
    }
}

export const decreaseDocumentCount = async () => {
    const {userId} = auth();
    if(!userId){
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    })

    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where:{userId},
            data:{
                documentCount: Math.max(userApiLimit.documentCount-1,0)
            }
        })
    }else{
        await prismadb.userApiLimit.create({
            data:{
                userId:userId,
                documentCount:0,
            }
        })
    }
}


export const checkMessageLimit = async() => {
    const {userId} = auth();
    if(!userId){
        return;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    
    if(!userApiLimit || userApiLimit.messageCount < MAX_FREE_MESSAGE_COUNT) return true;
        
    return false;
}

export const checkDocumentLimit = async() => {
    const {userId} = auth();
    if(!userId){
        return;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    
    if(!userApiLimit || userApiLimit.documentCount < MAX_FREE_DOCUMENT_UPLOADS) return true;
        
    return false;
}

export const getMessageCount = async() => {
    const {userId} = auth();
    if(!userId){
        return 0;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    
    if(!userApiLimit) return 0;
        
    return userApiLimit.messageCount;
}

export const getDocumentCount = async() => {
    const {userId} = auth();
    if(!userId){
        return 0;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });
    
    if(!userApiLimit) return 0;
        
    return userApiLimit.documentCount;
}
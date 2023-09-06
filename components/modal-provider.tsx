"use client";

import { useState, useEffect } from "react";
import ProModal from "@/components/pro-modal";

export const ModalProvider = ()=>{
    // used for solving hydration errors
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }

    return(
        <>
            <ProModal/>
        </>
    )
}
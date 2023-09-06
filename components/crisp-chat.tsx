"use client";

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("45d6d71f-97b6-46bd-8e79-26a0591faadd");
    },[]);

    return null;
}
 

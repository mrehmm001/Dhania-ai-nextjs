import {Amplify,Auth} from "aws-amplify";
import {Authenticator} from "@aws-amplify/ui-react"
import config from "@/aws-exports.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AmplifyProvider = ({children}:{
    children: React.ReactNode,
    privateRoute?:boolean
  }) => {
    Amplify.configure({...config, ssr:true});

    return ( 
        <>{children}</>
     );
}
 
export default AmplifyProvider;
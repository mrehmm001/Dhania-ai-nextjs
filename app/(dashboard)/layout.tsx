import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import { headers } from "next/headers";
import { withSSRContext } from "aws-amplify";
import { redirect } from "next/navigation";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports.json";

Amplify.configure({ ...awsExports, ssr: true });

// eslint-disable-next-line @next/next/no-async-client-component
const DashboardLayout = async ({
    children
}:{children:React.ReactNode}) => {
    const apiLimitCount = 2;
    const isPro = false;

    const req = {
        headers: {
          cookie: headers().get("cookie"),
        },
    };
    
    
    const { Auth } = withSSRContext({ req });

    try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user)
        return ( 
            <div className="h-full relative">
                <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 bg-gray-900">
                    <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
                </div>
                <main className="md:pl-72">
                    <Navbar apiLimitCount={apiLimitCount}/>
                    {children}
                </main>
            </div>
         );
    }catch(error){
        console.log(error);
        redirect("/signin");
    }

}
 
export default DashboardLayout;
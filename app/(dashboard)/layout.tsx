import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

const DashboardLayout = async ({
    children
}:{children:React.ReactNode}) => {
    const apiLimitCount = 2;
    const isPro = false;


    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 bg-gray-900">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            </div>
            <main className="md:pl-72 h-full flex flex-col">
                <Navbar apiLimitCount={apiLimitCount}/>
                {children}
            </main>
        </div>
     );

}
 
export default DashboardLayout;
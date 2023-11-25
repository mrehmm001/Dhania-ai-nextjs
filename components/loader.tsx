import Image from "next/image";

const Loader = () => {
    return ( 
        <div data-loading className="h-full flex flex-col gap-y-4 items-center">
            <div className="w-10 h-10 relative animate-bounce">
                <Image
                    alt="logo"
                    fill
                    src="/logo.png"
                />
            </div>
            <p className="text-sm text-muted-foreground">
                Dhania is thinking...
            </p>
        </div>
     );
}
 
export default Loader;
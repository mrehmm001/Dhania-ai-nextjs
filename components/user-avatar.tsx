import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
    const user = {
        firstName:"bob",
        lastName:"idk",
        imageUrl: "test"
    }
    return ( 
        <div>
            <Avatar className="h-8 w-8">
                <AvatarImage className="p-1" src={user?.imageUrl}/>
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>
        </div>
     );
}
 
export default UserAvatar;
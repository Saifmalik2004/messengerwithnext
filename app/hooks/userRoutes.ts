import { usePathname } from "next/navigation"
import UseConversation from "./useConversation";
import { useMemo } from "react";
import { HiChat, HiUsers } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes=()=>{
    const pathname=usePathname();
    const{conversationId}= UseConversation();
    const routes=useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon:HiChat,
            active:pathname==='/conversation' || !!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active:pathname==='/users' 
        },
        {
            label:'Logout',
            href:'#',
            onClick:()=> signOut(),
            icon:HiArrowLeftOnRectangle,
            
        }
    ],[pathname,conversationId])
    return routes
}
export default useRoutes;
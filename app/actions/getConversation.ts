import prismadb from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser"

const getConversartions=async()=>{
    const currentUser=await getCurrentUser();
    if(!currentUser?.id){
        return[];
    }

    try {
        const conversations = await prismadb.conversation.findMany({
            orderBy:{
                lastMessageAt:'desc'
            },
            where:{
                userIds:{
                    has:currentUser.id
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }
        });
return conversations;
    } catch (error) {
        return []
    }
}

export default getConversartions
import prismadb from "../libs/prismadb";
import getSession from "./getSession";

const getUser =async()=>{
    const session=await getSession();
    if(!session?.user?.email){
        return[]
    }

    try {
        const users =await prismadb.user.findMany({
            orderBy:{
         createdat:'desc',
            },
            where:{
                NOT:{
                    email:session.user.email
                }
            }
        });
        return users;
    } catch (error) {
        return[]
    }
}

export default getUser;
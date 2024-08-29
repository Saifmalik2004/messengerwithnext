import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
 interface UserBoxProps{
    data:User
 }
const UserBox:React.FC<UserBoxProps>=({
    data
})=> {
    const router=useRouter();
    const [isloading, setIsloading] = useState(false);

    const handleClick=useCallback(()=>{
         setIsloading(true)

         axios.post("/api/conversations",{userId:data.id})
         .then((data)=>{
            router.push(`/conversations/${data.data.id}`);
         })
         .finally(()=> setIsloading(false));
    },[data,router])
  return (
   <div onClick={handleClick} className="w-full">

   </div>
  )
}

export default UserBox
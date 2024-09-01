'use client'
import UseConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/userRoutes'
import React, { useState } from 'react'
import MobileItem from './MobileItem';
import Avatar from '../Avatar';
import { User } from '@prisma/client';
interface MobileFooterProps{
  currentUser:User
}
const MobileFooter:React.FC<MobileFooterProps>=({
  currentUser
})=> {
    const routes=useRoutes();
    const{isOpen} =UseConversation();
    const [settingIsOpen, setsettingIsOpen] = useState(false);
    if(isOpen){
        return null
    }
  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
    {routes.map((item)=>(
<MobileItem label={item.label}
key={item.label} icon={item.icon} href={item.href} active={item.active} onClick={item.onClick}/>
    ))}  
    <div 
          onClick={() => setsettingIsOpen(true)} 
          className="cursor-pointer hover:opacity-75 transition mx-5 mt-1"
        >
          <Avatar user={currentUser} />
        </div>  
    </div>
  )
}

export default MobileFooter
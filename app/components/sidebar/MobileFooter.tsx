'use client'
import UseConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/userRoutes'
import React from 'react'
import MobileItem from './MobileItem';

const MobileFooter=()=> {
    const routes=useRoutes();
    const{isOpen} =UseConversation();
    if(isOpen){
        return null
    }
  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
    {routes.map((item)=>(
<MobileItem label={item.label}
key={item.label} icon={item.icon} href={item.href} active={item.active} onClick={item.onClick}/>
    ))}    
    </div>
  )
}

export default MobileFooter
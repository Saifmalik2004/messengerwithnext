import Image from 'next/image'
import React from 'react'

const EmptyState=()=> {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100'>
       
        <div className="text-center items-center flex flex-col">
        <Image
      alt="logo"
      height='50'
      width='50'
      className="mx-auto w-auto"
      src='/images/logo1.png'/>
<h3 className="mt-2 tex-2xl font-semibold text-gray-900">
Select a Chat or Start a new Conversation
</h3>
        </div>
       </div>
  )
}

export default EmptyState
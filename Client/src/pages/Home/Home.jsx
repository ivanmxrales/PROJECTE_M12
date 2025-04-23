import React from 'react';
import { UnlikeLogo, LikeLogo, ShareLogo, CommentLogo } from "../../assets/constants";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10  w-[800px] mt-[20%]">
      <div className=" top-0 w-full max-w-screen-xl mx-auto border z-50">
        <div className="flex w-full border-b h-24 ">
          <div className='flex items-center gap-5 align-center'>
            <div className='ml-10 w-10 h-10 border rounded-full'>
              <img src="a" alt="" />
            </div>
            <div>
              <span className='hidden md:block text-white'>nom usuari</span>
            </div>
            <button className="ml-[500px] scale-150'w-10 h-10 bg-transparent text-center">
              ···
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold text-white'>Benvingut a la pàgina d'inici</h1>
          <p className='mt-4 text-lg text-gray-400'>Aquí trobaràs el contingut més recent i interessant.</p>
        </div>
        <div className='flex w-full h-24 border-t gap-5 '>
          <LikeLogo className="mt-5"></LikeLogo>
          <UnlikeLogo className="mt-5"></UnlikeLogo>
          <CommentLogo className="mt-5"></CommentLogo>
          <ShareLogo className="mt-5"></ShareLogo>
        </div>
      </div>

      <div className=" top-0 w-full max-w-screen-xl mx-auto border z-50">
        <div className="flex w-full border-b h-24 ">
          <div className='flex items-center gap-5 align-center'>
            <div className='ml-10 w-10 h-10 border rounded-full'>
              <img src="a" alt="" />
            </div>
            <div>
              <span className='hidden md:block text-white'>nom usuari</span>
            </div>
            <button className="ml-[500px] scale-150'w-10 h-10 bg-transparent text-center">
              ···
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold text-white'>Benvingut a la pàgina d'inici</h1>
          <p className='mt-4 text-lg text-gray-400'>Aquí trobaràs el contingut més recent i interessant.</p>
        </div>
        <div className='flex w-full h-24 border-t gap-5 '>
          <LikeLogo className="mt-5"></LikeLogo>
          <UnlikeLogo className="mt-5"></UnlikeLogo>
          <CommentLogo className="mt-5"></CommentLogo>
          <ShareLogo className="mt-5"></ShareLogo>
        </div>
      </div>
    </div>
  )
}

export default Home
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    return (
        <div className='flex'>
            {pathname !== '/auth' ? (
               <>
                    <div className='fixed left-0 top-0 w-60'>
                        <Sidebar/>
                    </div>
                    <div className="fixed top-10 left-0 w-full z-[1000]">
                        <Navbar/>
                    </div>
               </>
            ) : null}
            <div className='flex-1 mx-auto w-[calc(100%-70px)] md:w-[calc(100%-240px)]'>
                {children}
            </div>
        </div>
    )
}

export default PageLayout



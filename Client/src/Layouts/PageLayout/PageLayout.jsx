import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Userbar from '../../components/Userbar/Userbar';

const PageLayout = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            //console.log("User loguejat:", parsed.user);
            setUser(parsed.user);
        }
    }, []);

    const { pathname } = useLocation();

    const showSidebar = (pathname !== '/auth' && pathname !== '/verify' && pathname !== '/change-email' &&
        pathname !== '/new-password' && pathname !== '/reset-password' && pathname !== '/chat/:username');

    const showNavbar = (pathname !== '/auth' && pathname !== '/posts' &&
        pathname !== '/postnew' && pathname !== '/search' && pathname !== `/${user?.username}`
        && pathname !== '/messages' && pathname !== '/config' && pathname !== '/profile' &&
        pathname !== '/messages' && !pathname.startsWith('/chat/'));


    return (
        <div className="flex">
            {showSidebar && (
                <>
                    <div className="fixed bottom-0 left-0 w-full h-16 md:top-0 md:left-0 md:h-full md:w-60">
                        <Sidebar />
                    </div>


                    {pathname === '/posts' || showNavbar ? (
                        <div className="fixed right-0 top-0 w-60 hidden lg:block">
                            <Userbar />
                        </div>
                    ) : null}
                </>
            )}
            <div className="flex-1 mx-auto w-[calc(100%-70px)] md:w-[calc(100%-240px)] mt-[0px]">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;

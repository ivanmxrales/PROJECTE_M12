import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PageLayout = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
          const storedUser = localStorage.getItem("user-info");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            console.log("User loguejat:", parsed.user);
            setUser(parsed.user); 
          }
        }, []);

    const { pathname } = useLocation();
    const showSidebar = (pathname !== '/auth');
    const showNavbar = (pathname !== '/auth' && pathname !== '/posts' && pathname !== `/profile/${user?.username}`);

    return (
        <div className="flex">
            {showSidebar && (
                <>
                    <div className="fixed left-0 top-0 w-60">
                        <Sidebar />
                    </div>

                    {pathname === '/posts' || showNavbar ? (
                        <div className="fixed right-0 top-0 w-60">
                            <Sidebar />
                        </div>
                    ) : null}

                    {showNavbar && (
                        <div className="fixed left-60 w-[calc(100%-240px)] z-[1000]">
                            <Navbar />
                        </div>
                    )}
                </>
            )}
            <div className="flex-1 mx-auto w-[calc(100%-70px)] md:w-[calc(100%-240px)]">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;

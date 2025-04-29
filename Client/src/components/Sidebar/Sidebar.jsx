import { Router, Link as RouterLink } from "react-router-dom";
import { CreatePostLogo, HomeLogo, InstagramLogo, InstagramMobileLogo, MessagesLogo, NotificationsLogo } from "../../assets/constants";
import { SearchLogo } from "../../assets/constants";
import { useState, useEffect } from "react";
import { LogoutIcon as Logout } from "../../assets/constants";

const Sidebar = () => {
  const [user, setUser] = useState(null);

  /* useEffect(() => {
    console.log("USUARI LOCALSTORAGE:", localStorage.getItem("user-info"));
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User loguejat:", JSON.parse(storedUser));
    }
  }, []); */

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.user); // <-- Only keep the nested user object
    }
  }, []);

  const handleUsername = () => {
    if (user.username.length > 10) {
      return user.username.slice(0, 10) + "...";
    }
    return user.username;
  };

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    setUser(null);
  };

  const sidebarItems = [
    {
      icon: HomeLogo,
      text: 'Inici',
      link: '/',
    },
    {
      icon: SearchLogo,
      text: 'Buscar',
      link: '/posts',
    },
    {
      icon: MessagesLogo,
      text: 'Missatges',
    },
    {
      icon: NotificationsLogo,
      text: 'Notificacions',
      link: '/profile',
    },
    {
      icon: CreatePostLogo,
      text: 'Publicació',
      link: '/postnew',
    }
  ]

  return (
    <div className="h-screen border-r border-l border-white/30 py-8 px-2 md:px-4 sticky top-0 left-0">
      <div className="flex flex-col gap-10 w-full h-full">

        <RouterLink to="/" className="pl-2 hidden md:block cursor-pointer">
          <InstagramLogo />
        </RouterLink>

        <RouterLink
          to="/"
          className="p-2 block md:hidden rounded-md hover:bg-white/20 w-10 cursor-pointer"
        >
          <InstagramMobileLogo />
        </RouterLink>

        <div className="flex-col gap-10 cursor-pointer">
          {sidebarItems.map((item, index) => (
            <RouterLink
              key={index}
              to={item.link}
              className="flex items-center gap-3 p-2 hover:bg-white/20"
            >
              <br />
              <br />
              <item.icon className="w-6 h-6" />
              <span className="hidden md:block text-white">{item.text}</span>
            </RouterLink>
          ))}
        </div>

        {user && (
          <>
            <RouterLink
              to={`/${user.username}`}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/20">
              <div className="flex items-center gap-3 p-2 rounded-md ">
                <div className="w-8 h-8 border rounded-full overflow-hidden">
                  <img src={user.profile_picture} alt="profile" className="w-full h-full object-cover" />
                </div>
                <p className="hidden md:block text-white">{handleUsername()}</p>
              </div>
            </RouterLink>

            <RouterLink
              to="/auth"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/20"
              onClick={handleLogout}>

              <div className="flex items-center gap-3 p-2 rounded-md ">
                <div className="w-8 h-8 border rounded-full overflow-hidden">
                  <Logout/>
                </div>
                <p className="hidden md:block text-white">Tancar sessió</p>
              </div>
            </RouterLink>
          </>

        )}
      </div>
    </div>
  );
};

export default Sidebar;

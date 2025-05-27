import { Link as RouterLink } from "react-router-dom";
import {
  CreatePostLogo,
  HomeLogo,
  InstagramMobileLogo,
  MessagesLogo,
  NotificationsLogo,
  LuminaLogo,
  SearchLogo,
} from "../../assets/icons";
import { useState, useEffect } from "react";
import { LogoutIcon as Logout } from "../../assets/icons";
import useLogout from "../../hooks/useLogout";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const { logout } = useLogout();

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.user);
    }
  }, []);

  const handleUsername = () => {
    if (user.username.length > 10) {
      return user.username.slice(0, 10) + "...";
    }
    return user.username;
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user-info");
  };

  const sidebarItems = [
    { icon: HomeLogo, text: "Inici", link: "/" },
    { icon: SearchLogo, text: "Buscar", link: "/search" },
    { icon: MessagesLogo, text: "Missatges", link: "/messages" },
    { icon: NotificationsLogo, text: "Notificacions", link: "/" },
    { icon: CreatePostLogo, text: "Publicació", link: "/postnew" },
  ];

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full h-16 border-t border-white/30 bg-black
        flex md:flex-col md:fixed md:top-0 md:left-0 md:w-60 md:h-screen md:border-r md:border-t-0 md:py-8 md:px-4
        px-2 z-[999px]"
    >
      {/* Logo */}
      <RouterLink to="/" className="hidden md:block mb-10 pl-2 cursor-pointer">
        <LuminaLogo />
      </RouterLink>
      <RouterLink
        to="/"
        className="block md:hidden rounded-md hover:bg-white/20 w-10 cursor-pointer self-center"
      >
        <InstagramMobileLogo />
      </RouterLink>

      {/* Menu items */}
      {sidebarItems.map((item, index) => (
        <RouterLink
          key={index}
          to={item.link}
          className="
            flex items-center gap-3 p-2 rounded-md hover:bg-white/20
            md:mb-6
            justify-center md:justify-start
            flex-1 md:flex-none
          "
        >
          <item.icon className="w-6 h-6" />
          <span className="hidden md:inline text-white">{item.text}</span>
        </RouterLink>
      ))}

      {/* User and Logout */}
      {user && (
        <>
          <RouterLink
            to={`/${user.username}`}
            className="
              flex items-center gap-3 p-2 rounded-md hover:bg-white/20
              md:mt-auto
              justify-center md:justify-start
              flex-1 md:flex-none
            "
          >
            <div className="w-8 h-8 border rounded-full overflow-hidden">
              <img
                src={user.profile_picture}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="hidden md:inline text-white">{handleUsername()}</p>
          </RouterLink>

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3 p-2 rounded-md hover:bg-white/20
              justify-center md:justify-start
              flex-1 md:flex-none
              cursor-pointer
              bg-transparent border-none
            "
          >
            <Logout className="w-6 h-6" />
            <span className="hidden md:inline text-white">Tancar sessió</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;

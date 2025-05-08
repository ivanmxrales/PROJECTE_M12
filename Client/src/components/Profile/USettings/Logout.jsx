import useLogout from "../../../hooks/useLogout";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext"; 

export const Logout = ({ onClose }) => {
    const { logout } = useLogout();
    const { setUser } = useContext(UserContext); 

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("user-info");
        setUser(null);
        window.location.href = "/auth"; 
    };

    return (
        <button
            className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
            onClick={handleLogout}
        >
            Tancar sessió
        </button>
    );
};

import { Navigate } from "react-router";
import useLogout from "../../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Logout = () => {
    const navigate = useNavigate();
    const {logout}  = useLogout();

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("user-info");
        //setUser(null);
        navigate('/auth'); 
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

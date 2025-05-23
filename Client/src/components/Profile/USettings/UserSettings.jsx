import React from "react";
import useLogout from "../../../hooks/useLogout";
import { Close, ChangeEmail, ChangePassword, DeleteAccount } from "./UserOptions";
import { Logout } from "./Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import EditEmail from "../../AuthForm/EditEmail";
import EditPassword from "../../AuthForm/EditPassword";
import { Link } from "react-router-dom";


const UserSettings = ({ user, onClose }) => {
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-[9999]">
            <div className="bg-black p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 tcolor">Opcions</h2>
                <div className="mt-6 flex flex-col gap-6">
                    {!showChangeEmail && !showChangePassword && (
                        <>
                            <Close onClose={onClose} />
                            <Logout />
                            <button
                                className="bg-transparent text-white hover:text-white text-sm border-b 
                                hover:border border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
                                onClick={() =>
                                    navigate(`/change-email?email=${encodeURIComponent(user.email)}&from=${encodeURIComponent(location.pathname)}`)
                                }
                            >
                                Canviar email
                            </button>
                            <button
                                className="bg-transparent text-white hover:text-white text-sm border-b 
                                hover:border border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
                                onClick={() =>
                                    navigate(`/reset-password?email=${encodeURIComponent(user.email)}&from=${encodeURIComponent(location.pathname)}`)
                                }
                            >
                                Canviar contrasenya
                            </button>
                            <DeleteAccount userId={user.id} />

                        </>
                    )}

                    {showChangeEmail && (
                        <EditEmail onClose={() => setShowChangeEmail(false)} user={user} />
                    )}

                    {showChangePassword && (
                        <EditPassword onClose={() => setShowChangePassword(false)} user={user} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserSettings;

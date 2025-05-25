import React from "react";
import { useNavigate } from "react-router-dom";
import getAuthUserToken from "../../../utility/getAuthUserToken";
import api from "../../../lib/axios";

export const DeleteAccount = ({ userId }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm("Segur que vols esborrar el teu compte?");
        if (!confirmed) return;

        try {
            await api.delete(`/api/user/${userId}`, getAuthUserToken());
            alert("Compte eliminat correctament.");
            navigate('/auth');
        } catch (error) {
            //console.error(error);
            alert("Error inesperat. Torna-ho a intentar.");
        }
    };

    return (
        <button
            className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
            onClick={handleDelete}
        >
            Esborrar Compte
        </button>
    );
};



export const ChangeEmail = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Canviar email
    </button>
);

export const ChangePassword = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Canviar contrasenya
    </button>
);

export const Close = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Tancar
    </button>
);
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const emailParam = query.get('email') || '';
    const from = query.get('from') || '/';
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const { logout } = useLogout();


    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("user-info");
    };

    useEffect(() => {
        setEmail(emailParam);
    }, [emailParam]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError({ message: "El correu electrònic és necessari" });
            return;
        }
        if (!validateEmail(email)) {
            setError({ message: "El correu electrònic no és vàlid" });
            return;
        }

        try {
            await api.post('/api/forgot-password', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });
            alert('Comprova el correu electrònic per restablir la contrasenya');
        } catch (error) {
            //console.error(error);
            let message = error.response?.data?.message || "No s'ha pogut enviar el correu";
            if (message.includes("Please wait before retrying")) {
                message = "Si us plau, espera uns minuts abans d'intentar-ho de nou.";
            } else {
                message = "El correu és invàlid";
            }
            setError({ message });
        }

    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Recupera la teva contrasenya</h1>
                <p className="mb-6 text-center">
                    Introdueix la teva adreça electrònica i t’enviarem un enllaç per restablir la contrasenya.
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Correu electrònic
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"

                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="exemple@correu.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && (
                        <div className="text-red-500 text-sm mb-4">{error.message}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Envia enllaç de restabliment
                    </button>
                </form>
                <Link to="/auth" onClick={handleLogout} className="text-blue-500 hover:underline mt-4 block text-center">
                    Tornar a la pàgina d'inici de sessió
                </Link>
                <br />
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                    className="text-blue-500 hover:underline mt-4 block text-center"
                >
                    Anar cap enrere
                </a>
            </div>
        </div>
    );
};

export default ResetPassword;

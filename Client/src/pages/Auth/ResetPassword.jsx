import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const emailParam = query.get('email') || '';
    const from = query.get('from') || '/';
    const [email, setEmail] = useState('');
    const { logout } = useLogout();
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("user-info");
        //setUser(null);;
    };

    useEffect(() => {
        setEmail(emailParam);
      }, [emailParam]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = useParams().email;
        try {
            const response = await fetch('http://localhost:8000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Comprova el correu electrònic per restablir la contrasenya');
            } else {
                alert(data.message || 'Error sending reset email');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
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
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="exemple@correu.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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

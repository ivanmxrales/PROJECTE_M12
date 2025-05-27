import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const NewPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const email = query.get('email');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const logout = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token, email, password, password_confirmation }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Contrasenya modificada');
      logout();
    
    } else {
      alert("Contrasenyes diferents o no compleixen els requisits (8-20 càracters)");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className=" p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Reseteja la contrasenya!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Correu electrònic"
                    value={email}
                    readOnly 
                
                />
                
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nova contrasenya"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    id="password_confirmation"
                    name="password_confirmation"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirma la contrasenya"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Canviar contrasenya
                </button>
            </form>
            <Link to="/auth" className="text-blue-500 hover:underline mt-4 block text-center">
                Tornar a la pàgina d'inici de sessió
            </Link>
        </div>
    </div>
);
};

export default NewPassword;
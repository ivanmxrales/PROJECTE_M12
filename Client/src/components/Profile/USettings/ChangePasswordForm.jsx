import React, { useState } from 'react';
import api from '../../../lib/axios';

const ChangePasswordForm = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            return setError("Les contrasenyes no coincideixen.");
        }

        try {
            setLoading(true);
            const token = JSON.parse(localStorage.getItem('user-info'))?.token;

            await api.put('/api/user/change-password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('Contrasenya actualitzada correctament!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error en canviar la contrasenya.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-white text-sm">Contrasenya actual</label>
            <input
                type="password"
                className="bg-white/10 border border-white/20 text-white p-2 rounded"
                placeholder="Contrasenya actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label className="text-white text-sm">Nova contrasenya</label>
            <input
                type="password"
                className="bg-white/10 border border-white/20 text-white p-2 rounded"
                placeholder="Nova contrasenya"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="text-white text-sm">Confirma la nova contrasenya</label>
            <input
                type="password"
                className="bg-white/10 border border-white/20 text-white p-2 rounded"
                placeholder="Confirma nova contrasenya"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white mt-2 py-2 rounded"
            >
                {loading ? 'Actualitzant...' : 'Actualitza contrasenya'}
            </button>

            <button
                onClick={onClose}
                className="text-white mt-2 underline text-sm"
            >
                Tancar
            </button>
        </div>
    );
};

export default ChangePasswordForm;

import React, { useState } from 'react';
import useAccountSecurity from '../../../hooks/useAccountSecurity'; 
import { useNavigate } from 'react-router-dom';

const ChangeEmailForm = ({ onClose, user }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();

    const { updateEmail, loading, error, message } = useAccountSecurity();

    const handleChangeEmail = async () => {
        setLocalError(null);

        if (newEmail !== confirmEmail) {
            return setLocalError("Els correus electrònics no coincideixen.");
        }

        await updateEmail(user.id, currentPassword, newEmail);
        if (!error) {
            setCurrentPassword('');
            setNewEmail('');
            setConfirmEmail('');
            navigate(`/${user.username}`);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-white text-sm">Contrasenya actual</label>
            <input
                type="password"
                className="bg-white/10 border border-white/20 text-white p-2 rounded"
                placeholder="Introdueix la contrasenya"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            

            <label className="text-white text-sm">Nou correu electrònic</label>
            <input
                type="email"
                className="bg-white/10 border border-white/20 text-white p-2 rounded"
                placeholder="nou@email.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />

            <label className="text-white text-sm">Confirma el nou correu electrònic</label>
            <input
                type="email"
                className="bg-white/10 border border-white/20 text-white p-2 rounded"
                placeholder="nou@email.com"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
            />

            {(localError || error) && (
                <p className="text-red-500 text-sm">
                    {localError || error.message}
                </p>
            )}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <button
                onClick={handleChangeEmail}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white mt-2 py-2 rounded"
            >
                {loading ? 'Actualitzant...' : 'Actualitza correu electrònic'}
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

export default ChangeEmailForm;

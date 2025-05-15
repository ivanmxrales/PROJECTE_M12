// hooks/useAccountSecurity.js
import { useState } from 'react';
import api from '../lib/axios';
import getAuthUser from '../utility/getAuthUserToken';
import getAuthUserToken from '../utility/getAuthUserToken';

const useAccountSecurity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const updateEmail = async (userId, currentPassword, newEmail) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const token = getAuthUser();
      await api.post(`/api/user/${userId}`, { currentPassword, newEmail }, {
        ...getAuthUser(),
        headers: {
          ...getAuthUser().headers,
          Authorization: `Bearer ${token.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Correu electrònic actualitzat correctament!');
    } catch (err) {
      setError({ message: err.response?.data?.message || 'Error en canviar el correu electrònic.' });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const token = getAuthUser();
      await api.put('/api/user/change-password', { currentPassword, newPassword }, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      setMessage('Contrasenya actualitzada correctament!');
    } catch (err) {
      setError({ message: err.response?.data?.message || 'Error en canviar la contrasenya.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    message,
    updateEmail,
    updatePassword,
  };
};

export default useAccountSecurity;

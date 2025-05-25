import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import getAuthUser from '../utility/getAuthUserToken';
import { useAuth } from '../context/AuthContext';
import useLogout from './useLogout';

const editProfilePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useLogout();

  const edit = async (id, inputs) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('OldPassword', inputs.OldPassword),
    formData.append('password', inputs.password);

    try {
      await api.post(`/api/user/password/${id}`, formData, {
        ...getAuthUser(),
        headers: {
          ...getAuthUser().headers,
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await api.get(`/api/user/${id}`, getAuthUser());

      const oldUser = JSON.parse(localStorage.getItem("user-info") || "{}");
      
      localStorage.removeItem("user-info");

      navigate('/auth');

      /* const updatedUser = {
        ...oldUser,
        ...response.data,
        token: oldUser.token, 
      };


      login(updatedUser);
      console.log('Usuari actualitzat:', updatedUser);
      navigate(`/${updatedUser.username}`); */
    } catch (err) {
      //console.log("Error backend:", err.response?.data);
      const errMsg = err.response?.data?.message || "Error al desar l'usuari";
      setError({ message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, edit };
};

export default editProfilePassword;

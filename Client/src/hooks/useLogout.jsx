/* import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const logout = async () => {
		setLoading(true);
		setError(null);

		try {
			const userInfo = JSON.parse(localStorage.getItem('user-info'));
			const token = userInfo?.token;

			await axios.delete('http://127.0.0.1:8000/api/logout', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			localStorage.removeItem('user-info');
			navigate("/");
		} catch (err) {
			const errMsg = err.response?.data?.message || "Error al tancar sessió";
			setError({ message: errMsg });
		} finally {
			setLoading(false);
		}
	};

	return { logout, loading, error };
};

export default useLogout;
 */





import api from "../lib/axios";

const useLogout = () => {
  const logout = async () => {
    await api.delete("/api/logout", {
		withCredentials: true,
	});
	localStorage.removeItem("user-info");
	window.location.href = "/auth";
  };

  return logout;
};

export default useLogout;

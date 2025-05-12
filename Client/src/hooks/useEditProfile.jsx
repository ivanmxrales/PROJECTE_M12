import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import getAuthUser from '../utility/getAuthUserToken';

const editProfile = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const edit = async (id, inputs) => {
		setLoading(true);
		setError(null);
	
		const formData = new FormData();
		formData.append('email', inputs.email);
		formData.append('biography', inputs.biography);
		formData.append('name', inputs.name);
		formData.append('birth_date', inputs.birth_date);
		formData.append('username', inputs.username);
		formData.append('role', 'user');
		formData.append('surname', 'PROVA');
		formData.append('profile_picture', inputs.profile_picture);
	
		try {
			await api.post(
				`/api/user/${id}`,
				formData,
				{
					...getAuthUser(),
					headers: {
						...getAuthUser().headers,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			
			const response = await api.get(`/api/user/${id}`, getAuthUser());
			const user = response.data;
			localStorage.setItem('user-info', JSON.stringify(user));
			console.log("User data:", user);
			navigate('/');
		} catch (err) {
			const errMsg = err.response?.data?.message || "Error al desar l'usuari";
			setError({ message: errMsg });
		} finally {
			setLoading(false);
		}
	};
	

	return { loading, error, edit };
};

export default editProfile;

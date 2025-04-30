import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
			await axios.post(`http://127.0.0.1:8000/api/user/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`);
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

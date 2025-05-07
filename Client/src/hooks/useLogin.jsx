import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const login = async (inputs) => {
		if (!inputs.email || !inputs.password) {
			setError({ message: "El correu o la contrasenya són incorrecte" });
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await axios.post('http://127.0.0.1:8000/api/login', {
				email: inputs.email,
				password: inputs.password
			});

			const userData = response.data;
			localStorage.setItem('user-info', JSON.stringify(userData));
			console.log("User data:", userData);
			//console.log("LOGIN ATTEMPT:", inputs.email, inputs.password);
			navigate("/"); 
		} catch (err) {
			const errMsg = err.response?.data?.message || "Error al iniciar sessió";
			setError({ message: errMsg });
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, login };
};

export default useLogin;

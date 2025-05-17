import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import useLogin from './useLogin';

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const {login} = useLogin();

	const signup = async (inputs) => {

		setLoading(true);
		setError(null);

		const data = {
			email: inputs.email,
			password: inputs.password,
			name: inputs.name,
			birth_date: inputs.birth_date,
			username: inputs.username,
			role: 'user',
			surname: 'PROVA',
		};

		try {
			await api.post('/api/signup', data);
			await login({ email: inputs.email, password: inputs.password });

			const userData = response.data;
			useLogin(userData);
		} catch (err) {
			const errMsg = err.response?.data?.message || "Signup failed";
			setError({ message: errMsg });
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, signup };
};

export default useSignup;

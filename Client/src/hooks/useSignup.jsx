import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const[errorName, setErrorName] = useState(null);
	const[errorUsername, setErrorUsername] = useState(null);
	const[errorBirthDate, setErrorBirthDate] = useState(null);
	const[errorEmail, setErrorEmail] = useState(null);
	const[errorPassword, setErrorPassword] = useState(null);
	const[errorConfirmPassword, setErrorConfirmPassword] = useState(null);
	const navigate = useNavigate();

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
			const response = await axios.post('http://127.0.0.1:8000/api/signup', data);

			const userData = response.data;
			localStorage.setItem('user-info', JSON.stringify(userData));
			navigate(`/profile/${userData.id}`); // Assuming userData has `id`
		} catch (err) {
			const errMsg = err.response?.data?.message || "Login failed";
			setError({ message: errMsg });
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, signup };
};

export default useSignup;

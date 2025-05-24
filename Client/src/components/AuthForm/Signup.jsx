import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import useEnterSubmit from "../../hooks/useEnterSubmit";

const Signup = () => {
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		birth_date: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { loading, signup } = useSignup();

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		const newErrors = {};

		if (!inputs.name || inputs.name.length < 3)
			newErrors.name = "El nom ha de tenir almenys 3 caràcters";

		if (!inputs.username || inputs.username.length < 3)
			newErrors.username = "El nom d'usuari ha de tenir almenys 3 caràcters";

		if (!inputs.birth_date) {
			newErrors.birth_date = "La data de naixement és necessària";
		}
		else {
			const inputDate = new Date(inputs.birth_date);

			const today = new Date();
			let age = today.getFullYear() - inputDate.getFullYear();
			const monthDiff = today.getMonth() - inputDate.getMonth();
			const dayDiff = today.getDate() - inputDate.getDate();

			if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
				age--;
			}

			if (age < 16) {
				newErrors.birth_date = "Has de tenir 16 anys com a mínim per registrar-te";
			}
		}

		if (!inputs.email)
			newErrors.email = "El correu electrònic és necessari";

		if (!inputs.password || inputs.password.length < 8)
			newErrors.password = "La contrasenya ha de tenir almenys 8 caràcters";

		if (!inputs.confirmPassword || inputs.confirmPassword.length < 8)
			newErrors.confirmPassword = "Les contrasenyes no coincideixen";

		if (inputs.password !== inputs.confirmPassword)
			newErrors.confirmPassword = "Les contrasenyes no coincideixen";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
		try {
			await signup(inputs);
		} /* catch (err) {
			if (err.response?.status === 422) {
				setErrors({
					email: "Aquest correu electrònic ja està en ús",
					username: "Aquest nom d'usuari ja està en ús",
				});
			} else {
				//console.error("Signup error:", err);
			} */
		catch (err) {
			if (err.response?.status === 422 && err.response.data?.errors) {
				const serverErrors = err.response.data.errors;
				const formattedErrors = {};

				if (serverErrors.email) {
					formattedErrors.email = "Aquest correu electrònic ja està en ús";
				}
				if (serverErrors.username) {
					formattedErrors.username = "Aquest nom d'usuari ja està en ús";
				}

				setErrors(formattedErrors);
			} else {
				console.error("Signup error:", err);
			}
		}
	};

	useEnterSubmit("signupSubmit");

	return (
		<>
			<input
				type="text"
				name="name"
				placeholder="Nom"
				className="input"
				value={inputs.name}
				onChange={handleChange}
			/>
			{errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

			<input
				type="text"
				name="username"
				placeholder="Nom d'usuari"
				className="input"
				value={inputs.username}
				onChange={handleChange}
			/>
			{errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

			<input
				type="date"
				name="birth_date"
				placeholder="Data de naixement"
				className="input"
				value={inputs.birth_date}
				onChange={handleChange}
			/>
			{errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}

			<input
				type="email"
				name="email"
				placeholder="Correu electrònic"
				className="input"
				value={inputs.email}
				onChange={handleChange}
			/>
			{errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

			<input
				type="password"
				name="password"
				placeholder="Contrasenya"
				className="input"
				value={inputs.password}
				onChange={handleChange}
			/>
			{errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

			<input
				type="password"
				name="confirmPassword"
				placeholder="Repetir contrasenya"
				className="input"
				value={inputs.confirmPassword}
				onChange={handleChange}
			/>
			{errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}

			<button
				onClick={handleSubmit}
				id="signupSubmit"
				disabled={loading}
				className={`w-full text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
					}`}
			>
				{loading ? "Enviant..." : "Registrar-se"}
			</button>
		</>
	);
};

export default Signup;

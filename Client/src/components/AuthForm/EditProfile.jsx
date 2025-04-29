import { useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";

const EditProfile = ({ user }) => {
	const [inputs, setInputs] = useState({
		name: user?.name || "",
		username: user?.username || "",
		birth_date: user?.birth_date || "",
		email: user?.email || "",
		password: "",
		confirmPassword: "",
	});

	const { loading, editProfile } = useEditProfile();

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		const newErrors = {};

		if (!inputs.name || inputs.name.length <= 3)
			newErrors.name = "El nom ha de tenir almenys 3 caràcters";

		if (!inputs.username || inputs.username.length <= 3)
			newErrors.username = "El nom d'usuari ha de tenir almenys 3 caràcters";

		if (!inputs.birth_date){
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
		editProfile(inputs);
	};

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

			<button
				onClick={handleSubmit}
				disabled={loading}
				className={`w-full text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ${
					loading ? "opacity-50 cursor-not-allowed" : ""
				}`}
			>
				{loading ? "Enviant..." : "Registrar-se"}
			</button>
		</>
	);
};

export default EditProfile;

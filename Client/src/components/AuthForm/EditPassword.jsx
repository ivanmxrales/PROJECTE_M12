import { useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";

const EditPassword = ({ user, onCancel }) => {
	const [inputs, setInputs] = useState({
		password: "",
		password2:  ""
	});

	const { loading, edit, error } = useEditProfile();
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		if (e.target.name === 'profile_picture') {
			setInputs({ ...inputs, profile_picture: e.target.files[0] });
		} else {
			setInputs({ ...inputs, [e.target.name]: e.target.value });
		}
	};
	

	const validate = () => {
		const newErrors = {};
		if (!inputs.name || inputs.name.length <= 3)
			newErrors.name = "El nom ha de tenir almenys 3 caràcters";

		if (!inputs.username || inputs.username.length <= 3)
			newErrors.username = "El nom d'usuari ha de tenir almenys 3 caràcters";

		if (!inputs.birth_date) {
			newErrors.birth_date = "La data de naixement és necessària";
		} else {
			const dob = new Date(inputs.birth_date);
			const age = new Date().getFullYear() - dob.getFullYear();
			if (age < 16) newErrors.birth_date = "Has de tenir 16 anys com a mínim";
		}

		if (!inputs.email) newErrors.email = "El correu electrònic és necessari";

		if (inputs.password && inputs.password.length < 8)
			newErrors.password = "La contrasenya ha de tenir almenys 8 caràcters";

		if (inputs.password !== inputs.confirmPassword)
			newErrors.confirmPassword = "Les contrasenyes no coincideixen";

		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		setErrors({});
		edit(user.id, inputs);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
				type="email"
				name="email2"
				placeholder="Correu electrònic"
				className="input"
				value={inputs.email2}
				onChange={handleChange}
			/>
			{errors.email2 && <div className="text-red-500 text-sm">{errors.email2}</div>}
			<input
				type="password"
				name="password"
				placeholder="Contrasenya actual"
				className="input"
				value={inputs.password}
				onChange={handleChange}
			/>
			{errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

			<div className="flex justify-end gap-2">
				<button type="button" onClick={onCancel}>Cancel·la</button>
				<button type="submit" disabled={loading}>
					{loading ? "Desant..." : "Desa"}
				</button>
			</div>
			{error && <div className="text-red-500 text-sm">{error.message}</div>}
		</form>
	);
};

export default EditPassword;


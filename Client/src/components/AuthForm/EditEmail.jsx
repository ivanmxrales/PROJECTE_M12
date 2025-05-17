import { useState } from "react";
import useEditEmail from "../../hooks/useEditEmail";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditEmail = ({ user, onClose }) => {
	const [inputs, setInputs] = useState({
		password: "",
		email: user?.email || "",
		email2: "",
	});

	const { loading, edit, error } = useEditEmail();
	const [errors, setErrors] = useState({});

	useEffect(() => {
		setInputs((prev) => ({
			...prev,
			email: user?.email || "",
		}));
	}, [user?.email]);

	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	
	const navigate = useNavigate();

	const validate = () => {
		const newErrors = {};
		if (!inputs.email) newErrors.email = "El correu electrònic és necessari";
		if (!inputs.email2) newErrors.email2 = "El correu electrònic és necessari";
		if (inputs.email !== inputs.email2) newErrors.email2 = "Els correus electrònics no coincideixen";
		if (!inputs.password) newErrors.password = "La contrasenya és necessària";

		if (inputs.password && inputs.password.length < 8)
			newErrors.password = "La contrasenya ha de tenir almenys 8 caràcters";

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
		edit(user.id, {
			...user,
			email: inputs.email,
			password: inputs.password,
		});
		navigate(`/${user.username}`);
		  
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">

			<label name="password" className="text-white text-sm">Contrasenya actual</label>
			<input
				type="password"
				name="password"
				placeholder="Contrasenya actual"
				className="bg-white/10 border border-white/20 text-white p-2 rounded"
				value={inputs.password}
				onChange={handleChange}
			/>
			{errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

			<label name="email" className="text-white text-sm">Nou email</label>
			<input
				type="email"
				name="email"
				placeholder="Correu electrònic"
				className="bg-white/10 border border-white/20 text-white p-2 rounded"
				value={inputs.email}
				onChange={handleChange}
			/>
			{errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

			<label name="email2" className="text-white text-sm">Confirma el nou email</label>
			<input
				type="email"
				name="email2"
				placeholder="Correu electrònic"
				className="bg-white/10 border border-white/20 text-white p-2 rounded"
				value={inputs.email2}
				onChange={handleChange}
			/>
			{errors.email2 && <div className="text-red-500 text-sm">{errors.email2}</div>}

			<div className="flex justify-end gap-2">
				<button type="button" onClick={onClose}>Cancel·la</button>
				<button type="submit" onClick={handleSubmit} disabled={loading}>
					{loading ? "Desant..." : "Desa"}
				</button>
			</div>
			{error && <div className="text-red-500 text-sm">{error.message}</div>}
		</form>
	);
};

export default EditEmail;


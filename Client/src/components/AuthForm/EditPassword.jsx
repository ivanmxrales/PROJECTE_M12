import { useState } from "react";
import useEditEmail from "../../hooks/useEditEmail";
import useEditPassword from "../../hooks/useEditPassword";
import { useNavigate } from "react-router-dom";

const EditPassword = ({ user, onClose }) => {
	const [inputs, setInputs] = useState({
		OldPassword: "",
		password: "",
		password2: "",
	});

	const { loading, edit, error } = useEditPassword();
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const navigate = useNavigate();

	const validate = () => {
		const newErrors = {};
		if (!inputs.OldPassword) newErrors.OldPassword = "La contrasenya actual és necessària";

		if (inputs.password && inputs.password.length < 8)
			newErrors.password = "La contrasenya ha de tenir almenys 8 caràcters";

		if (!inputs.password2 || (inputs.password !== inputs.password2)) newErrors.password2 = "Les contrasenyes no coincideixen";
		if (!inputs.password) newErrors.password = "La contrasenya és necessària";

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
			OldPassword: inputs.OldPassword,
			password: inputs.password,
		});
		navigate(`/${user.username}`);

	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">

			<label htmlFor="OldPassword" className="text-white text-sm">Contrasenya actual</label>
			<input
				type="password"
				name="OldPassword"
				placeholder="Contrasenya actual"
				className="bg-white/10 border border-white/20 text-white p-2 rounded"
				value={inputs.OldPassword}
				onChange={handleChange}
			/>
			{errors.OldPassword && <div className="text-red-500 text-sm">{errors.OldPassword}</div>}

			<label htmlFor="password" className="text-white text-sm">Nova contrasenya</label>
			<input
				type="password"
				name="password"
				placeholder="Nova contrasenya"
				className="bg-white/10 border border-white/20 text-white p-2 rounded"
				value={inputs.password}
				onChange={handleChange}
			/>
			{errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

			<label htmlFor="password2" className="text-white text-sm">Confirma la contrasenya</label>
			<input
				type="password"
				name="password2"
				placeholder="Confirma la contrasenya"
				className="bg-white/10 border border-white/20 text-white p-2 rounded"
				value={inputs.password2}
				onChange={handleChange}
			/>
			{errors.password2 && <div className="text-red-500 text-sm">{errors.password2}</div>}

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

export default EditPassword;


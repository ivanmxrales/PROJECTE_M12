import { useEffect, useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";

const EditProfileForm = ({ user, onCancel, onSave }) => {
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		biography: "",
		birth_date: "",
		email: "",
		profile_picture: ""
	});

	const { loading, edit, error } = useEditProfile();
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (user) {
			console.log("Usuario que llega al form: ", user);
			setInputs({
				name: user.name || "",
				username: user.username || "",
				biography: user.biography || "",
				birth_date: user.birth_date || "",
				email: user.email || "",
				profile_picture: user.profile_picture || ""
			});
		}
	}, [user]);

	const handleChange = (e) => {
		if (e.target.name === 'profile_picture') {
			setInputs({ ...inputs, profile_picture: e.target.files[0] });
		} else {
			setInputs({ ...inputs, [e.target.name]: e.target.value });
		}
	};
	

	const validate = () => {
		const newErrors = {};
	
		// Nom: almenys 3 caràcters i només lletres (accents permesos)
		if (!inputs.name || inputs.name.length < 3) {
			newErrors.name = "El nom ha de tenir 3 caràcters com a mínim";
		} else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(inputs.name)) {
			newErrors.name = "El nom només pot contenir lletres";
		}
	
		// Username: almenys 3 caràcters i només lletres, números i guió baix
		if (!inputs.username || inputs.username.length < 3) {
			newErrors.username = "El nom d'usuari ha de tenir 3 caràcters com a mínim";
		} else if (!/^[A-Za-z0-9_]+$/.test(inputs.username)) {
			newErrors.username = "El nom d'usuari només pot contenir lletres, números i '_' ";
		}
	
		// Validació imatge
		if (inputs.profile_picture && inputs.profile_picture.name) {
			const allowedExtensions = ['jpg', 'jpeg', 'png'];
			const fileExtension = inputs.profile_picture.name.split('.').pop().toLowerCase();
			if (!allowedExtensions.includes(fileExtension)) {
				newErrors.profile_picture = "Format d'imatge no vàlid (només jpg, jpeg, png)";
			}
		}

		if (inputs.biography.length > 50) {
			newErrors.biography = "No pot tenir més de 50 caràcters"
		}
	
		// Validació data de naixement
		if (!inputs.birth_date) {
			newErrors.birth_date = "La data de naixement és necessària";
		} else {
			const dob = new Date(inputs.birth_date);
			const age = new Date().getFullYear() - dob.getFullYear();
			if (age < 16) newErrors.birth_date = "Has de tenir 16 anys com a mínim";
		}
	
		return newErrors;
	};
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		setErrors({});
		const success = await edit(user.id, inputs);
		if (success) {
			window.location.reload();
			onSave(success);
			onCancel();
		}
	};
	

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<input 
				type="file" 
				name="profile_picture"
				placeholder="Imatge"
				className={inputs.profile_picture}
				onChange={handleChange}
			/>
			{errors.profile_picture && <div className="text-red-500 text-sm">{errors.profile_picture}</div>}

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
				type="text"
				name="biography"
				placeholder="Biografía"
				className="input"
				value={inputs.biography}
				onChange={handleChange}
			/>
			{errors.biography && <div className="text-red-500 text-sm">{errors.biography}</div>}

			<input
				type="date"
				name="birth_date"
				placeholder="Data de naixement"
				className="input"
				value={inputs.birth_date}
				onChange={handleChange}
			/>
			{errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}
			
			<div className="flex justify-end gap-2">
				<button type="button" onClick={onCancel}>Cancel·la</button>
				<button type="submit" disabled={loading} className= "button bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
				>
					{loading ? "Desant..." : "Desa"}
				</button>
			</div>
			{error && <div className="text-red-500 text-sm">{error.message}</div>}
		</form>
	);
};

export default EditProfileForm;


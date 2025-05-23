import EditProfileForm from "../../components/AuthForm/EditProfileForm";

const EditProfile = ({ user, onClose, onSave }) => {
	const handleSave = (updatedUser) => {
		console.log("Usuari actualitzat correctament:", updatedUser);
		if (onSave) onSave(updatedUser);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white/50 z-[9999]">
			<div className="bg-black p-6 rounded-lg w-[600px]">
				<h2 className="text-lg font-bold mb-4 tcolor">Editar Perfil</h2>
				<EditProfileForm user={user} onCancel={onClose} onSave={handleSave} />
			</div>
		</div>
	);
};

export default EditProfile;

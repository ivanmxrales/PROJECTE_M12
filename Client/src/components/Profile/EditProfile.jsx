import EditProfileForm from "../../components/AuthForm/EditProfileForm";

const EditProfile = ({ user, onClose }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white/50 z-[9999]">
			<div className="bg-black p-6 rounded-lg w-[600px]">
				<h2 className="text-lg font-bold mb-4 tcolor">Editar Perfil</h2>
				<EditProfileForm user={user} onCancel={onClose} />
			</div>
		</div>
	);
};

export default EditProfile;

import EditPostForm from "./EditPostForm";

const MenuPost = ({ post, onClose }) => {
	//console.log(post);
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white/50 z-[9999]">
			<div className="bg-black p-6 rounded-lg w-[600px]">
				<h2 className="text-lg font-bold mb-4 tcolor">Editar Post</h2>
				<EditPostForm post={post} onCancel={onClose} />
			</div>
		</div>
	);
};

export default MenuPost;
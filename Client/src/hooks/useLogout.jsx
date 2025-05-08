import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await api.get("/sanctum/csrf-cookie");
			await api.delete("/api/logout", {
				withCredentials: true,
			});
			navigate('/auth');
		} catch (error) {
			console.error("Logout error:", error);
		} 
	};

	return {logout};
};

export default useLogout;


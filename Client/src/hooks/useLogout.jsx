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
		} catch (error) {
			if (error.response?.status === 401) {
				console.warn("Token already invalidated during logout.");
			} else {
				console.error("Logout error:", error);
			}
		} finally {
			localStorage.removeItem("user-info");
			navigate('/auth');
		}
	};

	return { logout };
};

export default useLogout;

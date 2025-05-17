import api from "../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { login: setAuthUser } = useAuth();

	const login = async (inputs) => {
		setLoading(true);
		setError(null);
		try {
			await api.get("/sanctum/csrf-cookie");
			const res = await api.post("/api/login", {
				email: inputs.email,
				password: inputs.password
			});
			const userData = res.data;
			console.log("Usuari:", userData);
			console.log("Token: ", localStorage.getItem("token"));
			setAuthUser(userData);
			navigate("/");
			return res.data;
		} catch (err) {
			//setError(err.response?.data?.message || "Login failed");
			setError({ message: "Credencials incorrectes!" });
		} finally {
			setLoading(false);
		}
	};

	return { login, loading, error };
};

export default useLogin;

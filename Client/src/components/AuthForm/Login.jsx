import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();

	return (
		<>
			{/* Email Input */}
			<input
				type="email"
				placeholder="Correu electrònic"
				className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>

			{/* Password Input */}
			<input
				type="password"
				placeholder="Contrasenya"
				className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>

			{/* Error Alert */}
			{error && (
				<div className="w-full flex items-start gap-2 bg-red-100 border border-red-400 text-red-700 text-sm px-3 py-2 rounded-md">
					<span className="text-xs mt-0.5">⚠️</span>
					<span>{error.message}</span>
				</div>
			)}

			{/* Submit Button */}
			<button
				onClick={() => login(inputs)}
				disabled={loading}
				className={`w-full text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ${
					loading ? "opacity-50 cursor-not-allowed" : ""
				}`}
			>
				{loading ? "Iniciant sessió..." : "Iniciar sessió"}
			</button>
		</>
	);
};

export default Login;

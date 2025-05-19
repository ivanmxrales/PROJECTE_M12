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
			<input
				type="email"
				placeholder="Correu electrònic"
				className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<input
				type="password"
				placeholder="Contrasenya"
				className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
			{error && <div className="text-red-500 text-sm mt-1">{error.message}</div>}

			<button
				onClick={() => login(inputs)}
				disabled={loading}
				className={`w-full text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 
					${loading ? "opacity-50 cursor-not-allowed" : ""}`}
			>
				{loading ? "Iniciant sessió..." : "Iniciar sessió"}
			</button>

			<div className="flex items-center justify-center mt-4">
				<p className="text-sm text-gray-500">
					Has oblidat la contrasenya?{" "}
					<a href="/reset-password" className="text-blue-500 hover:underline">
						Restablir contrasenya
					</a>
				</p>
			</div>
		</>
	);
};

export default Login;

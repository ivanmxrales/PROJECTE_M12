import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [generalError, setGeneralError] = useState('');

    let hasError = false;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if ((!email) || !password) {
            setGeneralError("El correu o la contrasenya són incorrectes.");
            return;
        }
    
        console.log('Submitting:', { email, password });
    
        try {
            
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            console.log('Response:', response.data);
            const { id } = response.data; //agafem el id de la resposta de la APU
            console.log("USER ID: ", id);
            navigate(`/profile/${id}`); 
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setGeneralError("El correu o la contrasenya són incorrectes.");
        }
    };

    const handleError = () =>setGeneralError('');
    

    return (
        <div className='login-container'>
            <div className='login-card'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {generalError && <div className="error-message">{generalError}</div>}
                    <input 
                        type="email" 
                        placeholder="Correu electrònic" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={handleError}
                    />
                    <input 
                        type="password" 
                        placeholder="Contrasenya" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={handleError}
                    />
                    <div className='login-options'>
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        <br />
                        <a href="#">Has oblidat la contrasenya?</a>
                        <br /><br />
                    </div>
                    <button type="submit">Iniciar sessió</button>
                </form>
                <br />
                <Link to="/sign-up">Registrar-se</Link>
            </div>

        </div>
    );
};

export default Login;

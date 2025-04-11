import React, { useState } from 'react';
import '../../styles/login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert("Please enter email and password");
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
            alert("Login failed. Check console.");
        }
    };
    

    return (
        <div className='login-container'>
            <div className='login-card'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Username" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='login-options'>
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <Link to="/register">Register</Link>
            </div>

            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default Login;

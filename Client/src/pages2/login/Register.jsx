import React, { useState } from 'react';
import '../../styles/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birth_date, setBirthDate] = useState('');

    const [generalError, setGeneralError] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [dateError, setDateError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    

    

    const navigate = useNavigate();

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');
        setNameError('');
        setUsernameError('');
        setDateError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
    
        let hasError = false;
    
        const nameRegex = /^[a-zA-Z0-9]+$/;
        if (!nameRegex.test(name)) {
            setNameError("Nom no vàlid.");
            hasError = true;
        }
    
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            setUsernameError("Nom d'usuari no vàlid.");
            hasError = true;
        }
    
        if (!name || !username || !birth_date || !email || !password || !confirmPassword) {
            setGeneralError("Tots els camps són obligatoris.");
            hasError = true;
        }
        
        //birth_date = new Date();
        if(!birth_date) {
            setDateError("La data de naixement és obligatòria.");
            hasError = true;
        } else {
        const inputDate = new Date(birth_date);
        
        const today = new Date();
        let age = today.getFullYear() - inputDate.getFullYear();
        const monthDiff = today.getMonth() - inputDate.getMonth();
        const dayDiff = today.getDate() - inputDate.getDate();
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
    
        if (age < 16) {
            setDateError("Has de tenir 16 anys o més per registrar-te");
            hasError = true;
        }
    }
    
        if (password.length < 8 || password.length > 30) {
            setPasswordError("La contrasenya ha de tenir 8 caràcters com a mínim.");
            hasError = true;
        }
    
        if ((password !== confirmPassword) || confirmPassword) {
            setConfirmPasswordError("La contrasenya no coincideix.");
            hasError = true;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Email no vàlid.");
            hasError = true;
        }
    
        if (hasError) return;
    
        const data = {
            email,
            password,
            name,
            username,
            birth_date,
            role: 'user',
            surname: 'PROVA'
        };
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', data);
            const { id } = response.data;
            navigate(`/profile/${id}`);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setGeneralError("Registration failed. Check console.");
        }
    };
    
    

    return (
        <div className='register-container'>
            <div className='register-card'>
                <h2>Register</h2>
                {generalError && <div className="error-message">{generalError}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <div className="error-message">{nameError}</div>}
                    <input
                        type="text"
                        placeholder="Nom d'usuari"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <div className="error-message">{usernameError}</div>}
                    <input
                        type="date"
                        placeholder="Data de naixement"
                        value= {birth_date}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    {dateError && <div className="error-message">{dateError}</div>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                    <input
                        type="password"
                        placeholder="Contrasenya"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    <input
                        type="password"
                        placeholder="Confirmar contrasenya"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                    <button type="submit">Register</button>
                </form>
         </div>
        </div >
    );
};

export default register;

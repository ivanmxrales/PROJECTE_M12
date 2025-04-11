import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const [generalError, setGeneralError] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [dateError, setDateError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');     
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [profilePictureError, setProfilePictureError] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`);
                const user = response.data;
                setEmail(user.email);
                setName(user.name);
                setUsername(user.username);
                setBirthDate(user.birth_date);
                setProfilePicture(user.profile_picture); 
            } catch (error) {
                console.error("Error fetching user data:", error);
                setGeneralError("No s'ha pogut carregar la informació de l'usuari.");
            }
        };
    
        fetchUserData();
    }, [id]);

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
    
        // Validation checks...
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
    
        if (!name || !username || !birth_date || !email) {
            setGeneralError("Tots els camps són obligatoris.");
            hasError = true;
        }
    
        if (!birth_date) {
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
    
        if ((password !== confirmPassword) || confirmPassword === '') {
            setConfirmPasswordError("La contrasenya no coincideix.");
            hasError = true;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Email no vàlid.");
            hasError = true;
        }
    
        if (!profilePicture) {
            setProfilePictureError("Foto de perfil és obligatòria.");
            hasError = true;
        }
    
        if (hasError) return;
    
        const data = {
            email,
            password,
            name,
            username,
            birth_date,
            profile_picture: profilePicture, 
            role: 'user',
            surname: 'PROVA',
        };
    
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => formData.append(key, data[key]));
            
            const response = await axios.post(`http://127.0.0.1:8000/api/user/${id}`, formData);
            const { id: updatedId } = response.data;
            navigate(`/profile/${updatedId}`);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setGeneralError("No s'ha pogut actualitzar el perfil. Comprova la consola.");
        }
    };
    

    return (
        <div className='register-container'>
            <div className='register-card'>
                <h2>Editar perfil</h2>
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
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                    <input
                        type="file"
                        onChange={(e) => setProfilePicture(e.target.files[0])} // Handle file as an object
                    />
                    {profilePictureError && <div className="error-message">{profilePictureError}</div>}
                    <input
                        type="date"
                        placeholder="Data de naixement"
                        value={birth_date}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    {dateError && <div className="error-message">{dateError}</div>}
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;

import "../../styles/users.css";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`);
                setUser(response.data);
                console.log("User data:", response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div>Carregant dades...</div>;
    if (error) return <div>Error carregant dades: {error.message}</div>;

    return (
        <div>
            <h2>Perfil d'usuari</h2>
            {user && (
                <div className="user-card">
                    <Link to={''}>Hola</Link>
                    <h3>{user.name}</h3>
                    <img
                        src={user.profile_picture}
                        alt={user.username + " picture"}
                        className="user-image"
                    />
                    <div className="user-details">
                        <p className="user-description"><strong>Cognom: </strong>{user.surname}</p>
                        <p className="user-description"><strong>Correu: </strong>{user.email}</p>
                        <p className="user-description"><strong>Nom d'usuari: </strong>{user.username}</p>
                        <p className="user-description"><strong>Biografia: </strong>{user.biography}</p>
                        <p className="user-description"><strong>Data de naixement: </strong>{user.birth_date}</p>
                        <p className="user-description"><strong>Tipus d'usuari: </strong>{user.role}</p>
                        <div className="buttons">
                            <Link to={`/edit/${user.id}`}>
                                <Button className="btn btn-primary">Editar</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;

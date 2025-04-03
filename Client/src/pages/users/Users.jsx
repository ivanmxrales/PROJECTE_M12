import "../../styles/users.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import FetchUsers from "../../components/users/FetchUsers";

function Users() {
  const { users, loading, error, handleDelete } = FetchUsers();
  const [expandeduserId, setExpandeduserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (loading) return <div>Carregant dades...</div>;
  if (error) return <div>Error carregant dades: {error.message}</div>;

  return (
    <div>
      <h2>Llistat d'Usuaris</h2>
      {/* <Link to="/add-user">
        <Button className="btn btn-primary">Afegir user</Button>
      </Link> */}
      <div className="users-list">
        {users.map((user) => (
          <div
            key={user._id}
            className="user-card"
            onClick={() =>
              setExpandeduserId(expandeduserId === user._id ? null : user._id)
            }
          >
            <h3>{user.name}</h3>
            <img
              src={user.profile_picture}
              alt={user.profile_picture}
              className="user-image"
            />
            {expandeduserId === user._id && (
              <div className="user-details">
                <p className="user-description"><strong>Cognom: </strong>{user.surname}</p>
                <p>
                  <strong>Efecte de cuina:</strong> {user.cooking_effect}
                </p>
                <div className="buttons">
                  <Link to={`/edit-user/${user.id_num}`}>
                    <Button className="btn btn-primary">Editar</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user.id_num);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

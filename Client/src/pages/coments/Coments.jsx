import "../../styles/posts.css";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import FetchComents from "../../components/coments/FetchComents"; // Puede seguir llamándose así internamente
import FetchUsers from "../../components/users/FetchUsers";
import EditComentForm from "../../components/coments/EditComentForm";

function Coments({ postId }) {
  const { coments, loading, error, handleDelete } = FetchComents();
  const { users } = FetchUsers();

  const [editingComent, setEditingComent] = useState(null);

  const filteredComents = coments.filter(
    (coment) => coment.post_id?.toString() === postId?.toString()
  );
  
  
  return (
    <div className="coments-list">
      <h4>Comentarios</h4>
      {filteredComents.length === 0 ? (
        <p>No hay comentarios para esta publicación.</p>
      ) : (
        filteredComents.map((coment) => {
          const isEditing = editingComent && editingComent._id === coment._id;
          const author = users.find((user) => user.id === coment.user_id);
  
          return (
            <div key={coment._id} className="coment-card">
              <div className="coment-details">
                {isEditing ? (
                  <EditComentForm
                    coment={editingComent}
                    onCancel={() => setEditingComent(null)}
                  />
                ) : (
                  <>
                    <p><strong>Autor:</strong> {author ? author.name : "Desconocido"}</p>
                    <p className="coment-data_hora"><em>{coment.dataCom}</em></p>
                    <p className="coment-text"><strong>Comentario: </strong>{coment.coment}</p>
  
                    {/* <div className="buttons">
                      <Button className="btn btn-primary" onClick={() => setEditingComent(coment)}>
                        Editar
                      </Button>
  
                      <Button variant="danger" onClick={() => handleDelete(coment._id)}>
                        Eliminar
                      </Button>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Coments;


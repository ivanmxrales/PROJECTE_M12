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
    <div className="coments-list top-0 w-full max-w-screen-xl mx-auto border z-50">
      {/* <h4>Comentarios</h4> */}
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
                    <div className="p-4 flex flex-wrap -mx-2 gap-4">
                      <div className="ml-8 w-8 h-8 border rounded-full overflow-hidden mt-2">
                      <img src={author?.profile_picture} alt="profile" className="w-full h-full object-cover" />
                      
                      </div>
                      <div className="text-left">
                    <p><strong> {author ? author.name : "Desconocido"}</strong> {coment.coment}</p>
                    <p className="coment-data_hora"><em>{coment.dataCom}</em></p>
                      </div>
                    </div>
                    {/* <div className="buttons" formInputC>
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


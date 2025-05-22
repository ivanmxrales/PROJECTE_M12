import "../../styles/posts.css";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import FetchComents from "../../components/coments/FetchComents";
import FetchUsers from "../../components/users/FetchUsers";
import EditComentForm from "../../components/coments/EditComentForm";
import CreateComentForm from "../../components/coments/CreateComentForm";

function Coments({ postId }) {
  const { coments, loading, error, handleDelete, setComents } = FetchComents(postId);
  const { users } = FetchUsers();

  const [editingComent, setEditingComent] = useState(null);

  return (
    <div className="flex flex-col h-full text-white">

      <div className="flex-1 overflow-y-auto p-2 space-y-2 h-80">
        {coments.length === 0 ? (
          <p>No hi ha comentaris per aquesta publicació</p>
        ) : (
          coments.map((coment) => {
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
                          <img
                            src={author?.profile_picture}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p>
                            <strong>{author ? author.name : "Desconocido"}</strong>{" "}
                            {coment.coment}
                          </p>
                          <p className="coment-data_hora">
                            <em>{coment.dataCom}</em>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-gray-700 p-2 bg-black">
        <CreateComentForm comentedPost={postId} SetComents={setComents} />
      </div>
    </div>
  );
}


export default Coments;
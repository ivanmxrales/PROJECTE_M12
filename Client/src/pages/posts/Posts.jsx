import "../../styles/posts.css";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import FetchPosts from "../../components/Posts/FetchPosts";
import FetchUsers from "../../components/users/FetchUsers";
import Coments from "../coments/Coments";
import PostImages from "../../components/Posts/PostImages";
import EditPostForm from "../../components/Posts/EditPostForm";

function Posts() {
  const { posts, loading, error, handleDelete } = FetchPosts();
  const { users } = FetchUsers();


  const [editingPost, setEditingPost] = useState(null);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error cargando datos: {error.message}</div>;

  return (
    <div>
      <h2>Listado de Publicaciones</h2>
      {/* <Link to="/add-post">
        <Button className="btn btn-primary">Añadir publicación</Button>
      </Link> */}
      <div className="posts-list">
        {posts.map((post) => {
          const isEditing = editingPost && editingPost._id === post._id;
          const author = users.find((user) => user.id_num === post.user_id);

          return (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>

              <div className="post-details">
                <PostImages post={post} />

                {isEditing ? (
                  <EditPostForm
                    post={editingPost}
                    onCancel={() => setEditingPost(null)}
                  />
                ) : (
                  <>
                    <p><strong>Autor:</strong> {author ? author.name : "Desconocido"}</p>
                    <p className="post-data_hora"><em>{post.data_hora}</em></p>
                    <p className="post-location"><strong>Ubicación: </strong>{post.location}</p>
                    <p className="post-description"><strong>Descripción: </strong>{post.description}</p>

                    <div className="coments">
                      <Coments postId={post.id} />
                    </div>
                    
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;



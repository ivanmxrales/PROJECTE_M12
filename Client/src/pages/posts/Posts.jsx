
import "../../styles/posts.css";
import { Button } from "react-bootstrap";
import { UnlikeLogo, LikeLogo, ShareLogo, CommentLogo } from "../../assets/constants";
import React, { useState } from "react";
import FetchPosts from "../../components/Posts/FetchPosts";
import FetchUsers from "../../components/users/FetchUsers";
import Coments from "../coments/Coments";
import PostImages from "../../components/Posts/PostImages";
import EditPostForm from "../../components/Posts/EditPostForm";
import { useParams } from "react-router-dom";


function Posts({}) {
  const { posts, loading, error, handleDelete } = FetchPosts();
  const { users } = FetchUsers();
  const { id } = useParams();
  const Filtro = id;


  const [editingPost, setEditingPost] = useState(null);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error cargando datos: {error.message}</div>;
  

  let filteredPosts = posts;
   if (Filtro!=null) {
    filteredPosts = posts.filter(
       (post) => post.user_id?.toString() === Filtro?.toString()
     );
   }



  return (
    <div>
      <h2>Listado de Publicaciones</h2>
      {/* <Link to="/add-post">
        <Button className="btn btn-primary">Añadir publicación</Button>
      </Link> */}
      <div className="posts-list">
      <div  className="flex flex-col items-center justify-center gap-10  w-[800px] mt-[20%]">
        {filteredPosts.map((post) => {
          const isEditing = editingPost && editingPost._id === post._id;
          const author = users.find((user) => user.id === post.user_id);

          return (

              
                <div key={post._id} className=" top-0 w-full max-w-screen-xl mx-auto border z-50 ">
                  <div className="flex w-full border-b h-24 ">
                    <div className='flex items-center gap-5 align-center'>
                    <div className="ml-12 w-12 h-12 border rounded-full overflow-hidden">
                      <img src={author?.profile_picture} alt="profile" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className='hidden md:block text-white'>{author ?   author.name + ' '  : "Desconocido"}</span>
                        <span className='hidden md:block text-white'>{post.location}</span>
                      </div>
                      <button className="ml-[500px] scale-150'w-10 h-10 bg-transparent text-center">
                        ···
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center h-screen'>
                    <PostImages post={post} />

                  </div>
                  <div className='flex w-full h-24 border-t gap-5 '>
                    <LikeLogo className="mt-5"></LikeLogo>
                    <UnlikeLogo className="mt-5"></UnlikeLogo>
                    <CommentLogo className="mt-5"></CommentLogo>
                    <ShareLogo className="mt-5"></ShareLogo>
                    {/* <Coments PostId={post.id}></Coments> */}
                  </div>
                  <p className='mt-4 text-lg text-gray-400'>{post.description}</p>
                  <p>{post.data_hora}</p>
                </div>
              
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default Posts;




{/* <div className="coments">
                      <Coments postId={post.id} />
                    </div> */}

                    

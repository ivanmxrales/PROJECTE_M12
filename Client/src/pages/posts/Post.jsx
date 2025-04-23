import "../../styles/posts.css";
import { UnlikeLogo, LikeLogo, ShareLogo, CommentLogo } from "../../assets/constants";
import React from "react";
import FetchPosts from "../../components/posts/FetchPosts";
import FetchUsers from "../../components/users/FetchUsers";
import PostImages from "../../components/posts/PostImages";
import Coments from "../coments/Coments";
import { useParams } from "react-router-dom";

function Post() {
  const { posts, loading, error } = FetchPosts();
  const { users } = FetchUsers();
  const { id } = useParams();

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error cargando datos: {error.message}</div>;

  const selectedPost = posts.find((post) => post.id?.toString()  === id?.toString() );
  if (!selectedPost) return <div>Publicación no encontrada.</div>;

  const author = users.find((user) => user.id === selectedPost.user_id);

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-[800px] mt-[10%] mx-auto border p-5">
      <div className="flex w-full border-b h-24">
        <div className="flex items-center gap-5 align-center">
          <div className="ml-10 w-10 h-10 border rounded-full overflow-hidden">
            <img src={author?.image || "/default-avatar.png"} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-white">{author ? `${author.name} ${author.surname}` : "Desconocido"}</span>
            <span className="text-white">{selectedPost.location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <PostImages post={selectedPost} />
      </div>

      <div className="flex w-full h-24 border-t gap-5">
        <LikeLogo className="mt-5" />
        <UnlikeLogo className="mt-5" />
        <CommentLogo className="mt-5" />
        <ShareLogo className="mt-5" />
      </div>

      <p className="mt-4 text-lg text-gray-400">{selectedPost.description}</p>
      <p>{selectedPost.data_hora}</p>
      <div className="coments">
                      <Coments postId={selectedPost.id} />
                    </div>
    </div>
  );
}

export default Post;






                    
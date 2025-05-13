// components/likes/Likes.js
import React from "react";
import FetchLikes from "./FetchLikes";
import { useState, useEffect } from "react";
import LikeButton from "./LikeButton";


const Likes = ({ postId }) => {
  const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed.user); // <-- Only keep the nested user object
          
        }
      }, []);
  const {
    likes,
    loadingLikes,
    errorLikes,
    getLikeCount,
    hasUserLiked,
  } = FetchLikes({ id: postId});
//   console.log("post:", postId);
// console.log("user:", userId);

  
      
      
      // console.log("Likes:", likes);
      // console.log("Usuario dio like:", hasUserLiked(user?.id));
      // console.log("Total de likes:", getLikeCount());
  
  if (loadingLikes) return <span>Cargando likes...</span>;
  if (errorLikes) return <span>Error al cargar likes</span>;
  

  return (
    <div className="text-white">
      <LikeButton postId={postId} userId={user?.id} />
      {/* <img src="../../iconos/like.svg" alt="" /> */}
      <span>{getLikeCount()} Likes</span>
      <br />
      <span>{hasUserLiked(user?.id) ? "Te gusta este post" : "No has dado like"}</span>
    </div>
  );
};

export default Likes;
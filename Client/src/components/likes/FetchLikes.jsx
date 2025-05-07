import { useState, useEffect } from "react";
import axios from "axios";

const FetchLikes = ({ id }) => {
  const [likes, setLikes] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [errorLikes, setErrorLikes] = useState(null);

  const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user-info"))?.token;
        const response = await axios.get(`http://127.0.0.1:8000/api/likes`, getAuthHeader());
        setLikes(response.data);
      } catch (error) {
        setErrorLikes("No se pudieron cargar los likes. Inténtalo de nuevo más tarde.");
      } finally {
        setLoadingLikes(false);
      }
    };


    fetchLikes();
  }, [id]);

  let likesdepost = likes;
  if (id != null) {
    likesdepost = likes.filter(
      (like) => like.post_id?.toString() === id?.toString()
    );
  }


  console.log("post ", id, ":", likesdepost);
  // Función que devuelve el número total de likes
  const getLikeCount = () => {
    return likesdepost.length;
  };

  // Función que verifica si el usuario ha dado like
  const hasUserLiked = (userId) => {

    return likesdepost.some(like => like.user_id === userId);
  };

  const likePost = async (postId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/posts/${postId}/like`, {}, getAuthHeader());
      return response.data;
    } catch (error) {
      throw new Error("Error al dar like al post.");
    }
  };
  
  const unlikePost = async (postId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/like`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw new Error("Error al quitar like del post.");
    }
  };



  return { likes, loadingLikes, errorLikes, getLikeCount, hasUserLiked, likePost, unlikePost };
};

export default FetchLikes;


// useEffect(() => {
//   const fetchLikes = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("user-info"))?.token;
//       const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}/likes`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setLikes(response.data);
//     } catch (error) {
//       setErrorLikes("No se pudieron cargar los likes. Inténtalo de nuevo más tarde.");
//     } finally {
//       setLoadingLikes(false);
//     }
//   };

//   fetchLikes();
// }, [id]);
import { useState, useEffect, useCallback } from "react";
import api from "../../lib/axios";
import getAuthUserToken from "../../utility/getAuthUserToken";

const FetchLikes = ({ id }) => {
  const [likes, setLikes] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [errorLikes, setErrorLikes] = useState(null);

  // 💡 Extraemos esta función para reutilizarla
  const fetchLikes = useCallback(async () => {
    setLoadingLikes(true);
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.get(`/api/likes`, getAuthUserToken());
      setLikes(response.data);
    } catch (error) {
      setErrorLikes("No se pudieron cargar los likes. Inténtalo de nuevo más tarde.");
    } finally {
      setLoadingLikes(false);
    }
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [id, fetchLikes]);

  const likesdepost = id
    ? likes.filter((like) => like.post_id?.toString() === id?.toString())
    : likes;

  const getLikeCount = () => likesdepost.length;

  const hasUserLiked = (userId) => {
    return likesdepost.some((like) => like.user_id === userId);
  };

  const likePost = async (postId) => {
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post(`/api/posts/${postId}/like`, {}, getAuthUserToken());
      await fetchLikes();
      return response.data;
    } catch (error) {
      throw new Error("Error al dar like al post.");
    }
  };

  const unlikePost = async (postId) => {
    try {
      const response = await api.delete(`/api/posts/${postId}/like`, getAuthUserToken());
      await fetchLikes();
      return response.data;
    } catch (error) {
      throw new Error("Error al quitar like del post.");
    }
  };

  return {
    likes,
    loadingLikes,
    errorLikes,
    getLikeCount,
    hasUserLiked,
    likePost,
    unlikePost,
    refreshLikes: fetchLikes,
  };
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
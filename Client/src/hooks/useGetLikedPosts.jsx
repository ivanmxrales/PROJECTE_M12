import { useState, useEffect } from "react";
import axios from "axios";
import api from "../lib/axios";
import getAuthUserToken from "../utility/getAuthUserToken";

const FetchLikedPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      try {
        //console.log("Fetching posts for user:", userId);
        const response = await api.get(`/api/${userId}/likes`, getAuthUserToken());
        setPosts(response.data.likes);
        //console.log("Publicacions carregats a:", response.data.likes);
      } catch (error) {
        //console.error("Error carregant els Publicacions:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (id_num) => {
    const confirmDelete = window.confirm("Estas segur?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/post/${id_num}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id_num !== id_num));
      //console.log("Post esborrat");
    } catch (error) {
      //console.error("Error en esborrar l'Post:", error.response?.data || error.message);
    }
  };

  return { posts, loading, error, handleDelete };
};

export default FetchLikedPosts;
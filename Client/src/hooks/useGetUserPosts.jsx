import { useState, useEffect } from "react";
import axios from "axios";
import api from "../lib/axios";
import getAuthUserToken from "../utility/getAuthUserToken";

const FetchUserPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      try {
        console.log("Fetching posts for user:", userId);
        const response = await api.get(`/api/posts/user/${userId}`, getAuthUserToken());
        setPosts(response.data);
        console.log("Publicacions carregats:", response.data);
      } catch (error) {
        console.error("Error carregant els Publicacions:", error);
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
      await api.get("/sanctum/csrf-cookie");
      await api.delete(`/api/post/${id_num}`, getAuthUserToken());
      setPosts((prevPosts) => prevPosts.filter((post) => post.id_num !== id_num));
      console.log("Post esborrat");
    } catch (error) {
      console.error("Error en esborrar l'Post:", error.response?.data || error.message);
    }
  };

  return { posts, loading, error, handleDelete };
};

export default FetchUserPosts;

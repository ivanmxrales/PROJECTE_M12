import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../lib/axios";
import getAuthUser from "../../utility/getAuthUserToken";

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch();
  }, []);
  
  const fetch = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.get("/api/posts", getAuthUser());
      setPosts(response.data);
      console.log("Publicacions carregats:", response.data);
    } catch (error) {
      console.error("Error carregant els Publicacions:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_num) => {
    const confirmDelete = window.confirm("Estas segur?");
    if (!confirmDelete) return;

    try {
      await api.get("/sanctum/csrf-cookie");
      await api.delete(`/api/post/${id_num}`, getAuthUser());
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id_num !== id_num)
      );
      console.log("Post esborrat");
    } catch (error) {
      console.error("Error en esborrar l'Post:", error.response?.data || error.message);
    }
  };

  return { posts, loading, error, handleDelete };
};

export default FetchPosts;
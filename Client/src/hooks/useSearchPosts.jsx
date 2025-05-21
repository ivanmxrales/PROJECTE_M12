import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../lib/axios";
import getAuthUser from "../../utility/getAuthUserToken";

const useSearchPosts = (filter) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filter) return;

    const fetchPosts = async () => {
      try {
        console.log("Fetching posts for search:", filter);
        const response = await api.get(`/api/posts/search/${filter}`, getAuthUserToken());
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
  }, [filter]);

  const handleDelete = async (id_num) => {
    const confirmDelete = window.confirm("Estas segur?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/post/${id_num}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id_num !== id_num));
      console.log("Post esborrat");
    } catch (error) {
      console.error("Error en esborrar l'Post:", error.response?.data || error.message);
    }
  };

  return { posts, loading, error, handleDelete };
};

export default useSearchPosts;
import { useState, useEffect } from "react";
import axios from "axios";

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/posts");
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
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id_num}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id_num !== id_num)
      );
      console.log("Usuari esborrat");
    } catch (error) {
      console.error("Error en esborrar l'usuari:", error.response?.data || error.message);
    }
  };

  return { posts, loading, error, handleDelete };
};

export default FetchPosts;
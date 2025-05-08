import { useState, useEffect } from "react";
import axios from "axios";

const FetchComents = () => {
  const [coments, setComents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    fetchComents();
  }, []);

  const fetchComents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/coments", getAuthHeader());
      setComents(response.data);
      console.log("Comentaris carregats:", response.data);
    } catch (error) {
      console.error("Error carregant els comentaris:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Estas segur que vols eliminar el comentari?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/coments/${id}`, getAuthHeader());
      setComents((prevComents) =>
        prevComents.filter((coment) => coment.id !== id)
      );
      console.log("Comentari esborrat");
    } catch (error) {
      console.error("Error en esborrar el comentari:", error.response?.data || error.message);
    }
  };

  return { coments, loading, error, handleDelete };
};

export default FetchComents;

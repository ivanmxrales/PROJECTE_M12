import { useState, useEffect } from "react";
import axios from "axios";
import getAuthUser from "../../utility/getAuthUserToken";
import api from "../../lib/axios";

const FetchComents = (id) => {
  const [coments, setComents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetchComents();
  }, [id]);

  const fetchComents = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.get(`/api/coments/${id}`, getAuthUser());
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
      await api.get("/sanctum/csrf-cookie");
      await api.delete(`/api/coment/${id}`, getAuthUser());
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

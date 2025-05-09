import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../lib/axios";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.get("/api/users", getAuthHeader());
      setUsers(response.data);
      console.log("Usuaris carregats:", response.data);
    } catch (error) {
      console.error("Error carregant els usuaris:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Estas segur?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );
      console.log("Usuari esborrat");
    } catch (error) {
      console.error("Error en esborrar l'usuari:", error.response?.data || error.message);
    }
  };

  return { users, loading, error, handleDelete };
};

export default FetchUsers;
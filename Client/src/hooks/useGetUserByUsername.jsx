import { useState, useEffect } from "react";
import api from "../lib/axios";
import getAuthUserToken from "../utility/getAuthUserToken";

const FetchUser = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/username/${username}`, getAuthUserToken());
        setUser(response.data);
        //console.log("Usuari carregat:", response.data);
      } catch (error) {
        //console.error("Error carregant l'usuari:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error }; 
};

export default FetchUser;

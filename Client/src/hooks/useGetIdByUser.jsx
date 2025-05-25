import { useState, useEffect } from "react";
import api from "../lib/axios";
import getAuthUserToken from "../utility/getAuthUserToken";

const FetchUser = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async (username) => {
    try {
      //console.log("Utilitzant: ", username);
      const response = await api.get(`/username/${username}`, getAuthUserToken());
      setPosts(response.data);
      //console.log("Usuari carregat: ", response.data);
    } catch (error) {
      //console.error("Error agafant el username:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
};

export default FetchUser;
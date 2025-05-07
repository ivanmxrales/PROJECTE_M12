import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_BASE}/posts/${postId}/like`, {}, getAuthHeader());
    return response.data;
  } catch (error) {
    throw new Error("Error al dar like al post.");
  }
};

export const unlikePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_BASE}/posts/${postId}/unlike`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw new Error("Error al quitar like del post.");
  }
};

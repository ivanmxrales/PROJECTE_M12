/* import { useState, useEffect } from "react";
import api from "../lib/axios";
import getAuthUserToken from "../utility/getAuthUserToken";

const useFollow = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!userId) return;
      try {
        const response = await api.get(`/api/isFollowing/${userId}`, getAuthUserToken());
        setIsFollowing(response.data.seguint); 
      } catch (err) {
        console.error("Error checking follow status:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    checkFollowStatus();
  }, [userId]);

  const toggleFollow = async () => {
    try {
      const endpoint = isFollowing ? `/api/unfollow/${userId}` : `/api/follow/${userId}`;
      await api.post(endpoint, {}, getAuthUserToken());
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Error toggling follow:", err);
      setError(err);
    }
  };

  return { isFollowing, toggleFollow, loading, error };
};

export default useFollow;
 */


import { useState, useEffect } from "react";
import api from "../lib/axios";
import getAuthUserToken from "../utility/getAuthUserToken";

const useFollow = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!userId) return;
      try {
        const response = await api.get(`/api/isFollowing/${userId}`, getAuthUserToken());
        setIsFollowing(response.data.seguint); // assuming 'seguint' means true/false
      } catch (err) {
        console.error("Error checking follow status:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    checkFollowStatus();
  }, [userId]);

  const toggleFollow = async () => {
    try {
      const endpoint = isFollowing ? `/api/unfollow/${userId}` : `/api/follow/${userId}`;
      await api.post(endpoint, {}, getAuthUserToken());
      setIsFollowing(!isFollowing);
      return isFollowing ? 'unfollowed' : 'followed';
    } catch (err) {
      console.error("Error toggling follow:", err);
      setError(err);
      return null;
    }
  };

  return { isFollowing, toggleFollow, loading, error };
};

export default useFollow;

import React from "react";
import FetchLikes from "./FetchLikes";
import { useState } from "react";

const LikeButton = ({ postId, userId }) => {
    const { hasUserLiked, likePost , unlikePost, errorLikes ,getLikeCount} = FetchLikes({ id: postId });

    const handleLikeToggle = () => {
        if (hasUserLiked(userId)) {
          unlikePost(postId);
          // Aquí puedes llamar a la función para quitar el like
        } else {
          likePost(postId)

          // Aquí puedes llamar a la función para dar el like
        }
      };

    

  

      return (
        <div>
          <button onClick={handleLikeToggle} class="bg-transparent">
            {hasUserLiked(userId) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="24px"
                height="24px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="24px"
                height="24px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
          {getLikeCount()} 
          {errorLikes && <p style={{ color: "red" }}>{errorLikes}</p>}
        </div>
      );
    };

export default LikeButton;
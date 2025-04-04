import React from 'react';

const PostImages = ({ post }) => {
  // Asegúrate de que post.media es un array
  const media = JSON.parse(post.media);  // Suponiendo que 'media' está en formato JSON
  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div>
      {media && media.length > 0 ? (
        media.map((imageUrl, index) => (
          <img
            key={index}
            src={baseUrl + imageUrl}
            alt={imageUrl}
            className="post-image"
          />
        ))
      ) : (
        <p>No images available</p> // En caso de que no haya imágenes
      )}
    </div>
  );
};

export default PostImages;

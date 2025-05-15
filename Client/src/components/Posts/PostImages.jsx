import React, { useState } from 'react';
import api from "../../lib/axios";

const PostImages = ({ post }) => {
  // Asegúrate de que 'media' es un array con las URLs de las imágenes
  const media = JSON.parse(post.media);  // Suponiendo que 'media' está en formato JSON
  

  // Estado para el índice de la imagen activa
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    // Aumenta el índice, y vuelve al principio si estamos en la última imagen
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevImage = () => {
    // Disminuye el índice, y vuelve al final si estamos en la primera imagen
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  console.log("media:" + api );
  console.log("media:" + media[0] );
  return (
    <div className="carousel-container">
      {media && media.length > 0 ? (
        <div className="carousel">
          {/* Botón anterior */}
          <button className="prev" onClick={prevImage}>‹</button>
          
          {/* Imagen actual */}
          <img
            src={api + media[currentIndex]}
            alt={`post-image-${currentIndex}`}
            className="post-image"
          />
          
          
          {/* Botón siguiente */}
          <button className="next" onClick={nextImage}>›</button>
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default PostImages;
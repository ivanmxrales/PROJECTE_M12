import React, { useState } from 'react';
import api from "../../lib/axios";
import baseUrl from '../../utility/getBaseUrl';

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

  
  


  return (
  <div className="carousel-container w-full relative flex items-center justify-center">
    {media && media.length > 0 ? (
      <div className="carousel relative w-full flex items-center justify-center">

        <button
          className="prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
          onClick={prevImage}
        >
          ‹
        </button>

        <img
          src={baseUrl + "/"+ media[currentIndex]}
          alt={`post-image-${currentIndex}`}
          className="post-image min-h-[300px] max-h-[600px] w-auto h-auto object-contain"
        />
        
        <button
          className="next absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
          onClick={nextImage}
        >
          ›
        </button>
      </div>
    ) : (
      <p>No images available</p>
    )}
  </div>
);

};

export default PostImages;
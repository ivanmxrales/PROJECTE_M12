import { useEffect, useState } from 'react';
import React from 'react';
import FetchLikedPosts from '../../hooks/useGetLikedPosts';
import PostModal from '../Posts/PostModal';

const LikedPosts = ({ userId: id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { posts, loading, error } = FetchLikedPosts(id);
  const baseUrl = 'http://127.0.0.1:8000/';

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
  };

  if (loading || isLoading) return <p>Carregant posts que t’han agradat...</p>;
  if (error) return <p>Error carregant els posts marcats com a m’agrada.</p>;
  if (posts.length === 0) return <p className="mt-20 text-center text-gray-500">Cap post marcat com a m'agrada...</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 sm:gap-4 md:grid-cols-3 mt-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="p-4 border rounded cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={baseUrl + JSON.parse(post.media)[0]}
              alt={post.title}
              className="w-full h-72 object-cover rounded mt-2"
            />
          </div>
        ))}
      </div>

      {modalOpen && (
        <PostModal
          posts={posts}
          currentIndex={currentIndex}
          closeModal={closeModal}
          showPrev={showPrev}
          showNext={showNext}
        />
      )}
    </>
  );
};

export default LikedPosts;

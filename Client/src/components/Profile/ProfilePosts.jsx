import { useEffect, useState } from 'react';
import FetchUserPosts from "../../hooks/useGetUserPosts";
import DeleteUserPost from "../../hooks/useGetUserPosts";
import getAuthUserId from '../../utility/getAuthUserId';
import PostModal from '../Posts/PostModal';

const ProfilePosts = ({ userId: id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { posts, loading, error , handleDelete} = FetchUserPosts(id);

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

  if (loading || isLoading) return <p>Carregant posts...</p>;
  if (error) return <p>Error carregant els posts...</p>;

  if (posts.length === 0) return <p className="text-center text-gray-500 mt-20">Usuari sense posts...</p>;

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
              src={'http://127.0.0.1:8000/' + JSON.parse(post.media)[0]}
              alt={post.title}
              className="w-full h-72 object-cover rounded mt-2"
            />
            {post.user_id === getAuthUserId() && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
                className="mt-2 text-red-500"
              >
                Esborrar
              </button>
            )}
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

export default ProfilePosts;

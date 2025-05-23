import "../../styles/posts.css";
import { Button } from "react-bootstrap";
import { ShareLogo, CommentLogo } from "../../assets/icons";
import React, { useState } from "react";
import FetchUsers from "../../components/users/FetchUsers";
import Coments from "../../components/coments/Coments";
import PostImages from "../../components/Posts/PostImages";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Likes from "../../components/likes/Likes";
import FetchPostsHome from "../../components/Posts/FetchPostsHome";
import MenuPost from "../../components/Posts/MenuPost";


function Home({ }) {
  const { posts, loading, error, handleDelete } = FetchPostsHome();
  const [visibleComents, setVisibleComents] = useState({});
  const { users } = FetchUsers();
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentsByPostId, setCommentsByPostId] = useState({});



  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenEditProfile = () => setIsModalOpen(true);

  const handleSaveProfile = (updatedData) => {
    if (!authUser) return;
    const updatedUser = { ...authUser, ...updatedData };
    setAuthUser(updatedUser);
    const storedUser = JSON.parse(localStorage.getItem("user-info"));
    storedUser.user = updatedUser;
    localStorage.setItem("user-info", JSON.stringify(storedUser));
  };


  const [editingPost, setEditingPost] = useState(null);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error cargando datos: {error.message}</div>;

  const toggleComents = (postId) => {
    setVisibleComents((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div>
      <div className="posts-list">
        <div className="flex flex-col items-center justify-center gap-10  w-[800px] mt-[20px]">
          {posts.map((post) => {
            const isEditing = editingPost && editingPost.id === post.id;
            const author = users.find((user) => user.id === post.user_id);

            return (


              <div key={post.id} className=" top-0 w-full max-w-screen-xl mx-auto border ">
                <div className="flex w-full border-b h-24 ">
                  <div className='flex items-center gap-5 align-center'>
                    <RouterLink id="toProfile" className="flex items-center gap-5 align-center pt-8 b-rounded-full"
                      to={`/${author?.username}`}>
                      <div className="ml-12 w-12 h-12 border rounded-full overflow-hidden">
                        <img src={author?.profile_picture} alt="profile" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className='hidden md:block text-white'>{author ? author.name + ' ' : "Desconocido"}</span>
                        <span className='hidden md:block text-white'>{post.location}</span>
                      </div>
                    </RouterLink>
                    {/* <EditPost></EditPost> */}
                    <button className="ml-[500px] scale-150'w-10 h-10 bg-transparent text-center" onClick={() => {
                      setSelectedPost(post);
                      setIsModalOpen(true);
                    }}>
                      ···
                    </button>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center '>
                  <PostImages post={post} />

                </div>
                <div className='flex w-full h-12 border-t gap-5 pt-2 focus:outline-none '>
                  <Likes postId={post.id} />
                  {/* <LikeLogo className="mt-5"></LikeLogo> */}

                  <Button
                    variant="outline-primary"
                    onClick={() => toggleComents(post.id)}
                    className="ml-4 focus:outline-none"
                  >
                    <CommentLogo className="mt-0"></CommentLogo>
                  </Button>

                  <Button className="focus:outline-none"><ShareLogo className="mt-5"></ShareLogo></Button>

                  {/* <EditPostForm post={post}></EditPostForm> */}

                  {/* <Button
                        variant="danger"
                        onClick={() => handleDelete(post.id)}
                      >
                        Eliminar
                      </Button> */}
                </div>
                <p className='mt-4 text-lg text-gray-400'>{post.description}</p>
                <p>{post.data_hora}</p>



                {visibleComents[post.id] && <Coments postId={post.id} />}



              </div>


            );
          })}

        </div>
        {isModalOpen && (
          <MenuPost onClose={handleCloseModal} post={selectedPost} />
        )}
      </div>

    </div>
  );
}

export default Home;
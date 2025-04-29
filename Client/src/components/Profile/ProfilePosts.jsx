import { useEffect, useState } from 'react';
import FetchUserPosts from "../../components/Posts/FetchUserPosts";
import { useParams } from "react-router-dom";
import PostsFiltrado from '../../pages/posts/PostsFiltrado';


const ProfilePosts = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed.user); // <-- Only keep the nested user object
        }
      }, []);


      return (
      <PostsFiltrado id={user?.id} />
    );
    /* const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const { posts, loading, error, handleDelete } = FetchUserPosts(id); 

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (loading || isLoading) {
        return (
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-3">
                {posts.map((_, index) => (
                    <div key={index} className="flex flex-col items-start">
                        <div className="w-full h-72 bg-gray-200 animate-pulse rounded" />
                        <div className="text-center text-gray-500 mt-2">Carregant posts...</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-3">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded">
                    <p>{post.title}</p>
                    <button
                        onClick={() => handleDelete(post.id_num)}
                        className="mt-2 text-red-500"
                    >
                        Esborrar
                    </button>
                </div>
            ))}
        </div>
    ); */
};

export default ProfilePosts;

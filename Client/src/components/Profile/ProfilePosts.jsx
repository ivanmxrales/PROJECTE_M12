import { useEffect, useState } from 'react';
import FetchUserPosts from "../../hooks/useGetUserPosts";
import DeleteUserPost from "../../hooks/useGetUserPosts";
import { useParams } from "react-router-dom";


const ProfilePosts = ({ userId: id }) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log("ID:", id);

    const { posts, loading, error} = FetchUserPosts(id); 
    const { handleDelete } = DeleteUserPost(id);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 sm:gap-4 md:grid-cols-3 mt-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded">
                    {/* <p>{post.title}</p> */}
                    <img
                        src={post.media}
                        alt={post.title}
                        className="w-full h-72 object-cover rounded mt-2"
                    />
                    <button
                        onClick={() => handleDelete(post.id)}
                        className="mt-2 text-red-500"
                    >
                        Esborrar
                    </button>
                </div>
            ))}
        </div>
    ); 
};

export default ProfilePosts;

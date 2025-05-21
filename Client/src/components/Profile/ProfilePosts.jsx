import { useEffect, useState } from 'react';
import FetchUserPosts from "../../hooks/useGetUserPosts";
import DeleteUserPost from "../../hooks/useGetUserPosts";
import { useParams } from "react-router-dom";
import getAuthUserId from '../../utility/getAuthUserId';
import api from '../../lib/axios';


const ProfilePosts = ({ userId: id }) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log("ID:", id);
    //const AuthId = getAuthUserId();

    const { posts, loading, error } = FetchUserPosts(id);
    const { handleDelete } = DeleteUserPost(id);
    //const baseUrl = 'http://127.0.0.1:8000/';
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 sm:gap-4 md:grid-cols-3 mt-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded">
                    {/* <p>{post.title}</p>  */}
                    <img
                        src={api + '/' + JSON.parse(post.media)[0]}
                        // src={post.media} const media = JSON.parse(post.media); post.media[1]
                        alt={post.title}
                        className="w-full h-72 object-cover rounded mt-2"
                    />
                    {post.user_id === getAuthUserId() && (
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="mt-2 text-red-500"
                        >
                            Esborrar
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfilePosts;

import { useEffect, useState } from 'react';
import React from 'react'
import FetchLikedPosts from '../../hooks/useGetLikedPosts';

const LikedPosts = ({ userId: id }) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log("ID:", id);

    const { posts, loading, error } = FetchLikedPosts(id);
    // const { handleDelete } = DeleteUserPost(id);
    const baseUrl = 'http://127.0.0.1:8000/';
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (loading || isLoading) return <p>Carregant posts que t’han agradat...</p>;
    if (error) return <p>Error carregant els posts marcats com a m’agrada.</p>;
    if (posts.length === 0) return <p className="mt-20 text-center text-gray-500">Cap post marcat com a m'agrada...</p>;



    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 sm:gap-4 md:grid-cols-3 mt-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded">
                    {/* <p>{post.title}</p>  */}
                    <img
                        src={baseUrl + JSON.parse(post.media)[0]}
                        // src={post.media} const media = JSON.parse(post.media); post.media[1]
                        alt={post.title}
                        className="w-full h-72 object-cover rounded mt-2"
                    />
                    {/* <button
                        onClick={() => handleDelete(post.id)}
                        className="mt-2 text-red-500"
                    >
                        Esborrar
                    </button> */}
                </div>
            ))}
        </div>
    )
}

export default LikedPosts
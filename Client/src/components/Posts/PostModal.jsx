import React, { useState } from 'react';
import Likes from "../../components/likes/Likes";
import Coments from "../../pages/coments/Coments2";

const baseURL = 'http://127.0.0.1:8000/';

const PostModal = ({ posts, currentIndex, closeModal, showPrev, showNext }) => {
    const post = posts[currentIndex];
    const mediaArray = JSON.parse(post.media);
    const [mediaIndex, setMediaIndex] = useState(0);

    const showNextImage = () => {
        setMediaIndex((prev) => (prev + 1) % mediaArray.length);
    };

    const showPrevImage = () => {
        setMediaIndex((prev) => (prev - 1 + mediaArray.length) % mediaArray.length);
    };

    return (
        <div
            className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center p-4 w-full h-full overflow-auto"
            onClick={closeModal}
        >
            {/* Switch to previous post */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setMediaIndex(0); // Reset mediaIndex when changing posts
                    showPrev();
                }}
                className="absolute left-24 top-1/2 transform -translate-y-1/2 text-4xl text-white hover:scale-110 transition-transform select-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            </button>

            <div
                className="relative bg-black shadow-lg max-w-5xl max-h-full overflow-hidden flex flex-col w-[500px] h-[700px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="m-auto bg-black max-h-[80vh] overflow-auto relative">
                    {mediaArray.length > 1 && (
                        <>
                            <button
                                onClick={showPrevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 hover:scale-110 transition-transform"
                            >
                                ◀️
                            </button>
                            <button
                                onClick={showNextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 hover:scale-110 transition-transform"
                            >
                                ▶️
                            </button>
                        </>
                    )}
                    <img
                        src={baseURL + mediaArray[mediaIndex]}
                        alt={post.title}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <div
                className="bg-black w-[500px] h-[700px] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mt-4">
                    <Likes postId={post.id} />
                </div>
                <div className="flex-1 overflow-auto">
                    <Coments postId={post.id} />
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setMediaIndex(0); 
                    showNext();
                }}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-4xl text-white hover:scale-110 transition-transform select-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
            </button>
        </div>
    );
};

export default PostModal;

import { useEffect, useState } from 'react';

const ProfilePosts = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-3">
            {isLoading && [0, 1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="flex flex-col items-start">
                    <div className="w-full h-72 bg-gray-200 animate-pulse rounded">
                    </div>
                    <div className="text-center text-gray-500 mt-2">Funcionen els posts</div>
                </div>
            ))}
        </div>
    );
};

export default ProfilePosts;

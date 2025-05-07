import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';

const ProfileHeader = () => {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed.user);
        }
    }, []);

    const handleOpenEditProfile = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);

        // Save to localStorage (if desired)
        const storedUser = JSON.parse(localStorage.getItem("user-info"));
        storedUser.user = updatedUser;
        localStorage.setItem("user-info", JSON.stringify(storedUser));
    };

    return (
        <div className='flex gap-4 py-10 '>
            <div className="flex justify-center">
                <div className="relative w-24 h-24">
                    <img
                        className="rounded-full"
                        src={user?.profile_picture}
                        alt="usuari 1"
                    />
                </div>
            </div>

            <div className="flex flex-col items-start gap-2 mx-auto w-full">
                <div className="flex gap-4 flex-col sm:flex-row justify-center sm:justify-start items-center w-full">
                    <p className="text-sm sm:text-lg">{user?.username}</p>

                    <div className="flex gap-4 items-center justify-center">
                        <button className="bg-white text-black hover:bg-opacity-80 text-xs sm:text-sm px-4 py-2 rounded"
                            onClick={handleOpenEditProfile}>
                            Editar perfil
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <p><span className="font-bold mr-1">4</span>Publicacions</p>
                    <p><span className="font-bold mr-1">400</span>Seguidors</p>
                    <p><span className="font-bold mr-1">40</span>Seguint</p>
                </div>
                <br />
                <div className="flex flex-col items-start gap-4">
                    <p className="font-bold text-sm">{user?.biography}</p>
                    <p className="text-sm">{user?.birth_date}</p>
                </div>
            </div>

            {isModalOpen && (
                <EditProfile className="z-9999"
                    user={user}
                    onClose={handleCloseModal}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
};

export default ProfileHeader;

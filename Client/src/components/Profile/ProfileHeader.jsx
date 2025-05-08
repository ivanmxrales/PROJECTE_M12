import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import { SettingsLogo } from "../../assets/constants";
import { GearLogo } from '../../assets/constants';
import UserSettings from './USettings/UserSettings';
import api from '../../lib/axios';

const ProfileHeader = () => {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenSettings, setIsModalOpenSettings] = useState(false);

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

    const handleUserSettings = () => {
        setIsModalOpenSettings(true);
    }

    const handleCloseSettings = () => {
        setIsModalOpenSettings(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);

        const storedUser = JSON.parse(localStorage.getItem("user-info"));
        storedUser.user = updatedUser;
        localStorage.setItem("user-info", JSON.stringify(storedUser));
    };


    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowData = async () => {
            const token = JSON.parse(localStorage.getItem("user-info"))?.token;

            try {
                const resFollowers = await api.get("/api/followers", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const resFollowing = await api.get("/api/following", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFollowers(resFollowers.data);
                setFollowing(resFollowing.data);
            } catch (error) {
                console.error("Error fetching followers/following:", error.response?.data || error.message);
            }
        };


        fetchFollowData();
    }, []);


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
                    <div className="flex gap-4 items-center justify-center">
                        <button className="bg-transparent text-black hover:bg-opacity-80 text-xs sm:text-sm px-4 py-2 rounded"
                            onClick={handleUserSettings}>
                            <GearLogo />
                        </button>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <p><span className="font-bold mr-1">4</span>Publicacions</p>
                    <p><span className="font-bold mr-1">{followers.length}</span>Seguidors</p>
                    <p><span className="font-bold mr-1">{following.length}</span>Seguint</p>
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

            {isModalOpenSettings && (
                <UserSettings className="z-9999"
                    user={user}
                    onClose={handleCloseSettings}
                    onSave={handleSaveProfile}
                />
            )}


        </div>
    );
};

export default ProfileHeader;

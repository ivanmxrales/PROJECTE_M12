import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import UserSettings from './USettings/UserSettings';
import api from '../../lib/axios';
import { GearLogo } from '../../assets/icons';
import useFollow from '../../hooks/useFollow';
import { Link } from 'react-router';
import getAuthUserToken from '../../utility/getAuthUserToken';

const ProfileHeader = ({ user: profileUser }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenSettings, setIsModalOpenSettings] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [postsCount, setPostsCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setAuthUser(parsed.user);
        }
    }, []);

    useEffect(() => {
        const fetchFollowData = async () => {
            if (!profileUser?.id) return;
            const token = JSON.parse(localStorage.getItem("user-info"))?.token;
            try {
                const resFollowers = await api.get(`/api/user/${profileUser.id}/followers`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const resFollowing = await api.get(`/api/user/${profileUser.id}/following`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const resPostsCount = await api.get(`/api/user/posts/${profileUser.id}`, getAuthUserToken());

                setFollowers(resFollowers.data);
                setFollowing(resFollowing.data);
                setPostsCount(resPostsCount.data);
            } catch (error) {
                //console.error("Error fetching followers/following/posts:", error);
            }
        };

        fetchFollowData();
    }, [profileUser?.id]);

    const isOwnProfile = authUser?.id === profileUser?.id;

    const handleOpenEditProfile = () => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setAuthUser(parsed.user);

        } setIsModalOpen(true);
    };

    const handleUserSettings = () => setIsModalOpenSettings(true);
    const handleCloseSettings = () => setIsModalOpenSettings(false);
    const handleCloseModal = () => setIsModalOpen(false);

    const { isFollowing, toggleFollow, loading } = useFollow(profileUser.id);

    const handleSaveProfile = (updatedData) => {
        if (!authUser) return;
        const updatedUser = { ...authUser, ...updatedData };
        setAuthUser(updatedUser);
        const storedUser = JSON.parse(localStorage.getItem("user-info"));
        storedUser.user = updatedUser;
        localStorage.setItem("user-info", JSON.stringify(storedUser));
        setIsModalOpen(false);
    };

    const handleFollowClick = async () => {
        try {
            const result = await toggleFollow();
            if (!authUser || !result) return;

            if (result === 'followed') {
                setFollowers(prev => [...prev, authUser]);
            } else if (result === 'unfollowed') {
                setFollowers(prev => prev.filter(f => f.id !== authUser.id));
            }
        } catch (error) {
            //console.error("Error toggling follow:", error);
        }
    };


    return (
        <div className="flex flex-col sm:flex-row gap-4 py-10 w-full">
            <div className="flex justify-center sm:justify-start">
                <div className="relative w-24 h-24">
                    <img
                        className="rounded-full object-cover w-full h-full"
                        src={profileUser.profile_picture}
                        alt={`${profileUser.username} profile`}
                    />
                </div>
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                    <h2 className="text-2xl font-semibold">{profileUser.username}</h2>

                    {isOwnProfile ? (
                        <div className="flex gap-3">
                            <button onClick={handleOpenEditProfile} className="bg-white text-black px-4 py-1 rounded">Editar perfil</button>
                            <button onClick={handleUserSettings}>
                                <GearLogo />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                                onClick={handleFollowClick}
                                disabled={loading}
                            >
                                {isFollowing ? "Deixar de seguir" : "Seguir"}
                            </button>
                            &nbsp;&nbsp;
                            {isFollowing && (
                                <Link to={`/chat/${profileUser.username}`} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 inline-block
                                    hover:text-white">
                                    Enviar missatge
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                    <p><span className="font-bold mr-1">{postsCount}</span>Publicacions</p>
                    <p><span className="font-bold mr-1">{followers.length}</span>Seguidors</p>
                    <p><span className="font-bold mr-1">{following.length}</span>Seguint</p>
                </div>

                <div className="flex flex-col items-start gap-1 mt-2">
                    {profileUser.biography && <p className="font-bold text-sm">{profileUser.biography}</p>}
                    {profileUser.birth_date && <p className="text-sm">{profileUser.birth_date}</p>}
                </div>
            </div>

            {isModalOpen && (
                <EditProfile onClose={handleCloseModal} onSave={(updatedData) =>{
                    handleSaveProfile(updatedData);
                    if (typeof onSaveProfile === 'function') onSaveProfile(updatedData);
                }} user={authUser} />
            )}
            {isModalOpenSettings && (
                <UserSettings onClose={handleCloseSettings} user={authUser} />
            )}
        </div>
    );
};

export default ProfileHeader;

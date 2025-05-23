import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/axios';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfilePosts from '../../components/Profile/ProfilePosts';
import LikedPosts from '../../components/Profile/LikedPosts';
import getAuthUser from '../../utility/getAuthUserToken';
import FetchUser from '../../hooks/useGetUserByUsername';
import { CameraIcon, UnlikeLogo, UserIcon } from '../../assets/icons';
import Seguint from '../../components/Profile/Seguint';

const Profile = () => {
    const { username } = useParams();
    const { user, loading, error } = FetchUser(username);
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/ api/user/username/${username}`, getAuthUser());
                setUser(res.data);
            } catch (err) {
                console.log("Error fetching user: ", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username]);

        useEffect(() => {
            setActiveTab('posts');
        }, [username]);

        const handleSaveProfile = (updatedUser) => {
            setUser(updatedUser);
            const stored = JSON.parse(localStorage.getItem("user-info"));
            stored.user = updatedUser;
            localStorage.setItem("user-info", JSON.stringify(stored));
        }

        if (loading) return <p className="text-center mt-10">Carregant perfil...</p>;
        if (!user) return <p className="text-center mt-10 text-red-500">Usuari no trobat</p>;

        return (
            <div className="max-w-screen-lg py-5 mx-auto">
                <div className="py-10 px-4 md:px-10 w-full mx-auto flex flex-col">
                    <ProfileHeader user={user} onSaveProfile={handleSaveProfile} />
                </div>

                <div className='flex justify-center border-t-2 border-b-2 border-white py-5 gap-6'>
                    <button
                        className={activeTab === 'posts' ? 'font-bold underline' : ''}
                        onClick={() => setActiveTab('posts')}
                    >
                        <CameraIcon />
                    </button>
                    <button
                        className={activeTab === 'liked' ? 'font-bold underline' : ''}
                        onClick={() => setActiveTab('liked')}
                    >
                        <UnlikeLogo />
                    </button>
                    <button
                        className={activeTab === 'other' ? 'font-bold underline' : ''}
                        onClick={() => setActiveTab('other')}
                    >
                        <UserIcon />
                    </button>
                </div>

                <div className='flex mx-auto w-full border-white/30 flex-col'>
                    {activeTab === 'posts' && <ProfilePosts userId={user.id} />}
                    {activeTab === 'liked' && <LikedPosts userId={user.id} />}
                    {activeTab === 'other' && <Seguint userId={user.id} />}
                </div>
            </div>
        );
    };

    export default Profile;

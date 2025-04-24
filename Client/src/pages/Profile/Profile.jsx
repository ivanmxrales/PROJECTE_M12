import React from 'react';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfilePosts from '../../components/Profile/ProfilePosts';

const Profile = () => {
    return (
        <div className="max-w-screen-lg py-5 mx-auto">
            <div className="py-10 px-4 md:px-10 w-full mx-auto flex flex-col">
                <ProfileHeader />
            </div>
            <div className='flex mx-auto w-full border-white/30 border-t border-b flex-col'>
                <ProfilePosts />
            </div>
        </div>
    );
};

export default Profile;

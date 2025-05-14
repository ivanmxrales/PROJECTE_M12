import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import getAuthUserToken from '../../utility/getAuthUserToken';
import { Link as RouterLink } from 'react-router-dom';

const Userbar = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    api.get('/api/users/random', getAuthUserToken())
      .then(response => setRecommendedUsers(response.data))
      .catch(error => console.error('Error fetching recommended users:', error));
  }, []);

  return (
    <div className="w-20 sm:w-24 md:w-48 h-screen border-r border-l border-white/30 py-8 px-2 md:px-4 sticky top-0 left-0 bg-black">
      <h2 className="mt-20 w-full text-white font-semibold text-sm">Usuaris recomenats</h2>

      <div className="mt-10 ">
        {recommendedUsers.map(user => (
          <div className='flex flex-col gap-2'>
            <RouterLink
              to={`/${user.username}`}
              key={user.id} className="bg-transparent w-full h-14 py-2 mt-4 hover:bg-white/20 rounded-md p-3">
              <div className="flex items-center gap-2">
                <img
                  src={user.profile_picture}
                  alt={user.username}
                  className="w-10 h-10 object-cover border rounded-full"
                />
                <div className="flex flex-col items-start ml-1 overflow-hidden">
                  <p className=" text-white">@{user.username}</p>
                </div>
              </div>
            </RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userbar;

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../lib/axios';
import getAuthUserToken from '../../utility/getAuthUserToken';

const Seguint = ({ userId: id }) => {
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    api.get(`/api/user/${id}/following`, getAuthUserToken())
      .then(response => setFollowedUsers(response.data))
      /* .catch(error => console.error('Error fetching followed users:', error)); */
      .catch((err) => {
        //console.error(err);
      })
  }, [id]);

  return (
    <div>
      <div className='mt-10 flex flex-col items-center justify-center gap-2 scrollable min-h-[150px]'>
        {followedUsers.length === 0 ? (
          <p className="text-center text-gray-500">No segueix cap usuari...</p>
        ) : (
          followedUsers.map(user => (
            <div key={user.id} className="mt-0 flex items-center justify-center">
              <div className='flex flex-col gap-2 border-b w-96 justify-center items-center'>
                <RouterLink
                  to={`/${user.username}`}
                  className="bg-transparent w-full h-14 py-2 mt-4 hover:bg-white/20 rounded-md p-3"
                >
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      src={user.profile_picture}
                      alt={user.username}
                      className="w-10 h-10 object-cover border rounded-full"
                    />
                    <div className="flex flex-col items-start ml-1 overflow-hidden">
                      <p className="text-white">@{user.username}</p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Seguint;

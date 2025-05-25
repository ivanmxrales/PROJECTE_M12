import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import getAuthUserToken from '../../utility/getAuthUserToken';
import { Link as RouterLink } from 'react-router-dom';
import MessageList from './MessageList';

const Messages = () => {

    const [searchUser, setSearchUser] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (searchUser.length === 0) {
            setUsers([])
            return
        }

        const delay = setTimeout(() => {
            api.get('/api/users/followed', {
                ...getAuthUserToken(),
                params: { query: searchUser }
            })
                .then(response => setUsers(response.data))
                /* .catch(error => console.error('Error fetching users:', error)) */
                .catch((err) => {
                    //console.error(err);
                  })
        }, 300)

        return () => clearTimeout(delay)
    }, [searchUser])
    return (
        <div>
            <div className='mt-0'>
                <div className="flex justify-center mt-0">
                    <h1 className="text-2xl font-bold mb-4">Missatges</h1>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Buscar per nom / username..."
                        className="w-96 p-2 border-b border-gray-300 rounded"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex justify-center border-0'>
                <div className='mt-10 flex flex-col items-center justify-center gap-2 scrollable'>
                    {users.map(user => (
                        <div key={user.id} className="mt-0 flex items-center justify-center">
                            <div className='flex flex-col gap-2 w-96 justify-center items-center'>
                                <RouterLink
                                    to={`/chat/${user.username}`}
                                    className="bg-transparent w-full h-14 py-2 mt-4 hover:bg-white/20 rounded-md p-3">
                                    <div className="flex gap-2 justify-center items-center">
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
                        </div>
                    ))}
                </div>
            </div>
            {searchUser.length === 0 && (
                <>
                    <MessageList/>
                </>
            )}
        </div>
    );
}

export default Messages
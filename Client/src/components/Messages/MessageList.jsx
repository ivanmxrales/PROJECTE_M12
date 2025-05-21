import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../lib/axios';
import getAuthUserToken from '../../utility/getAuthUserToken';

const MessageList = () => {
    const [messageUsers, setMessageUsers] = useState([]);

    useEffect(() => {
        api.get('/api/conversations', getAuthUserToken())
            .then(response => setMessageUsers(response.data))
            .catch(error => console.error("No s'han pogut carregar la llista de conversacions:", error));
    }, []);

    return (
        <>
            <div>
                <h2>Llistat de missatges</h2>
            </div>
            <div>
                <div className='mt-10 flex flex-col items-center justify-center gap-2 scrollable'>
                    {messageUsers.length === 0 ? (
                        <p className="text-white">No tens cap conversa iniciada.</p>
                    ) : (
                        messageUsers.map(user => (
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
        </>
    );
};

export default MessageList;

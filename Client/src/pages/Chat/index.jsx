import React, { useEffect } from 'react'
import api from '../../lib/axios';

const index = () => {
    useEffect(() => {
        const fetchChats = async () => {
        const res = await api.get('/messages');
        setVonversations(Object.entries(res.data));
    };
        fetchChats();
    }, []);

  return (
    <div>
        {conversations.map(([userId, messages]) => (
            <div key={userId} onClick={() => navigate(`/chat/${userId}`)}>
                {messages[0].senderId === currentUser.id? messages[0].receiver.username : messages[0].sender.username}

            </div>
        ))}
    </div>
  )
}

export default index
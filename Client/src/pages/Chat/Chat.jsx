import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatBody from "../../components/Chat/ChatBody";
import ChatInput from "../../components/Chat/ChatInput";
import FetchUser from "../../hooks/useGetUserByUsername";
import getAuthUserToken from "../../utility/getAuthUserToken";
import getAuthUserId from "../../utility/getAuthUserId";
import api from "../../lib/axios";

const Chat = () => {
  const { username } = useParams();
  const { user: selectedUser, loading, error } = FetchUser(username);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authUserId = getAuthUserId();
  const messagesWithRole = messages.map(msg => ({
    ...msg,
    role: msg.sender.id === authUserId ? "user" : "other",
  }));

  useEffect(() => {
    const id = getAuthUserId();

    const channel = window.Echo.channel('test-channel')
      .listen('MessageSent', (e) => {
        if (e.sender.id === selectedUser?.id || e.receiver.id === selectedUser?.id) {
          setMessages((prev) => {
            if (prev.some((msg) => msg.id === e.id)) return prev;
            return [...prev, e];
          });
        }
      });

    return () => {
      window.Echo.leave(`chat.${id}`);
    };
  }, [selectedUser]);



  useEffect(() => {
    if (!selectedUser) return;

    api.get(`/api/messages?user_id=${selectedUser.id}`, getAuthUserToken())
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Axios error", err));
  }, [selectedUser]);


  const handleInputChange = (e) => setInput(e.target.value);

  const handleDelete = (messageId) => {
    api.delete(`/api/messages/${messageId}`, getAuthUserToken())
      .then(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      })
      .catch((err) => {
        console.error("Failed to delete message", err);
      });
  };

  const handleSend = (messageContent) => {
    if (!selectedUser) return;

    setIsLoading(true);

    api.post("/api/messages", {
      receiver_id: selectedUser.id,
      content: messageContent,
    },
      getAuthUserToken()
    )
      .then((res) => {
        return res.data;
      })
      .then((newMessage) => {
        setMessages((prev) => {
          if (prev.some((msg) => msg.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  if (loading) return <p className="text-white text-center mt-4">Carregant conversa...</p>;
  if (error || !selectedUser) return <p className="text-red-500 text-center mt-4">Usuari no trobat.</p>;

  /* return (
    <div className="flex lg:h-[800px] lg:w-[600px] sm:w-[800px] sm:h-[400px]">
      <div className="flex flex-col w-full h-full flex-1">
        <ChatHeader user={selectedUser} />
        <ChatBody messages={messagesWithRole} isLoading={isLoading} onDelete={handleDelete} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  ); */

  return (
    <div className="flex w-full h-full justify-center items-center p-2 lg:h-[800px] lg:w-[600px]">
      <div className="flex flex-col w-full h-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[800px] xl:max-w-[1000px] border border-gray-700 rounded-md">
        <ChatHeader user={selectedUser} />
        <ChatBody messages={messagesWithRole} isLoading={isLoading} onDelete={handleDelete} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
  
};

export default Chat;

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
    if (!selectedUser) return;

    api.get(`/api/messages?user_id=${selectedUser.id}`, getAuthUserToken())
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Axios error", err));
  }, [selectedUser]);


  const handleInputChange = (e) => setInput(e.target.value);

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
        setMessages((prev) => [...prev, newMessage]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  if (loading) return <p className="text-white text-center mt-4">Carregant conversa...</p>;
  if (error || !selectedUser) return <p className="text-red-500 text-center mt-4">Usuari no trobat.</p>;

  return (
    <div className="flex h-[800px] w-[600px]">
      <div className="flex flex-col h-full flex-1">
        <ChatHeader user={selectedUser} />
        <ChatBody messages={messagesWithRole} isLoading={isLoading} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;

import { useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"

const ChatBody = ({ messages, isLoading, onDelete }) => {
  const messagesEndRef = useRef(null);

  /* useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); */

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <div className="max-w-md">
            <h3 className="text-xl font-medium mb-2">Comença una conversació!</h3>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} relative group`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-600 text-white transition-transform duration-200 ease-in-out group-hover:-translate-x-8"
                  : "bg-slate-700 text-white"
              }`}
            >
              {message.content}
            </div>
        
            {message.role === "user" && (
              <button
              onClick={() => onDelete(message.id)}
              className="flex items-center justify-center w-4 absolute top-1/2 -translate-y-1/2 -right-4 text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ❌
            </button>
            
            )}
          </div>
        ))
        
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;

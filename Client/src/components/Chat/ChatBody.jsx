import { useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"

const ChatBody = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <div className="max-w-md">
            <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
            <p>Ask a question or start a new topic to begin chatting with the AI assistant.</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : " text-black"}`}>
              {message.content}
            </div>
          </div>
        ))
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatBody

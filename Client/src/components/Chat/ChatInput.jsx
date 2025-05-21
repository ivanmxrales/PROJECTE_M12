import { useState } from "react"
import { Paperclip, Send, Smile } from "lucide-react"

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    onSend?.(message.trim())
    setMessage("")
  }

  return (
    <div className="border-t  p-4">
      <form className="flex items-end gap-2" onSubmit={handleSubmit}>
        <button type="button" className="flex-shrink-0" title="Attach file">
          <Paperclip className="h-5 w-5" />
        </button>

        <div className="relative flex-1">
          <textarea
            placeholder="Escriu un missatge..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[60px] resize-none pr-10 border p-2 rounded-2xl bg-black/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" className="absolute bottom-2 right-2" title="Insert emoji">
            <Smile className="h-5 w-5" />
          </button>
        </div>
        <button type="submit" className="flex-shrink-0" title="Attach file">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

export default ChatInput

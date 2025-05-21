import { Phone, Video, MoreVertical } from "lucide-react"
import { Link as RouterLink } from "react-router-dom";

const ChatHeader = ({ user }) => {
  if (!user) {
    return (
      <div className="flex items-center justify-center h-16 border-b w-full">
        Select a conversation
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between border-b px-4 py-3 h-16 ">
      <div className="flex items-center gap-3">
        <RouterLink to={`/${user.username}`} className="flex items-center gap-3 text-white hover:text-white">
          <img
            src={user.profile_picture || "/placeholder.jpg"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover bg-gray-300"
          />
          <div>
            <h2 className="font-medium">{user.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm">@{user.username}</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <div className="flex items-center gap-2">
        <button><Phone className="h-5 w-5" /></button>
        <button><Video className="h-5 w-5" /></button>
        <button><MoreVertical className="h-5 w-5" /></button>
      </div>
    </div>
  )
}

export default ChatHeader

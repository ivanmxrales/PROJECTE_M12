import { Search, PlusCircle, Settings, MessageSquare } from "lucide-react";

const { user: authUser } = useAuth();


const ChatPreview = ({ user, active, onClick }) => (
  <div
    onClick={() => onClick(user)}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${active ? "bg-blue-100" : "hover:bg-gray-100"}`}
  >
    <img
      src={user.profile_picture || "/placeholder.jpg"}
      alt={user.name}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-medium truncate">{user.name}</h3>
      <p className="text-sm text-gray-500 truncate">{user.email}</p>
    </div>
  </div>
)

const Sidebar = ({ conversations, onSelect, selectedId }) => (
  <div className="w-80 border-r bg-white flex flex-col h-full">
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Messages</h1>
        <div className="flex gap-2">
          <Settings className="w-5 h-5 text-gray-600" />
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search messages"
          className="w-full pl-9 pr-3 py-2 border rounded text-sm bg-gray-50"
          disabled
        />
      </div>
    </div>

    <div className="p-2">
      <button className="w-full flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-gray-100">
        <PlusCircle className="w-4 h-4" />
        New Chat
      </button>
    </div>

    <div className="flex-1 overflow-y-auto p-2 space-y-1">
      {conversations.map((user) => (
        <ChatPreview
          key={user.id}
          user={user}
          active={user.id === selectedId}
          onClick={onSelect}
        />
      ))}
    </div>
  </div>
)

export default Sidebar

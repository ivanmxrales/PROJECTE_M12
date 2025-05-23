import { Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";
import GifPicker from "../GIPHY/GifPicker";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const TEXT_LENGTH = 20;
  const GIF_LENGTH = 200;

  const sendTextMessage = () => {
    const trimmed = text.trim();

    if (trimmed.length === 0) {
      setError("El missatge no pot estar buit.");
      return;
    }

    if (trimmed.length > TEXT_LENGTH) {
      setError(`El missatge ha de tenir menys de ${MAX_LENGTH} caràcters.`);
      return;
    }

    onSend(trimmed);
    setText("");
    setError(null);
  };

  const sendGifMessage = (gifUrl) => {
    if (gifUrl.length > GIF_LENGTH) {
      setError("Aquest GIF és massa llarg per enviar-lo.");
      return;
    }

    onSend(gifUrl);
    setShowGifPicker(false);
    setError(null);
  };

  return (
    <div className="p-2 border-t border-gray-700">
      <div className="flex space-x-2">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Escriu un missatge..."
          className="flex-1 p-2 rounded bg-slate-800 text-white"
        />
        <button
          onClick={sendTextMessage}
           className="flex-shrink-0" title="enviar">
          <Send className="h-5 w-5" id="sendMessage"/>
        </button>
        <button
          onClick={() => setShowGifPicker(!showGifPicker)}
          className="text-white px-2"
        >
          🎬
        </button>
      </div>

      {error && (
        <div className="mt-1 text-sm text-red-400">
          {error}
        </div>
      )}

      {showGifPicker && <GifPicker onGifSelect={sendGifMessage} />}
    </div>
  );
};

export default ChatInput;

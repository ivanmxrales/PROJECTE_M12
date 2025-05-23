import { useState } from "react";
import axios from "axios";

const GifPicker = ({ onGifSelect }) => {
  const [results, setResults] = useState([]);

  const searchGifs = async (query) => {
    const apiKey = "Dpu1wBB5Q4kLwuXNQqWJE4CTemhlbyZG";
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: apiKey,
        q: query,
        limit: 10
      }
    });

    setResults(res.data.data);
  };

  return (
    <div>
      <input
        placeholder="Buscar GIF"
        onChange={(e) => searchGifs(e.target.value)}
        className="mb-2 p-1 rounded"
      />
      <div className="grid grid-cols-3 gap-2">
        {results.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height_small.url}
            alt="gif"
            onClick={() => onGifSelect(gif.images.original.url)}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default GifPicker;

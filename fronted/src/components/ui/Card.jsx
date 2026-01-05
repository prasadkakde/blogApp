import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ id, title, image }) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleReadMore = () => navigate(`/blog/${id}`);

  const handleLike = () => {
    if (liked) {
      setLikes((v) => Math.max(0, v - 1));
      setLiked(false);
    } else {
      setLikes((v) => v + 1);
      setLiked(true);

      if (disliked) {
        setDisliked(false);
        setDislikes((v) => Math.max(0, v - 1));
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes((v) => Math.max(0, v - 1));
      setDisliked(false);
    } else {
      setDislikes((v) => v + 1);
      setDisliked(true);

      if (liked) {
        setLiked(false);
        setLikes((v) => Math.max(0, v - 1));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-[350px]">

      {/* Image */}
      <div className="w-full h-40 bg-gray-300 rounded-md overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500 w-full h-full flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-center mt-4 flex-1">{title}</h3>

      {/* Buttons Row */}
      <div className="mt-4 grid grid-cols-3 gap-3 items-center">

        {/* LEFT — LIKE */}
        <div className="flex justify-start">
          <button
            onClick={handleLike}
            className={
              "flex items-center gap-2 px-3 py-2 rounded-md transition " +
              (liked
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700")
            }
          >
            👍 {likes}
          </button>
        </div>

        {/* CENTER — READ MORE */}
        <div className="flex justify-center">
          <button
            onClick={handleReadMore}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            Read More
          </button>
        </div>

        {/* RIGHT — DISLIKE */}
        <div className="flex justify-end">
          <button
            onClick={handleDislike}
            className={
              "flex items-center gap-2 px-3 py-2 rounded-md transition " +
              (disliked
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700")
            }
          >
            👎 {dislikes}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Card;

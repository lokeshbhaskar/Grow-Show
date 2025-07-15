import React from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";

const Posts = ({username,location,image}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3">
      <div className="flex items-center space-x-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="font-semibold text-sm">{username}</div>
          <div className="text-xs text-green-500">{location}</div>
        </div>
      </div>
      <div className="mt-3 rounded-xl overflow-hidden">
        <img src={image} alt="Nature Post" className="w-full" />
      </div>
      <div className="flex space-x-4 mt-2 text-green-600">
        <FaHeart size={25}/>
        <div>
            00
        </div>
        <FaCommentDots size={25}/>
        <div>
            00
        </div>
      </div>
      <input
        type="text"
        placeholder="Leave a comment..."
        className="mt-2 w-full border border-green-200 rounded-full px-4 py-1 text-sm focus:outline-none"
      />
    </div>
  );
};

export default Posts;

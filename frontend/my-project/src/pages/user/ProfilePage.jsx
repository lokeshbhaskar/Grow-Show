import React, { useContext } from 'react'
import { FaHeart, FaComment, FaThLarge } from "react-icons/fa";
import { UserContext } from '../../context/userContext';

const ProfilePage = () => {
  const {user} = useContext(UserContext);
  // console.log("User details", user);
  if(!user){
    return <div className="text-center text-red-500">User not authenticated</div>
  }
  return (
     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 text-green-800 font-sans p-4 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md p-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-green-500"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold"> { user.name } </h2>
            <div className="flex justify-between text-sm text-green-600 mt-2">
              <div className="text-center">
                <span className="block font-bold text-lg">120</span>
                Posts
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg"> {user.followers.length } </span>
                Followers
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg">{user.following.length}</span>
                Following
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 text-sm">
          <p className="font-medium"> {user.bio} </p>
          <p className="text-green-600"> {user.bio} </p>
        </div>
        
        {/* Tabs */}
        <div className="mt-6 flex justify-around text-green-600 border-t border-b py-2">
          <button className="flex items-center space-x-1">
            <FaThLarge /> <span>Posts</span>
          </button>
          <button className="flex items-center space-x-1">
            <FaHeart /> <span>Liked</span>
          </button>
          <button className="flex items-center space-x-1">
            <FaComment /> <span>Tagged</span>
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-green-100 rounded-md overflow-hidden">
              <img
                src={`https://source.unsplash.com/300x300/?nature,forest,${i}`}
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
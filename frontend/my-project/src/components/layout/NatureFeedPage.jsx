import React, {useState , useEffect } from "react";
import {
  FaHeart,
  FaCommentDots,
  FaLeaf,
  FaHome,
  FaPlusCircle,
  FaUser,
} from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import Posts from "../posts/Posts";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

export default function NatureFeedPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    image: "",
    caption: "",
  });

  // Function to handle adding a new post
  const handleAddPost = async () => {
    if (!newPost.image || !newPost.caption) return;
    const formData = new FormData();
    formData.append("image", newPost.image);
    formData.append("caption", newPost.caption);
    try {
      const res = await axiosInstance.post(API_PATHS.POSTS.CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
      console.log("✅ Post created:", data);
      URL.revokeObjectURL(newPost.image);
      setNewPost({ image: "", caption: "" });
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
  };

  // Function to fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.POSTS.GET_ALL);
        setPosts(res.data);
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [posts]);

  const handleNavigate = () => {
    navigate("/profile");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center font-sans text-green-700 ">
      <div className="w-full h-[98vh] max-w-sm  shadow-lg bg-[#A0EAFE] relative flex flex-col overflow-hidden">
        {/* ✅ Fixed Top Header */}
        <div className="flex justify-between items-center text-sm px-4 py-3 bg-[#A0EAFE] z-10">
          <span className="text-green-700 font-bold text-xl">Grow&Show</span>
          <div className="flex space-x-2">
            <FaHeart className="text-green-500" size={30} />
            <FaFacebookMessenger className="text-green-500" size={30} />
          </div>
        </div>

        {/* ✅ Fixed Navigation */}
        <div className="flex justify-around mt-1 mb-2 px-2 text-xs font-medium text-green-700 bg-[#A0EAFE] z-10">
          <div className="flex flex-col items-center justify-center h-16 w-16 bg-[#E6FFE4] rounded-full">
            <FaLeaf className="text-xl" />
            <span>Add Story</span>
          </div>
          <div className="flex flex-col items-center justify-center h-16 w-16 bg-[rgb(230,255,228)] rounded-full">
            <FaLeaf className="text-xl" />
            <span>Stories</span>
          </div>
          <div className="flex flex-col items-center justify-center h-16 w-16 bg-[#E6FFE4] rounded-full">
            <FaLeaf className="text-xl" />
            <span>Stories</span>
          </div>
          <div className="flex flex-col items-center justify-center h-16 w-16 bg-[#E6FFE4] rounded-full">
            <button
              onClick={() => setShowModal(true)}
              className="flex flex-col items-center justify-center h-16 w-16 bg-[#E6FFE4] rounded-full hover:shadow-md transition duration-300"
            >
              <FaPlusCircle className="text-xl text-green-700" />
              <span className="text-xs text-green-800">Add</span>
            </button>
          </div>
        </div>
        {/* ✅ Scrollable Post Section */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 pb-20">
          {posts.map((post) => (
            <Posts
              key={post._id}
              username={post.user?.name || "Unknown"}
              location={post.user?.email || ""}
              image={post.image}
            />
          ))}
        </div>

        {/* ✅ Optional Fixed Bottom Navigation */}

        <div className="absolute bottom-0 left-0 w-full bg-white rounded-b-3xl flex justify-around py-2 border-t border-green-100 z-20">
          {/* <FaLeaf className="text-green-600" size={30} /> */}
          <FaHome className="text-green-600" size={40} />
          <FaUser
            className="text-green-600"
            size={40}
            onClick={handleNavigate}
          />
        </div>
      </div>
      {/* ✅ Modal for Adding New Post */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              Add New Post
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.files[0] })
              }
              className="w-full p-2 border border-green-300 rounded-md mb-3"
            />
            {newPost.image && (
              <img
                src={URL.createObjectURL(newPost.image)}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mb-3"
              />
            )}
            <textarea
              placeholder="Caption"
              value={newPost.caption}
              onChange={(e) =>
                setNewPost({ ...newPost, caption: e.target.value })
              }
              className="w-full p-2 border border-green-300 rounded-md mb-3"
            ></textarea>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAddPost(); // Will define next
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

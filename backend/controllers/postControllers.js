import Post from "../models/Post.js";
import User from "../models/User.js";

/**
 * @desc Create a new post
 * @route POST /api/posts
 * @access Private
 **/
export const createPost = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Image file is required" });
    const { caption } = req.body;
    const post = await Post.create({
        user: req.user._id,
        image: req.file.path,
        caption,
    })
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
  console.error("createPost error:", error);
  return res.status(500).json({ message: "Server error" });
}
};
// get userposts
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ user: userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json(posts);
  } catch (err) {
    console.error("getUserPosts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get all posts (latest first)
 * @route  GET /api/posts
 * @access Public
 */

export const getAllPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email") // only select needed user fields
      .sort({ createdAt: -1 });
// console.log("getAllPosts posts:", posts);
    return res.json(posts);
  } catch (err) {
    console.error("getAllPosts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Like / Unlike a post
 * @route  PATCH /api/posts/:id/like
 * @access Private
 */
export const toggleLikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
      // unlike
      post.likes.pull(userId);
    } else {
      // like
      post.likes.push(userId);
    }

    await post.save();
    return res.json({ likes: post.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error("toggleLikePost error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Add a comment to a post
 * @route  POST /api/posts/:id/comment
 * @access Private
 */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Comment text required" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user._id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    // populate the user field just for the newly added comment
    await post.populate({
      path: "comments.user",
      select: "name email",
    });

    return res.status(201).json(post.comments.at(-1)); // return newest comment
  } catch (err) {
    console.error("addComment error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
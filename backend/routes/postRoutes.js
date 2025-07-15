import { Router } from "express";
import {
  createPost,
  getAllPosts,
  toggleLikePost,
  addComment,
} from "../controllers/postControllers.js";
import { protect } from "../middlewares/authMiddleware.js"; 
import upload from "../middlewares/upload.js";      // <- multer single-file

const router = Router();

// GET /api/posts
router.get("/", getAllPosts);

// POST /api/posts   (image upload + caption)
router.post("/", protect, upload.single("image"), createPost);

// PATCH /api/posts/:id/like
// router.patch("/:id/like", protect, toggleLikePost);

// POST /api/posts/:id/comment
// router.post("/:id/comment", protect, addComment);

export default router;

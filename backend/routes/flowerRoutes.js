import express from "express";
import {
  createFlower,
  getAllFlowers,
  getFlowersFromFollowed,
  likeFlower,
  commentOnFlower,
} from "../controllers/flowerControllers.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/flowers - Upload new flower
router.post("/", protect, createFlower);

// GET /api/flowers - Get all public flowers
router.get("/", protect, getAllFlowers);

// GET /api/flowers/feed - Get flowers from followed users
router.get("/feed", protect, getFlowersFromFollowed);

// PUT /api/flowers/:id/like - Like a flower
router.put("/:id/like", protect, likeFlower);

// POST /api/flowers/:id/comment - Comment on a flower
router.post("/:id/comment", protect, commentOnFlower);

export default router;

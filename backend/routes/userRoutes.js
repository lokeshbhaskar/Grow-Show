import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getUserProfile } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/user-profile',protect,getUserProfile)
// router.get('/all-user',protect,getAllUsers)
export default router;
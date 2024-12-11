import { Router } from "express";
import { authMiddleware } from "../services/auth";
import userRoutes from './user'
import authRoutes from './auth'
import messageRoutes from './messages'  
import miscRoutes from './misc'

const router = Router()
export default router;

router.use('/auth', authRoutes);
router.use('/user', authMiddleware, userRoutes);
router.use('/messages', authMiddleware, messageRoutes)
router.use('/misc', authMiddleware, miscRoutes);
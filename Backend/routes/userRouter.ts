import express, { Router } from 'express';
import {signup,verifyEmail,logout,login,forgotPassword,resetPassword,checkAuth,editProfile} from '../controllers/AuthController';
import verifyToken from '../middleware/verifyToken';
import isInstructor from '../middleware/roleMiddleWare';

const router:Router = express.Router();
router.get('/check-auth',verifyToken,checkAuth)
router.post('/signup',signup);
router.post('/verify-email',verifyEmail);
router.post('/logout',logout);
router.post('/login',login)
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.put("/edit-profile/:userId",verifyToken ,isInstructor, editProfile)

export default router
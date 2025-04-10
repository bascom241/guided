import express from 'express';
import {addToCart, removeFromCart,getCarts} from '../controllers/cartController';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();
router.post('/add-cart/:courseId/:userId',verifyToken,addToCart);
router.delete('/remove-cart/:courseId/:userId',verifyToken,removeFromCart);
router.get('/carts/:userId',getCarts)
export default router;
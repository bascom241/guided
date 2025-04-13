"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.post('/add-cart/:courseId/:userId', verifyToken_1.default, cartController_1.addToCart);
router.delete('/remove-cart/:courseId/:userId', verifyToken_1.default, cartController_1.removeFromCart);
router.get('/carts/:userId', cartController_1.getCarts);
exports.default = router;

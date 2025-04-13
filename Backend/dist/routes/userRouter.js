"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const roleMiddleWare_1 = __importDefault(require("../middleware/roleMiddleWare"));
const router = express_1.default.Router();
router.get('/check-auth', verifyToken_1.default, AuthController_1.checkAuth);
router.post('/signup', AuthController_1.signup);
router.post('/verify-email', AuthController_1.verifyEmail);
router.post('/logout', AuthController_1.logout);
router.post('/login', AuthController_1.login);
router.post('/forgot-password', AuthController_1.forgotPassword);
router.post('/reset-password/:token', AuthController_1.resetPassword);
router.put("/edit-profile/:userId", verifyToken_1.default, roleMiddleWare_1.default, AuthController_1.editProfile);
exports.default = router;

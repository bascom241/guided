"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(404).json({ success: false, message: "Unauthorized User -- No token provided" });
        return;
    }
    // Confirm JWT_SECRET before verifying the token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({ success: false, message: "Incorrect secret in env file" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Unauthorized User -- Invalid Token" });
        return; // Ensure the function ends here
    }
};
exports.default = verifyToken;

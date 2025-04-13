"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.checkAuth = exports.resetPassword = exports.forgotPassword = exports.login = exports.logout = exports.verifyEmail = exports.signup = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateTokenAndSetCookie_1 = __importDefault(require("../utils/generateTokenAndSetCookie"));
const sendEmail_1 = require("../mail/sendEmail");
const crypto_1 = __importDefault(require("crypto"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(404).json({ success: false, message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }
        const isUserExists = yield userSchema_1.default.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        // const hashedToken: string = await bcrypt.hash(verificationToken, 8);
        const userRole = role && role === 'instructor' ? 'instructor' : 'student';
        const user = new userSchema_1.default({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: userRole,
            // confirmPassword,
            verificationToken,
            verificationTokenExpiresDate: Date.now() + 24 * 60 * 60 * 1000
        });
        yield user.save();
        const userObject = user.toObject();
        (0, generateTokenAndSetCookie_1.default)(res, user._id.toString());
        yield (0, sendEmail_1.sendEmail)(user.email, verificationToken, firstName);
        return res.status(201).json({
            success: true, user: Object.assign(Object.assign({}, userObject), { password: undefined })
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    try {
        console.log(code);
        // Find the user based on token and the expiredDate
        const user = yield userSchema_1.default.findOne({
            verificationToken: { $exists: true },
            verificationTokenExpiresDate: { $gte: Date.now() }
        });
        console.log(user);
        if (!user)
            return res.status(404).json({ success: false, message: "User Not Found" });
        const hashedToken = yield bcryptjs_1.default.hash(code, 10);
        user.verificationToken = hashedToken;
        // Compare the given token provided with the hashed token of the use
        const isMatch = yield bcryptjs_1.default.compare(code, user.verificationToken || "");
        console.log(code, user.verificationToken);
        console.log(isMatch);
        if (!isMatch)
            return res.status(404).json({ success: false, message: "Invalid or expired Token" });
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresDate = undefined;
        yield user.save();
        const userObject = user.toObject();
        res.status(200).json({
            success: true, message: "Email Verified sucessfuly", user: Object.assign(Object.assign({}, userObject), { password: undefined })
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
    }
});
exports.verifyEmail = verifyEmail;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});
exports.logout = logout;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });
        const isPassword = yield bcryptjs_1.default.compare(password, user.password || "");
        if (!isPassword)
            return res.status(404).json({ success: false, message: "Invalid Password" });
        (0, generateTokenAndSetCookie_1.default)(res, user._id.toString());
        user.lastLogin = new Date();
        yield user.save();
        const userObject = user.toObject();
        res.status(200).json({
            success: true, message: "Logged In successfully", user: Object.assign(Object.assign({}, userObject), { password: undefined })
        });
    }
    catch (err) {
        console.log(err);
        res.status(200).json({ success: false, message: err });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ success: false, message: "User Not Found" });
        // Generate a token for the forgot password 
        const resetPasswordToken = crypto_1.default.randomBytes(20).toString("hex");
        const resetPasswordExpiresDate = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresDate = resetPasswordExpiresDate;
        yield user.save();
        yield (0, sendEmail_1.sendPasswordResetEmail)(email, user.firstName, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);
        res.status(200).json({ success: true, message: "Reset Password email sent successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = yield userSchema_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresDate: { $gte: Date.now() }
        });
        if (!user)
            return res.status(404).json({ success: false, message: "Invalid / Expired Token" });
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresDate = undefined;
        yield user.save();
        yield (0, sendEmail_1.sendResetSuccessfullEmail)(user.email);
        res.status(200).json({ success: true, message: "Password reset successfully" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
exports.resetPassword = resetPassword;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.findById(req.userId).select("-password");
        if (!user) {
            res.status(401).json({ success: false, message: "User NOT found" });
            return;
        }
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
exports.checkAuth = checkAuth;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { firstName, lastName, biography } = req.body;
        if (req.body.email || req.body.password) {
            res.status(401).json({ message: "Email or password cannot be updated here" });
            return;
        }
        const user = yield userSchema_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.biography = biography || user.biography;
        const updatedUser = yield user.save();
        res.status(200).json({ updatedUser, message: "User Profile updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.editProfile = editProfile;

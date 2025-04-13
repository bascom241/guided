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
exports.getCarts = exports.removeFromCart = exports.addToCart = void 0;
const courseCartSchema_1 = __importDefault(require("../models/courseCartSchema"));
const courseSchema_1 = __importDefault(require("../models/courseSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.params;
    try {
        const course = yield courseSchema_1.default.findById(courseId);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        const cart = yield courseCartSchema_1.default.findOne({ userId });
        let addedCourse = {
            courseId: course._id,
            tittle: course.tittle,
            price: course.price,
            thumbnail: course.thumbnail,
            duration: course.duration,
            level: course.level
        };
        if (cart) {
            const existingCourse = cart.courses.find(c => c.courseId.toString() === courseId);
            if (existingCourse) {
                res.status(400).json({ message: "Course already exists in the Cart" });
                return;
            }
            cart.courses.push(addedCourse);
            yield cart.save();
        }
        else {
            const newCart = new courseCartSchema_1.default({
                userId,
                courses: [
                    {
                        courseId: course._id,
                        tittle: course.tittle,
                        price: course.price,
                        thumbnail: course.thumbnail,
                        duration: course.duration,
                        level: course.level
                    }
                ]
            });
            yield newCart.save();
        }
        res.status(200).json({ addedCourse, message: 'Course added to cart' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding course to cart', error });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, userId } = req.params;
    try {
        const result = yield courseCartSchema_1.default.updateOne({ userId }, { $pull: { courses: { courseId } } });
        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: 'Course removed from cart' });
            return;
        }
        else {
            res.status(404).json({ success: false, message: 'Course not found in cart' });
            return;
        }
    }
    catch (error) {
        console.error("Error removing course from cart:", error);
        res.status(500).json({ message: "Error removing course from cart", error });
    }
});
exports.removeFromCart = removeFromCart;
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log("Received userId:", userId);
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const carts = yield courseCartSchema_1.default.find({ userId: new mongoose_1.default.Types.ObjectId(userId) });
        if (!carts) {
            res.status(404).json({ message: "Carts not Found" });
        }
        res.status(200).json({ carts });
    }
    catch (err) {
        // console.log(err)
        res.status(500).json({ message: "Error " + err });
    }
});
exports.getCarts = getCarts;

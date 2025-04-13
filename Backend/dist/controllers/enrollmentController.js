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
exports.getSingleEnrolledCourse = exports.getAllEnrolledCourses = exports.verifyPayment = exports.enrollStudent = void 0;
const courseSchema_1 = __importDefault(require("../models/courseSchema"));
const enrollMentSchema_1 = __importDefault(require("../models/enrollMentSchema"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const courseCartSchema_1 = __importDefault(require("../models/courseCartSchema"));
dotenv_1.default.config();
const PAYSTACK_KEY = process.env.PAYSTACK_API_KEY;
const enrollStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, amount } = req.body;
        const { userId, courseIds } = req.params;
        console.log("userId", userId);
        console.log("courseIds", courseIds);
        console.log("email", email);
        console.log("amount", amount);
        if (!userId || !courseIds) {
            res.status(400).json({ message: "userId and courseIds are required" });
            return;
        }
        const courseIDArray = courseIds.split(",");
        const enrollments = [];
        const failedCourses = [];
        const authorizationUrls = [];
        for (const courseId of courseIDArray) {
            const course = yield courseSchema_1.default.findById(courseId);
            if (!course) {
                failedCourses.push({ courseId, error: "Course not found" });
                continue;
            }
            const existingEnrollment = yield enrollMentSchema_1.default.findOne({ courseId, userId });
            if (existingEnrollment) {
                failedCourses.push({ courseId, error: "Already enrolled" });
                continue;
            }
            // Create new enrollment
            const newEnrollment = new enrollMentSchema_1.default({ courseId, userId });
            yield newEnrollment.save();
            enrollments.push(newEnrollment);
            // Payment processing
            const data = {
                email,
                amount: amount * 100,
                reference: `enroll_${newEnrollment._id}`,
                callback_url: 'http://localhost:5000/api/enroll/payment-success'
            };
            const response = yield axios_1.default.post("https://api.paystack.co/transaction/initialize", data, {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_KEY}`
                }
            });
            // Save payment reference
            newEnrollment.paymentReference = response.data.data.reference;
            yield newEnrollment.save();
            // Update user's enrolled courses
            yield userSchema_1.default.findByIdAndUpdate(userId, {
                $addToSet: { enrolledCourses: courseId }
            });
            // Collect authorization URL
            authorizationUrls.push({
                courseId,
                authorization_url: response.data.data.authorization_url
            });
        }
        res.json({
            enrollments,
            failedCourses,
            authorizationUrls
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
exports.enrollStudent = enrollStudent;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reference } = req.query;
    if (!reference) {
        res.status(404).json({ message: "reference or status not found " });
        return;
    }
    try {
        const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_KEY}`
            }
        });
        const paymentData = response.data.data;
        if (paymentData.status === 'success') {
            // Find all enrollments that match the given payment reference
            const enrollments = yield enrollMentSchema_1.default.find({ paymentReference: reference });
            if (enrollments && enrollments.length > 0) {
                // Update each enrollment to "paid"
                for (const enrollment of enrollments) {
                    enrollment.status = "paid";
                    yield enrollment.save();
                    // Update user's enrolled courses for each enrollment (if not already added)
                    yield userSchema_1.default.findByIdAndUpdate(enrollment.userId, {
                        $addToSet: { enrolledCourses: enrollment.courseId }
                    });
                }
                yield courseCartSchema_1.default.findByIdAndDelete(enrollments[0].userId, { courses: [] });
                res.redirect(`http://localhost:5173/payment-success?reference=${reference}`);
                return;
            }
            else {
                res.status(404).json({ message: 'Enrollment not found for this reference' });
                return;
            }
        }
        else {
            res.status(400).json({ message: 'Payment failed or invalid status' });
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error verifying payment' });
        return;
    }
});
exports.verifyPayment = verifyPayment;
const getAllEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userId } = req.params;
        userId = userId.trim();
        const user = yield userSchema_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const paidEnrolledCourses = yield enrollMentSchema_1.default.find({ userId, status: "paid" });
        if (!paidEnrolledCourses.length) {
            res.status(200).json({ message: "No paid enrolled courses available", courses: [] });
            return;
        }
        const enrolledCousesIds = paidEnrolledCourses.map(enrollment => enrollment.courseId);
        // Fetch the enrolled courses
        const courses = yield courseSchema_1.default.find({ _id: { $in: enrolledCousesIds } })
            .populate("instructor", "firstName lastName") // Populate instructor details
            .select("tittle description videos.tittle videos.videoFilePath");
        res.status(200).json({ courses });
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error retrieving enrolled courses" });
    }
});
exports.getAllEnrolledCourses = getAllEnrolledCourses;
const getSingleEnrolledCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            res.status(404).json({ message: "user or course not found" });
        }
        const enrollment = yield enrollMentSchema_1.default.findOne({ userId, courseId, status: "paid" });
        if (!enrollment) {
            res.status(404).json({ message: "User has not enrolled in this course or payment is pending" });
            return;
        }
        const course = yield courseSchema_1.default.findById(courseId).populate("instructor", "firstName lastName") // Populate instructor details
            .select("tittle description videos.tittle videos.videoFilePath");
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json({ course });
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error retrieving course details" });
    }
});
exports.getSingleEnrolledCourse = getSingleEnrolledCourse;

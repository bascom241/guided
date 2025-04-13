"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const enrollmentController_1 = require("../controllers/enrollmentController");
router.post("/enroll-student/:userId/:courseIds", enrollmentController_1.enrollStudent);
router.get("/payment-success", enrollmentController_1.verifyPayment);
router.get("/enrolled-courses/:userId", enrollmentController_1.getAllEnrolledCourses);
router.get("/enrolled-single-course/:userId/:courseId", enrollmentController_1.getSingleEnrolledCourse);
exports.default = router;

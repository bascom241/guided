"use strict";
// routes/courseRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerMiddleWare_1 = require("../middleware/multerMiddleWare"); // Import the upload middleware
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const roleMiddleWare_1 = __importDefault(require("../middleware/roleMiddleWare"));
const courseController_1 = require("../controllers/courseController");
const router = express_1.default.Router();
// Add the upload middleware for handling files (thumbnail, videos)
router.post('/upload-course/:userId', verifyToken_1.default, // Middleware to verify the token and add userId to req
roleMiddleWare_1.default, multerMiddleWare_1.upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // Expect a single thumbnail file
    { name: 'videos', maxCount: 5 }, // Expect multiple videos, adjust maxCount as needed
]), (req, res) => (0, courseController_1.uploadFilesAndCreateCourse)(req, res) // Type assertion here
);
router.get("/get-courses", courseController_1.getAllCourses);
router.put("/update-course/:courseId/:userId", multerMiddleWare_1.upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // Expect a single thumbnail file
    { name: 'videos', maxCount: 50 }, // Expect multiple videos, adjust maxCount as needed
]), (req, res) => (0, courseController_1.updateCourse)(req, res));
router.delete("/delete-course/:courseId/:userId", verifyToken_1.default, courseController_1.deleteCourse);
router.get("/get-single-course/:courseId", courseController_1.getASingleCourse);
router.get("/get-instructor-courses/:userId", verifyToken_1.default, roleMiddleWare_1.default, courseController_1.getAllInstructorCourses);
router.get('/categories', courseController_1.getCategories);
router.post("/rate/:courseId", courseController_1.addRating);
router.post("/comment/:courseId", courseController_1.addComment);
exports.default = router;

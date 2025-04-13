"use strict";
// controllers/courseController.ts
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
exports.addComment = exports.addRating = exports.getCategories = exports.getAllInstructorCourses = exports.getASingleCourse = exports.deleteCourse = exports.updateCourse = exports.getAllCourses = exports.uploadFilesAndCreateCourse = void 0;
const multerMiddleWare_1 = require("../middleware/multerMiddleWare");
const courseSchema_1 = __importDefault(require("../models/courseSchema"));
const categoiers_1 = require("../Constants/categoiers");
const uploadFilesAndCreateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { thumbnail, videos } = req.files || {};
    const { tittle, description, category, subCategory, level } = req.body;
    // Validate Categories //
    if (!(category in categoiers_1.categories)) {
        res.status(404).json({ message: "Invalid Category" });
        return;
    }
    // Validate Sub Categories //
    if (subCategory && !categoiers_1.categories[category].includes(subCategory)) {
        res.status(400).json({ error: 'Invalid subcategory for the selected category' });
        return;
    }
    // Convert duration and price to numbers
    const duration = Number(req.body.duration);
    const price = Number(req.body.price);
    // Validate if conversion was successful
    if (isNaN(duration) || isNaN(price)) {
        res.status(400).json({ error: "Invalid duration or price" });
        return;
    }
    if (!thumbnail || thumbnail.length === 0 || !videos || videos.length === 0) {
        res.status(400).json({ error: 'Thumbnail and videos are required' });
        return;
    }
    if (!userId) {
        res.status(403).json({ message: "User Not Found" });
        return;
    }
    console.log('Files:', req.files);
    console.log('Uploading Thumbnail:', { buffer: thumbnail[0].buffer, folder: 'guided/thumbnails', type: 'image' });
    console.log('Uploading Video:', { buffer: videos[0].buffer, folder: 'guided/videos', type: 'video' });
    try {
        const thumbnailUpload = yield (0, multerMiddleWare_1.uploadToCloudinary)(thumbnail[0].buffer, 'guided/thumbnails', 'image');
        if (!(thumbnailUpload === null || thumbnailUpload === void 0 ? void 0 : thumbnailUpload.secure_url)) {
            res.status(500).json({ error: "Thumbnail upload failed" });
            return;
        }
        const videoDetails = JSON.parse(req.body.videoDetails || '[]');
        const videoData = yield Promise.all(videos.map((v, index) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            const videoUpload = yield (0, multerMiddleWare_1.uploadToCloudinary)(v.buffer, 'guided/videos', 'video');
            return {
                tittle: ((_a = videoDetails[index]) === null || _a === void 0 ? void 0 : _a.tittle) || v.originalname,
                videoFilePath: videoUpload.secure_url,
                duration: (_b = videoDetails[index]) === null || _b === void 0 ? void 0 : _b.duration,
                description: (_c = videoDetails[index]) === null || _c === void 0 ? void 0 : _c.description,
            };
        })));
        const newCourse = new courseSchema_1.default({
            tittle,
            description,
            duration,
            category,
            subCategory,
            price,
            level,
            instructor: userId,
            thumbnail: thumbnailUpload.secure_url,
            videos: videoData, // Store video data in the appropriate format
        });
        yield newCourse.save();
        // Respond with success message and the created course
        res.status(201).json({
            message: 'Course created successfully!',
            course: newCourse,
        });
    }
    catch (error) {
        console.error('Error uploading files and creating course:', error);
        console.log(error);
        res.status(500).json({ error: 'File upload or course creation failed' });
    }
});
exports.uploadFilesAndCreateCourse = uploadFilesAndCreateCourse;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Build Query
    // 1 Filtering 
    const newQuery = Object.assign({}, req.query);
    const exludedQueries = ["page", "sort", "limit", "fields"];
    exludedQueries.forEach(el => delete newQuery[el]);
    //2 Advanced Filtering
    let queryString = JSON.stringify(newQuery);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const filters = JSON.parse(queryString);
    try {
        // Execute Query //
        let query = courseSchema_1.default.find(filters).populate("instructor", "firstName lastName email").select("-videos");
        // Sorting
        if (typeof req.query.sort === "string") {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }
        if (typeof req.query.fields === "string") {
            const fields = req.query.fields.split("").join(" ");
            query = query.select(fields);
        }
        else {
            query = query.select("-_v");
        }
        // 3 Field Limiting
        const courses = yield query;
        if (!courses) {
            res.status(500).json({ message: "Courses not found" });
            return;
        }
        res.status(200).json({ succcess: true, data: courses });
    }
    catch (err) {
        // console.log(err)
        res.status(500).json({ message: "Error Fetch Courses" });
    }
});
exports.getAllCourses = getAllCourses;
const getMyCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
    }
    catch (_a) {
    }
});
const getASingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const course = yield courseSchema_1.default.findById(courseId)
            .populate("instructor", "firstName lastName email biography courses")
            .select("-__v") // Exclude unnecessary fields
            .lean(); // Convert Mongoose document to a plain object
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        // Compute average ratings
        const totalRatings = course === null || course === void 0 ? void 0 : course.ratings.length;
        const sumRatings = (course === null || course === void 0 ? void 0 : course.ratings.reduce((sum, r) => sum + r.rating, 0)) || 0;
        const avgRatings = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;
        // Limit videos to only 3
        course.videos = course.videos.slice(0, 3);
        res.status(200).json({ success: true, data: Object.assign(Object.assign({}, course), { avgRatings }) });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error Fetching Course" });
    }
});
exports.getASingleCourse = getASingleCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { userId } = req.params;
    const { thumbnail, videos } = req.files || {};
    const { tittle, description, duration, category, price, level } = req.body;
    try {
        const course = yield courseSchema_1.default.findById(courseId);
        if (!course) {
            res.status(401).json({ message: "Course Not Found" });
        }
        // Check if the user is an instructor before updating a course 
        if ((course === null || course === void 0 ? void 0 : course.instructor.toString()) !== userId) {
            res.status(401).json({ message: "Only Course Instrutor can update his/her course" });
            return;
        }
        if (course) {
            if (tittle)
                course.tittle = tittle;
            if (description)
                course.description = description;
            if (duration)
                course.duration = duration;
            if (category)
                course.category = category;
            if (price)
                course.price = price;
            if (level)
                course.level = level;
        }
        if (thumbnail && thumbnail.length > 0) {
            const thumbnailUpload = yield (0, multerMiddleWare_1.uploadToCloudinary)(thumbnail[0].buffer, 'guided/thumbnails', 'image');
            if (course)
                course.thumbnail = thumbnailUpload.secure_url;
        }
        if (videos && videos.length > 0) {
            const videoData = yield Promise.all(videos.map((v) => __awaiter(void 0, void 0, void 0, function* () {
                const videoUpload = yield (0, multerMiddleWare_1.uploadToCloudinary)(v.buffer, 'guided/videos', 'video');
                return {
                    tittle: v.originalname, // Using the original file name as the title
                    videoFilePath: videoUpload.secure_url, // Cloudinary URL
                    duration: undefined, // Optional field, set as needed
                    description: undefined,
                };
            })));
            if (course) {
                course.videos = [...course.videos, ...videoData];
            }
        }
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(200).json({ message: 'Course updated successfully', course });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Error updating course', error });
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.params;
    try {
        const course = yield courseSchema_1.default.findById(courseId);
        if (!course) {
            res.status(401).json({ message: "Course Not Found" });
        }
        // Check if the user is an instructor before updating a course 
        if ((course === null || course === void 0 ? void 0 : course.instructor.toString()) !== userId) {
            res.status(401).json({ message: "Only Course Instrutor can update his/her course" });
            return;
        }
        // Delete the course
        yield course.deleteOne();
        // Respond with success
        res.status(200).json({ message: "Course deleted successfully", course });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to delete the course", error });
    }
});
exports.deleteCourse = deleteCourse;
const getAllInstructorCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const courses = yield courseSchema_1.default.find({ instructor: userId });
        if (!courses) {
            res.status(404).json({ message: "No courses Found Yet" });
        }
        res.status(200).json({ courses });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
});
exports.getAllInstructorCourses = getAllInstructorCourses;
const getCategories = (req, res) => {
    try {
        res.status(200).json({ categories: categoiers_1.categories });
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getCategories = getCategories;
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { userId, rating } = req.body;
    try {
        const course = yield courseSchema_1.default.findById(courseId);
        const existingRating = course === null || course === void 0 ? void 0 : course.ratings.find(rating => rating.userId === userId);
        if (existingRating) {
            res.status(404).json({ message: "You have already Rate this Course" });
            return;
        }
        const updateCourse = yield courseSchema_1.default.findByIdAndUpdate(courseId, {
            $push: {
                ratings: {
                    userId, rating
                }
            }
        }, { new: true });
        if (!updateCourse) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json({ message: "Course Rated Successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.addRating = addRating;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const { userId, comment } = req.body;
        const course = yield courseSchema_1.default.findById(courseId);
        const existingComment = course === null || course === void 0 ? void 0 : course.comments.find(comment => comment.userId === userId);
        if (existingComment) {
            res.status(400).json({ message: "You have added a comment already" });
        }
        const updateCourse = yield courseSchema_1.default.findByIdAndUpdate(courseId, {
            $push: {
                comments: {
                    userId, comment
                }
            }
        });
        if (!updateCourse) {
            res.status(404).json({ message: "Course not Found" });
            return;
        }
        res.status(200).json({ message: "Comment Added" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.addComment = addComment;

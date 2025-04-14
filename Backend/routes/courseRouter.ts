// routes/courseRoutes.ts

import express, { Router } from "express";
import { upload } from "../middleware/multerMiddleWare";  // Import the upload middleware
import verifyToken from "../middleware/verifyToken";
import isInstructor from "../middleware/roleMiddleWare";
import { uploadFilesAndCreateCourse,getAllCourses,updateCourse,deleteCourse,getASingleCourse,getAllInstructorCourses,getCategories,addRating,addComment} from "../controllers/courseController";
import { CustomRequest } from "../controllers/courseController";
const router: Router = express.Router();

// Add the upload middleware for handling files (thumbnail, videos)
router.post(
  '/upload-course/:userId',
  verifyToken, // Middleware to verify the token and add userId to req
  isInstructor, 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // Expect a single thumbnail file
    { name: 'videos', maxCount: 5 }, // Expect multiple videos, adjust maxCount as needed
  ]),
  (req, res) => uploadFilesAndCreateCourse(req as CustomRequest, res) // Type assertion here
);

router.get("/get-courses", getAllCourses);
router.put("/update-course/:courseId/:userId",verifyToken,  upload.fields([
  { name: 'thumbnail', maxCount: 1 }, // Expect a single thumbnail file
  { name: 'videos', maxCount: 50 }, // Expect multiple videos, adjust maxCount as needed
]),(req,res)=> updateCourse(req as CustomRequest,res));
router.delete("/delete-course/:courseId/:userId",verifyToken,deleteCourse);
router.get("/get-single-course/:courseId",getASingleCourse);
router.get("/get-instructor-courses/:userId",isInstructor,getAllInstructorCourses)
router.get('/categories', getCategories);
router.post("/rate/:courseId",addRating);
router.post("/comment/:courseId",addComment);


export default router;

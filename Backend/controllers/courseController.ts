// controllers/courseController.ts

import { Request, Response } from 'express';
import { uploadToCloudinary } from '../middleware/multerMiddleWare';
import Course from '../models/courseSchema';
import { categories,CategoryType,SubCategoryType } from '../Constants/categoiers';

interface multerFile {
  buffer: Buffer;
  originalName: string
}

export interface CustomRequest extends Request {
  userId?: string;
  files?: { [fieldname: string]: Express.Multer.File[] } | undefined;
  body: {
    tittle: string;
    description: string;
    duration: number;
    category: string;
    subCategory?: string;
    price: number;
    level: string;
    videoDetails?: string; 
  }
}

type Video = {
  tittle: string;
  videoFilePath: string;
  duration?: number;
  description?: string;
};

const uploadFilesAndCreateCourse = async (req: CustomRequest, res: Response): Promise<void> => {

  const { userId } = req.params
  const { thumbnail, videos } = req.files || {};
  const { tittle, description, category, subCategory, level } = req.body;

// Validate Categories //

if(!(category in categories)){
  res.status(404).json({message:"Invalid Category"})
  return;
}

// Validate Sub Categories //
if(subCategory && !(categories[category as CategoryType] as SubCategoryType[]).includes(subCategory as SubCategoryType)){
  res.status(400).json({ error: 'Invalid subcategory for the selected category' });
  return;
}


  // Convert duration and price to numbers
  const duration = Number(req.body.duration);
  const price = Number(req.body.price);

  // Validate if conversion was successful
  if (isNaN(duration) || isNaN(price)) {
    res.status(400).json({ error: "Invalid duration or price" });
    return
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
    const thumbnailUpload = await uploadToCloudinary(
      thumbnail[0].buffer,
      'guided/thumbnails',
      'image'
    );

    if (!thumbnailUpload?.secure_url) {
      res.status(500).json({ error: "Thumbnail upload failed" });
      return;
    }

    const videoDetails = JSON.parse(req.body.videoDetails || '[]');

    const videoData: Video[] = await Promise.all(
      videos.map(async (v, index) => {
        const videoUpload = await uploadToCloudinary(
          v.buffer,
          'guided/videos',
          'video'
        );

        return {
          tittle: videoDetails[index]?.tittle || v.originalname,
          videoFilePath: videoUpload.secure_url,
          duration: videoDetails[index]?.duration,
          description: videoDetails[index]?.description,
        };
      })
    );



    const newCourse = new Course({
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

    await newCourse.save();

    // Respond with success message and the created course
    res.status(201).json({
      message: 'Course created successfully!',
      course: newCourse,
    });
  } catch (error) {
    console.error('Error uploading files and creating course:', error);
    console.log(error)
    res.status(500).json({ error: 'File upload or course creation failed' });
  }
};




const getAllCourses = async (req: Request, res: Response) => {

  // Build Query

  // 1 Filtering 
  const newQuery = {...req.query};
  const exludedQueries = ["page","sort","limit","fields"];
  exludedQueries.forEach(el=>  delete newQuery[el]);

  //2 Advanced Filtering
  let queryString = JSON.stringify(newQuery);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
  const filters = JSON.parse(queryString);
  try {

    // Execute Query //
    let query =  Course.find(filters).populate("instructor", "firstName lastName email").select("-videos");

    // Sorting
    if(typeof req.query.sort=== "string"){
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    if(typeof req.query.fields === "string"){
      const fields = req.query.fields.split("").join(" ");
      query = query.select(fields);
    }else{
      query = query.select("-_v")
    }
    // 3 Field Limiting
    const courses = await query;
    if (!courses) {
      res.status(500).json({ message: "Courses not found" })
      return
    }
    res.status(200).json({ succcess: true, data: courses })
  } catch (err) {
    // console.log(err)
    res.status(500).json({ message: "Error Fetch Courses" })
  }
}

const getMyCourses = async (req:Request, res:Response) => {
  const {userId} = req.params;
  try{
    
  }catch{

  }
}

const getASingleCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId)
      .populate("instructor", "firstName lastName email biography courses")
      .select("-__v") // Exclude unnecessary fields
      .lean(); // Convert Mongoose document to a plain object

    if (!course) {
    res.status(404).json({ message: "Course not found" });
    return
    }

    // Compute average ratings
    const totalRatings = course?.ratings.length;
    const sumRatings = course?.ratings.reduce((sum, r) => sum + r.rating, 0) || 0;
    const avgRatings = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;

    // Limit videos to only 3
    course.videos = course.videos.slice(0, 3);

    res.status(200).json({ success: true, data: { ...course, avgRatings } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Course" });
  }
};


const updateCourse = async (req: CustomRequest, res: Response): Promise<void> => {
  const { courseId } = req.params;
  const { userId } = req.params;
  const { thumbnail, videos } = req.files || {};
  const { tittle, description, duration, category, price, level } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(401).json({ message: "Course Not Found" })
    }

    // Check if the user is an instructor before updating a course 

    if (course?.instructor.toString() !== userId) {
      res.status(401).json({ message: "Only Course Instrutor can update his/her course" })
      return;
    }

    if (course) {
      if (tittle) course.tittle = tittle;
      if (description) course.description = description;
      if (duration) course.duration = duration;
      if (category) course.category = category;
      if (price) course.price = price;
      if (level) course.level = level;
    }


    if (thumbnail && thumbnail.length > 0) {
      const thumbnailUpload = await uploadToCloudinary(
        thumbnail[0].buffer,
        'guided/thumbnails',
        'image'
      );
      if (course)
        course.thumbnail = thumbnailUpload.secure_url
    }


    if (videos && videos.length > 0) {

      const videoData = await Promise.all(
        videos.map(async (v) => {
          const videoUpload = await uploadToCloudinary(v.buffer, 'guided/videos',
            'video')
          return {
            tittle: v.originalname, // Using the original file name as the title
            videoFilePath: videoUpload.secure_url, // Cloudinary URL
            duration: undefined, // Optional field, set as needed
            description: undefined,
          }
        })
      )
      if (course) {
        course.videos = [...course.videos, ...videoData]
      }

    }

    await course?.save();
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course', error });
  }
}


const deleteCourse = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(401).json({ message: "Course Not Found" })
    }

    // Check if the user is an instructor before updating a course 

    if (course?.instructor.toString() !== userId) {
      res.status(401).json({ message: "Only Course Instrutor can update his/her course" })
      return;
    }

    // Delete the course
    await course.deleteOne();

    // Respond with success
    res.status(200).json({ message: "Course deleted successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while trying to delete the course", error });
  }

}

const getAllInstructorCourses = async (req:Request<{userId:string}>,res:Response) => {
  try{
    const {userId} = req.params;
    const courses = await Course.find({instructor:userId});
    if(!courses){
      res.status(404).json({message:"No courses Found Yet"})
    }
    res.status(200).json({courses});
  }catch(err){
    console.log(err);
    res.status(404).json({message:err}) 
  }
}


const getCategories = (req:Request,res:Response) =>{
  try {
    res.status(200).json({categories});
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

const addRating = async (req:Request,res:Response) =>{
  const {courseId} = req.params;
  const {userId,rating} = req.body;
  try{
    const course = await Course.findById(courseId);
    const existingRating = course?.ratings.find(rating => rating.userId === userId);
    if(existingRating){
      res.status(404).json({message:"You have already Rate this Course"})
      return
    }

    const updateCourse = await Course.findByIdAndUpdate(courseId,{
      $push:{
        ratings:{
          userId,rating
        }
      }
    },{new:true})
    if(!updateCourse){
      res.status(404).json({message:"Course not found"});
      return
    }
    res.status(200).json({message:"Course Rated Successfully"})

  }catch(err){
    res.status(500).json({message:err})
  }
}

const addComment = async (req:Request,res:Response)=>{
  try {
      const {courseId} = req.params;
      const {userId,comment} = req.body;
      
      const course = await Course.findById(courseId);
      const existingComment = course?.comments.find(comment => comment.userId === userId);

      if(existingComment) {
        res.status(400).json({message:"You have added a comment already"})
      }

      const updateCourse = await Course.findByIdAndUpdate(courseId,{
        $push:{
          comments:{
            userId, comment
          }
        }
      })
      
      if(!updateCourse) {
        res.status(404).json({message:"Course not Found"})
        return
      }
      res.status(200).json({message:"Comment Added"})
  } catch (err) {
    res.status(500).json({message:err})
  }
}



export { uploadFilesAndCreateCourse, getAllCourses, updateCourse, deleteCourse, getASingleCourse, getAllInstructorCourses,getCategories,addRating, addComment };

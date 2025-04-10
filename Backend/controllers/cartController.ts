import Cart from "../models/courseCartSchema";
import Course from "../models/courseSchema";
import { Request, Response } from "express";
import mongoose from "mongoose";

const addToCart = async (req: Request, res: Response) => {
    const { userId, courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }

        const cart = await Cart.findOne({ userId });

        let addedCourse = {
            courseId: course._id as mongoose.Types.ObjectId,
            tittle: course.tittle,
            price: course.price,
            thumbnail: course.thumbnail,
            duration:course.duration,
            level:course.level
        }
        if (cart) {
            const existingCourse = cart.courses.find(c => c.courseId.toString() === courseId);
            if (existingCourse) {
                res.status(400).json({ message: "Course already exists in the Cart" });
                return;
            }
            cart.courses.push(addedCourse)
            await cart.save();
        } else {
            const newCart = new Cart({
                userId,
                courses: [
                    {
                        courseId: course._id,
                        tittle: course.tittle,
                        price: course.price,
                        thumbnail: course.thumbnail,
                        duration:course.duration,
                        level:course.level
                    }
                ]
            })
            await newCart.save();
         
        }

        res.status(200).json({addedCourse,message: 'Course added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course to cart', error });
    }
}

const removeFromCart = async (req: Request, res: Response) => {
    const { courseId, userId } = req.params;

    try {
       
        const result = await Cart.updateOne(
            { userId }, 
            { $pull: { courses: { courseId } } }
        );

        if (result.modifiedCount > 0) {
          res.status(200).json({ success: true, message: 'Course removed from cart' });
          return 
        } else {
            res.status(404).json({ success: false, message: 'Course not found in cart' });
            return
        }
    } catch (error) {
        console.error("Error removing course from cart:", error);
        res.status(500).json({ message: "Error removing course from cart", error });
    }
};

const getCarts = async (req: Request, res: Response) => {
    try {
   
        const { userId } = req.params
        console.log("Received userId:", userId);  
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return
        }

        const carts = await Cart.find({ userId: new mongoose.Types.ObjectId(userId) });
        if (!carts) {
            res.status(404).json({ message: "Carts not Found" })
        }
        res.status(200).json({ carts })
    } catch (err) {
        // console.log(err)
        res.status(500).json({ message: "Error " + err })
    }
}


export { addToCart, removeFromCart, getCarts };
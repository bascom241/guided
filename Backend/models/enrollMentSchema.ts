import mongoose,{Schema} from "mongoose";

interface IEnrollment extends Document {
    userId:mongoose.Types.ObjectId
    courseId:mongoose.Types.ObjectId
    status:"pending" | "paid"
    paymentReference:string
}

const enrollMentSchema = new Schema<IEnrollment>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true, "Usert ID is Required"]
    },courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:[true, "courseId is required"]
    },
    status:{
        type:String,
        enum:["pending" , "paid"],
        default:"pending",
   

    },
    paymentReference:String
})


const Enrollment = mongoose.model<IEnrollment>("Enrollment", enrollMentSchema);
export default Enrollment;
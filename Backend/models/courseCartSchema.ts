import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

interface Course {
    courseId:mongoose.Types.ObjectId ;
    tittle: String,
    price: Number,
    thumbnail: String,
}


interface CartDocument extends Document {
    userId: mongoose.Types.ObjectId;
    courses: Course[];
}

const cartSchema = new Schema<CartDocument>({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    courses:[
        {
            courseId:{ type:mongoose.Schema.ObjectId,ref:"Course",required:true},
            tittle: String,
            price: Number,
            thumbnail: String,
            duration:Number,
            level:String
        }
    ]
});

const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
export default Cart;
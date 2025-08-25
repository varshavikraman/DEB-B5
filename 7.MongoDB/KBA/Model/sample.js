import { Schema} from "mongoose";
import {model}  from "mongoose"

const demo = new Schema({
    FirstName :String,
    LastName : String,
    UserName: {type:String,required:true,unique:true},
    Password: String, 
    UserRole : {type :String,enum:['admin','user'],required:true}
});
const Sample= model('sample',demo)


const  demo2 =  new Schema ({
    CourseName :String,
    CourseId: {type: String ,required:true, unique: true },
    CourseType : String,
    Description :  String,
    Price : {type : Number , required: true},
    image:String

});
const course = model('course', demo2)

const cartItemSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course', 
        required: true
    }
});

const cartSchema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    items: [cartItemSchema],
    addedAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = model('cart', cartSchema);

export {Sample ,course, Cart};
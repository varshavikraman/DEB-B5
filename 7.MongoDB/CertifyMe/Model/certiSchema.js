import { Schema} from "mongoose";
import {model}  from "mongoose"

const certiSchema = new Schema({
    course:{type:String,required:true},
    certificateId:{type:String,required:true,unique:true},
    candidateName:{type:String,required:true},
    grade:{type:String,required:true},
    issueDate:{ type: Date, default: Date.now },
});

const certificate = model('Certificate',certiSchema);

export {certificate}
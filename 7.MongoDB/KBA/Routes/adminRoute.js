import { Router } from "express";
import { authenticate } from "../MiddleWare/auth.js";
import adminCheck from "../MiddleWare/adminAuth.js";
import {course} from "../Model/sample.js"
import upload from "../MiddleWare/upload.js";

const admin = Router();

const convertToBase64 = (buffer)=>{
    return buffer.toString("base64");
};

admin.post('/addCourse',upload.single("CourseImage") ,async(req,res)=>{
    try {
        const { CourseName,CourseId,CourseType,Description,Price } = req.body;

        const result = await course.findOne({CourseName:CourseName});

            if(result){
                res.status(400).json({msg :`${CourseName} already exist`});
            } else {
                let imageBase64 = null;
                if (req.file) {
                    //convert the image buffer to Base64 string
                    imageBase64 = convertToBase64(req.file.buffer);
                }
                const newCourse = new course({
                    CourseName : CourseName,
                    CourseId : CourseId,
                    CourseType : CourseType,
                    Description : Description,
                    Price : Price,
                    image:imageBase64
                }); 

                await newCourse.save();

                res.status(201).json({msg: `${CourseName} added successfully`, data:newCourse })
            }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({error: 'Internal Server Error'});
    }    
});

// admin.put('/updateCourse', async(req,res)=>{
//     try {
//         const { CourseName,CourseId,CourseType,Description,Price } = req.body;

//         const result = await course.findOne({CourseName:CourseName});
//         if (result) {
//             await course.updateOne({
//                 CourseName : CourseName,
//                 CourseId : CourseId,
//                 CourseType : CourseType,
//                 Description : Description,
//                 Price : Price
//             });
//             res.status(201).json({msg:'course successfully updated'})
//         } else {
//             res.status(404).json({msg:'course not found' })
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

admin.put('/updateCourse', async(req,res)=>{
    try {
        const { CourseName,CourseId,CourseType,Description,Price } = req.body;

        const result = await course.findOne({CourseName:CourseName});
        if (result) {
            result.CourseName = CourseName,
            result.CourseId = CourseId,
            result.CourseType = CourseType,
            result.Description = Description,
            result.Price = Price
            
            await result.save();
            res.status(201).json({msg:'course successfully updated'})
        } else {
            res.status(404).json({msg:'course not found' })
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

admin.patch('/updateCourse', async(req,res)=>{
    try {
        const { CourseName,Price } = req.body;
        const result = await course.findOne({CourseName:CourseName});
        if (result) {
            await course.updateOne({
                CourseName : CourseName,
                Price : Price
            });
            res.status(201).json({msg:'course successfully updated'})
        } else {
            res.status(404).json({msg:'course not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

admin.delete('/deleteCourse', async(req,res)=>{
    try {
        const { CourseName } = req.body;
        const result = await course.findOne({CourseName:CourseName});

        if (result) {
            await course.findOneAndDelete({CourseName:CourseName});
            res.status(200).json({msg:'Course deleted Successfully'});
        } else {
            res.status(404).json({msg:'course not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
});

export {admin}
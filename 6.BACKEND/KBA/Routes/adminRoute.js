import { Router } from "express";
import { authenticate } from "../MiddleWare/auth.js";

const admin = Router();

const course = new Map();

admin.post('/addCourse', authenticate, (req,res)=>{
    try {
        const { CourseName,CourseId,CourseType,Description,Price } = req.body
        if(course.get(CourseName)){
            res.status(400).json({msg:'Course already exist'})
        } else{
            try {
                course.set(CourseName,{ CourseId,CourseType,Description,Price })
                res.status(201).json({msg:'course successfully added'})
            } catch (error) {
                res.status(400).json({msg:error.message})
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
});

export {admin}
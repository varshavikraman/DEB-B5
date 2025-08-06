import { Router } from "express";
import { course } from "./adminRoute.js";
import { authenticate } from "../MiddleWare/auth.js";

const user = Router();
const cart = new Map();

// get method using query
user.get('/getCourse',authenticate, (req, res) => {
    try {
        const key = req.query.CourseName;
        console.log("CourseName:", key);

        const result = course.get(key);

        if (result) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// get method using params
user.get('/getCourse/:cName',authenticate, (req, res) => {
    try {
        // console.log(req.params.cName);
        const key = req.params.cName;
        console.log("CourseName:", key);

        const result = course.get(key);

        if (result) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

user.post('/addToCart', authenticate, (req,res)=>{
    try {
        const { UserName,CourseName,CourseId,CourseType,Price } = req.body
        if(course.get(CourseName)){
            cart.set([UserName,{ CourseName,CourseId,CourseType,Price }])
            res.status(200).json({msg:'course added to cart successfully'})
        } else{
            res.status(404).json({msg:'Course not found'})
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

user.get('/getCartDetails',authenticate, (req, res) => {
    try {
        const UserName = req.name;
        const result = cart.get(UserName)
        if(cart.size === 0){
            res.status(404).json({msg:'Cart is empty'})
        } else{
            console.log(result);
            
            res.status(200).json({result})
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
export default user 
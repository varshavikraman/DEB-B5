import { Router } from "express";
import { authenticate } from "../MiddleWare/auth.js";
import {course} from "../Model/sample.js";
import sharp from 'sharp'


const user = Router();

// get method using query
user.get('/getCourse',authenticate, async(req, res) => {
    try {
        const key = req.query.CourseName;
        console.log("CourseName:", key);

        const result = await course.findOne({CourseName:key});

        if (result) {
            const imageBuffer = Buffer.from(result.image, "base64");
            const compressedImage = await sharp(imageBuffer).resize({ width: 300 }).jpeg({ quality: 70 }).toBuffer();

            res.set({"Content-Type": "image/png",});
            res.send(compressedImage);

            //res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// get method using params
user.get('/getCourse/:cName',authenticate, async(req, res) => {
    try {
        // console.log(req.params.cName);
        const key = req.params.cName;
        console.log("CourseName:", key);

        const result = await course.findOne({CourseName:key});

        if (result) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

user.post('/addToCart', authenticate, (req,res)=>{
    try {
        const UserName = req.name;
        console.log("Username:",UserName);
        const {CourseName} = req.body
        
        const result = course.findOne({CourseName})
    
        if(result){
            let userCart = cart.get(UserName);
            if (!userCart) {
                userCart = [];
            }
            console.log(userCart);

            const isCourseAlreadyInCart = userCart.some(e => 
                e.CourseName === CourseName
            );
            
            if (isCourseAlreadyInCart) {
                res.status(401).json({msg:'This course already exists in the cart'});
            } else {
                userCart.push({CourseName, Price: result.Price});
                cart.set(UserName, userCart);
                console.log("Usercart: ",userCart);
                res.status(200).json({msg:'Course added to cart successfully'});
            }
        } else{
            res.status(404).json({msg:'Course not found'})
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

user.get('/getCartDetails',authenticate, (req,res) => {
    try {
        const UserName = req.name;
        console.log("Username:",UserName);
        
        const result = cart.get(UserName);
        console.log("Cart:", result)

        if (!result) {
            res.status(404).json({msg:'Cart is empty'});
        } else {
            res.status(200).json({cart:result});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

user.post('/buyCourse', authenticate, (req,res) => {
    try {
        const UserName = req.name;
        console.log("Username:", UserName);
        
        const userCart = cart.get(UserName);

        if (userCart && userCart.length > 0) {
            const totalAmount = userCart.reduce((total,course) => total + course.Price, 0);
            console.log(`Total Amount: ${totalAmount}`);

            res.status(200).json({msg: `Total Amount: ${totalAmount}`});
        } else {
            res.status(404).json({msg: 'Cart is empty'});
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

user.delete('/deleteCourseInCart', authenticate, (req,res) => {
    try {
        const UserName = req.name;
        console.log("Username:", UserName);

        const { CourseName } = req.body;
        const userCart = cart.get(UserName);
        if (!userCart || userCart.length === 0) {
            return res.status(404).json({ msg: 'Your cart is empty' });
        }

        const courseIndex = userCart.findIndex(e => e.CourseName === CourseName);
        
        if (courseIndex >= 0) {
            userCart.splice(courseIndex,1);
            cart.set(UserName,userCart);
            
            res.status(200).json({ msg:'Course deleted successfully from the cart'});
        } else {
            res.status(404).json({ msg:'This course is not found in the cart' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error:'Internal Server Error'});
    }
});

export default user 
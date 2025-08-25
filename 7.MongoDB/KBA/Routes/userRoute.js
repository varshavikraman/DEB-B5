import { Router } from "express";
import { authenticate } from "../MiddleWare/auth.js";
import { course } from "../Model/sample.js";
import { Cart } from "../Model/sample.js";
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

user.post('/addToCart', authenticate, async (req, res) => {
    try {
        const UserName = req.name;
        console.log("Username:", UserName);

        const {CourseName} = req.body;

        const result = await course.findOne({CourseName});
        if (!result) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        let userCart = await Cart.findOne({UserName});
        if (!userCart) {
            userCart = new Cart({ UserName, items: [] });
        }

        const isCourseAlreadyInCart = userCart.items.some(
            (item) => item.course.toString() === result._id.toString()
        );

        if (isCourseAlreadyInCart) {
            return res.status(400).json({ msg: 'This course already exists in the cart' });
        }

        userCart.items.push({ course: result._id });

        await userCart.save();

        console.log("Updated User Cart:", userCart);
        res.status(200).json({ msg: 'Course added to cart successfully', cart: userCart });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


user.get('/getCartDetails', authenticate, async (req, res) => {
    try {
        const UserName = req.name;
        console.log("Username:", UserName);

        const userCart = await Cart.findOne({UserName}).populate('items.course');

        if (!userCart || userCart.items.length === 0) {
            return res.status(404).json({ msg: 'Cart is empty' });
        }

        res.status(200).json({cart:userCart});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


user.post('/buyCourse', authenticate, async (req, res) => {
    try {
        const UserName = req.name;
        console.log("Username:", UserName);

        const userCart = await Cart.findOne({UserName}).populate('items.course');

        if (!userCart || userCart.items.length === 0) {
            return res.status(404).json({ msg: 'Cart is empty' });
        }

        const totalAmount = userCart.items.reduce((total, item) => {
            return total+(item.course?.Price || 0); //optional chaining operator
        }, 0);

        console.log(`Total Amount: ${totalAmount}`);

        res.status(200).json({ msg: `Total Amount: ${totalAmount}`, totalAmount });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error:'Internal Server Error'});
    }
});

user.delete('/deleteCourseInCart', authenticate, async (req, res) => {
    try {
        const UserName = req.name;
        console.log("Username:", UserName);

        const { CourseName } = req.body;

        const courseDoc = await course.findOne({CourseName});
        if (!courseDoc) {
            return res.status(404).json({msg:'Course not found'});
        }

        const userCart = await Cart.findOne({ UserName });
        if (!userCart || userCart.items.length === 0) {
            return res.status(404).json({msg:'Your cart is empty'});
        }

        const courseIndex = userCart.items.findIndex(
            item => item.course.toString() === courseDoc._id.toString()
        );

        if (courseIndex >= 0) {
            userCart.items.splice(courseIndex, 1);
            await userCart.save();

            res.status(200).json({msg:'Course deleted successfully from the cart'});
        } else {
            res.status(404).json({msg: 'This course is not found in your cart'});
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


export default user 
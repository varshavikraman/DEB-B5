import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Sample } from "../Model/sample.js";


const router = Router();

router.post('/signup',async(req,res)=>{
    try {
        const { FirstName,LastName ,UserName,Password,UserRole } = req.body;

        const User = await Sample.findOne({ UserName });
            if (User) {
                return res.status(400).json({ msg: "Username already exists" });
            }

        const hashedPassword = await bcrypt.hash(Password,10) ;
        console.log(`New Password : ${hashedPassword}`);

        const newUser = new Sample({
            FirstName:FirstName,
            LastName: LastName,
            UserName: UserName,
            Password: hashedPassword,
            UserRole : UserRole
        });

        await newUser.save();
      
        res.status(201).json({msg:"Sucessfully created"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
        
})

router.post('/login',async(req,res)=>{
     try {
        const { UserName, Password } = req.body;
        console.log(UserName);
        console.log(Password);    
        const result = await Sample.findOne({UserName});
        console.log(result);
        if (!result) {
            res.status(404).json({ msg: "Username not registered" })
        }
        const valid = await bcrypt.compare(Password, result.Password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName: UserName, UserRole: result.UserRole }, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authToken', token,
                    { httpOnly: true }
                )
                res.status(200).json({ msg: "Successfully loggedin" })
            } else {
                res.status(400).json({ msg: "Something went wrong in token generation" })
            }
        }

    } catch {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" })
    }
})

router.get('/logout',authenticate,(req,res)=>{
    res.clearCookie('authToken');
    res.status(200).json({msg:'Sucessfully Logged out'})
})

export {router};
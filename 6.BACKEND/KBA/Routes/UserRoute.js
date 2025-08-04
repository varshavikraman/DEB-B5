import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const router = Router();

const user = new Map;

router.post('/signup',async(req,res)=>{
    // const details = req.body;
    // console.log(details);
    // console.log(details.FristName)
    try {
        const { FristName,LastName ,UserName,Password,UserRole } = req.body;
        console.log(FristName);
        const newPassword = await bcrypt.hash(Password,10) ;
        console.log(`New Password : ${newPassword}`);
        const result = user.get(UserName)
        if (result) {
            res.status(400).json({msg:"Username Already exist"})
        } else {
            user.set(UserName,{ FristName,LastName ,newPassword,UserRole });
            res.status(201).json({msg:"Sucessfully created"})
        }
    } catch (error) {
        res.status(500).send({ error });
    }
        
})

router.post('/login',async(req,res)=>{
    try {
        const { UserName,Password } = req.body;
        const result = user.get(UserName);
        if (!result) {
            res.status(404).json({msg:"Username not registered"});
        }
        const valid = await bcrypt.compare(Password,result.newPassword)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({UserName,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
            console.log('Token:',token);
            if (token) {
                res.cookie('authToken',token,{
                    httpOnly:true
                })
                res.status(200).json({msg:'logged in Sucessfully'});
            } else {
                res.status(400).json({msg:"something went wrong in token generation"});
            }
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    

})
export {router};
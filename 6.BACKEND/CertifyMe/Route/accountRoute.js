import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const accountRoute = Router();

const user = new Map();

accountRoute.post('/signup',async(req,res)=>{
    try {
        const { Name,Email,Password, } = req.body;
        const newPassword = await bcrypt.hash(Password,10) ;
        console.log(`New Password : ${newPassword}`);
        const result = user.get(Email);
        if (result) {
            res.status(400).json({msg:`${Email} already exist`});
        } else {
            user.set(Email,{ Name,newPassword});
            res.status(201).json({msg:"Signed Up Successfully"});
        }
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({error:'Internal Server Error'});
    }
        
});

accountRoute.post('/login',async(req,res)=>{
    try {
        const { Email,Password } = req.body;
        const result = user.get(Email);
        if (!result) {
            res.status(404).json({msg:`This ${Email} not registered`});
        }
        const valid = await bcrypt.compare(Password,result.newPassword)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({Email,Name:result.Name},process.env.SECRET_KEY,{expiresIn:'1h'});
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
        console.error("Error: ", error);
        res.status(500).json({error:'Internal Server Error'});
    }
});

export { accountRoute }
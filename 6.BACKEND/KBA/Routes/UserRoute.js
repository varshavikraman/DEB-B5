import { Router } from "express";
import bcrypt from 'bcrypt'

const router = Router();

const user = new Map;

router.post('/signup',async(req,res)=>{
    // const details = req.body;
    // console.log(details);
    // console.log(details.FristName)
    try {
        const { FristName,LastName ,UserName,Password,UserRole } = req.body;
        console.log(FristName);
        const newPasword = await bcrypt.hash(Password,10) ;
        console.log(`New Password : ${newPasword}`);
        const result = user.get(UserName)
        if (result) {
            res.status(400).json({msg:"Username Already exist"})
        } else {
            user.set(UserName,{ FristName,LastName ,newPasword,UserRole });
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
        const valid = await bcrypt.compare(Password,result.newPasword)
        console.log(valid);
        //res.status(200).json({msg:'login Sucessfully'})
    } catch (error) {
        
    }
    

})
export {router};
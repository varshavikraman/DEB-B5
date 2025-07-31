import { Router } from "express";

const router = Router();

router.post('/signup',(req,res)=>{
    // const details = req.body;
    // console.log(details);
    // console.log(details.FristName)
    try {
        const { FristName,LastName ,UserName,Password,UserRole } = req.body;
        console.log(FristName);
    } catch (error) {
        res.send(error) 
    }
        
})

export {router};
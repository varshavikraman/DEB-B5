import { Router } from "express";

const router = Router();

router.get('/hi',(req,res)=>{
    console.log("Hi World");
    res.send('Hi World');
})

export default router; /* if export using default then we can import only one function and import using any name OR if we export inside a curly braces then we can import more than one function and we can only import the function with same name only */
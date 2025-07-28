import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// app.listen(8000,()=>{
//     console.log('Sever is listening to Port 8000');    
// })

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);
    
})
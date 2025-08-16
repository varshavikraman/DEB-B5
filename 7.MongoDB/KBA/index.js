import express, {json} from 'express';
import dotenv from 'dotenv';
import {router} from './Routes/loginRoute.js';
import { admin } from './Routes/adminRoute.js';
import { authenticate } from './MiddleWare/auth.js';
import adminCheck from './MiddleWare/adminAuth.js';
import user from './Routes/userRoute.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(json())
app.use('/',router);
app.use('/',user);
app.use('/', authenticate, adminCheck,admin);

mongoose.connect("mongodb://localhost:27017/New_KbaCourse").then(() => {
        console.log("MongoDB successfully connected");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});
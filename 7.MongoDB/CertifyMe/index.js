import express,{json} from 'express';
import dotenv from 'dotenv';
import { accountRoute } from './Route/accountRoute.js';
import { adminRoute } from './Route/adminRoute.js';
import { userRoute } from './Route/userRoute.js';
import { authenticate } from './Middleware/auth.js';
import adminCheck from './Middleware/adminAuth.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(json());
app.use('/',accountRoute)
app.use('/',userRoute)
app.use('/',authenticate,adminCheck, adminRoute)

mongoose.connect("mongodb://localhost:27017/CertifyMe").then(() => {
        console.log("MongoDB successfully connected");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

app.listen(process.env.PORT, ()=>{
    console.log(`The server is listen on port ${process.env.PORT}`);
    
});
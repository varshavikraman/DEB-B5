import express, {json} from 'express';
import dotenv from 'dotenv';
import {router} from './Routes/loginRoute.js';
import { admin } from './Routes/adminRoute.js';
import { authenticate } from './MiddleWare/auth.js';
import adminCheck from './MiddleWare/adminAuth.js';
import user from './Routes/userRoute.js';

dotenv.config();

const app = express();

app.use(json())
app.use('/',router);
app.use('/', authenticate, adminCheck,admin);
app.use('/',user)


app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});
import express, {json} from 'express';
import dotenv from 'dotenv';
import {router} from './Routes/UserRoute.js';
import { admin } from './Routes/adminRoute.js';

dotenv.config();

const app = express();

app.use(json())
app.use('/',router);
app.use('/',admin);


app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});
import express,{json} from 'express';
import dotenv from 'dotenv';
import { accountRoute } from './Route/accountRoute.js';
import { adminRoute } from './Route/adminRoute.js';
import { userRoute } from './Route/userRoute.js';
import { authenticate } from './Middleware/auth.js';
import adminCheck from './Middleware/adminAuth.js';

dotenv.config();

const app = express();

app.use(json());
app.use('/',accountRoute)
app.use('/',userRoute)
app.use('/',authenticate,adminCheck, adminRoute)


app.listen(process.env.PORT, ()=>{
    console.log(`The server is listen on port ${process.env.PORT}`);
    
});
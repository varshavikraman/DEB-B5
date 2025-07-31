import express from 'express';
import dotenv from 'dotenv';
import router from './Routes/UserRoute.js';

dotenv.config();

const app = express();

app.use('/',router);

app.get('/',(req,res)=>{
    console.log("Hello World");
    res.send('Hello World');
})

app.get('/routeName',(req,res)=>{
    console.log("Hi World");
    res.send('Hi World');
})

app.post('/getData',(req,res)=>{
    console.log("Hello World");
    res.send('Hi World');
})

// app.listen(8000,()=>{
//     console.log('Sever is listening to Port 8000');    
// })

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config({quiet:true});
import deptRoute from './routes/deptRoute.js' 
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api", deptRoute);
const port=  process.env.port || 5002;

app.listen(port,()=>{
    console.log('server listening on port',port);
})
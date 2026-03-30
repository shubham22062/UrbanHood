import express from 'express'
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

const app = express();


connectDB();


app.get("/",(req,res)=>{
    res.send("backend is running ")
})

app.post('/signup' ,(req,res)=>{
    res.send("this is sigin route ")
})

app.listen(PORT, ()=>{
    console.log(`your server is running on http://localhost:${PORT}`)
});


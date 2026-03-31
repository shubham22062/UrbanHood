import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js'

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());


connectDB();

app.use("/api/auth" , authRoutes)


app.get("/",(req,res)=>{
    res.send("backend is running ")
})



app.listen(PORT, ()=>{
    console.log(`your server is running on http://localhost:${PORT}`)
});


import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import addressRoutes from './routes/address.routes.js'

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());


connectDB();

app.use("/api/auth" , authRoutes)

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/order", orderRoutes);

app.use("/api/address", addressRoutes);


app.get("/",(req,res)=>{
    res.send("backend is running ")
})



app.listen(PORT, ()=>{
    console.log(`your server is running on http://localhost:${PORT}`)
});


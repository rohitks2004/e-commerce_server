const express = require("express");
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoute')
const userRoutes = require('./routes/userRoute')
const cartRoutes =require('./routes/cartRoute')
const orderRoutes = require('./routes/orderRoute');
const cors = require('cors')

app.use(express.json());
app.use(cors());
mongoose.connect(
    // 'mongodb://localhost:27017/e-commerce'
    'mongodb+srv://ksrohit25:ZqueG2A4I3eYg6HU@cluster0.rq5ngav.mongodb.net/e-commerce'
).then(()=>console.log("MongoDB connected")
).catch(()=>console.log("MongoDB connection Failed"))

app.use('/products',productRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
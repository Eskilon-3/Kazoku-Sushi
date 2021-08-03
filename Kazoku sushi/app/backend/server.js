import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import config  from "./config";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter";
mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to mongodb');
})
.catch((error) => {
    console.log(error.reason);
})

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.get('/api/paypal/clientId', (req, res) => {
    res.send({clientId: config.PAYPAL_CLIENT_ID});
});

/* app.use(express.static('/../frontend/uploads')); */
/*app.use(express.static(path.join(__dirname, '/../frontend'))); */

/* app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});  */

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError'? 400: 500;
    res.status(status).send({ message: err.message});
})
app.listen(config.PORT, ()=>{
    console.log("serve at http://localhost:5000");    
});
import express, { json } from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import ConnectDb from "./config/db.js";
import route from "./routes/AuthRoute.js";
dotenv.config();
import cors from 'cors'
import router from "./routes/CategoryRoute.js";
import routers from "./routes/ProductsRoute.js";

ConnectDb();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/auth', route)
app.use('/api/v1/category', router)
app.use('/api/v1/product', routers);



app.get('/', (req, res) => {
    return res.status(200).send('server is running very very well');

});
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on PORT = ${PORT}`);
});
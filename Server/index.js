import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import mongoConnect from "./Config/connect.js";

import beerRouter from "./Routes/beer.routes.js";
import cartRouter from "./Routes/cart.routes.js";
import userRouter from './Routes/user.routes.js';
import loginRouter from './Routes/login.routes.js';

const port = process.env.PORT;
const app = express();

mongoConnect();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/beer', beerRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);

const server = app.listen(port);

import dotenv from "dotenv"
dotenv.config()

import express, { json } from "express";
import rateLimit from 'express-rate-limit';
import cors from "cors";
import { serve, setup } from 'swagger-ui-express';
import { loggerMiddleware } from "./utils/logger.js";

import config from "./config/config.js";
import { connectDB } from "./config/db.js";
import eventRoutes from "./routing/eventRoutes.js";
import userRoutes from "./routing/userRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import swaggerSpec from "./utils/swaggerConf.js";


const app = express()


app.use('/api-docs', serve, setup(swaggerSpec));
app.use(rateLimit(config.server.rateLimiter));
app.use(json())
app.use(cors(config.server.cors))

app.use(loggerMiddleware)
app.use(eventRoutes)
app.use(userRoutes)
app.use(errorMiddleware)


const start = async () => {
    try {
        await connectDB()
        app.listen(config.server.port, () => console.log(`Server run on ${config.server.port}`))
    } catch (e) {
        console.log(e)
    }
}

start()
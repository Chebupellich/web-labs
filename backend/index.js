require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');

const userModel = require('./models/user-model');
const eventModel = require('./models/event-model')

const eventRoutes = require("./routing/event-routes.js");
const userRoutes = require("./routing/user-routes.js")

const errorMiddleware = require("./middleware/error-middleware.js");

const PORT = process.env.PORT || 5000
const app = express()

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API для управления событиями',
            version: '1.0.0',
            description: 'Документация API для работы с событиями и пользователями',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after a minute',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter);
app.use(express.json())
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
)
app.use(morgan(':method :url'));

app.use(eventRoutes)
app.use(userRoutes)
app.use(errorMiddleware)

const start = async () => {
    try {
        await require('./config/db').sync();
        console.log('DB Syncronized');

        app.listen(PORT, () => console.log(`Server run on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
};

start();

//['концерт', 'лекция', 'выставка']
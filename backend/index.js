require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userModel = require('./models/user-model');
const eventModel = require('./models/event-model')

const router = require("./routing/test-routes.js");
const errorMiddleware = require("./middleware/error-middleware.js");

const PORT = process.env.PORT || 5000
const app = express()

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
)

app.use(router)
app.use(errorMiddleware);

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
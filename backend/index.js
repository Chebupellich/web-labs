require("dotenv").config();
const express = require("express");
const cors = require("cors");

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
        app.listen(PORT, () => console.log(`Server run on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
};

start();
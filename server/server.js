require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require('./router/auth-router');
const connectDb = require('./utils/db');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoute);


const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("server is running at port:" ,{PORT});
    });
});

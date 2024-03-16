require("dotenv").config();
const express = require("express");
//const bodyParser = require('body-parser');

const authRoute = require('./router/auth-router');
const connectDb = require('./utils/db');
const cors = require('cors');

const  {graphqlHTTP}  = require('express-graphql');

const app = express();

//app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoute);

app.use(
    '/graphql', 
    graphqlHTTP({
        schema: grapphQlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
})
);


const PORT = 5000;

//confirm DB connection and start server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("server is running at port:" ,{PORT});
    });
});

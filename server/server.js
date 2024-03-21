require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./utils/db');
const cors = require('cors');

const  {graphqlHTTP}  = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("server is running at port:" ,{PORT});
    });
    
});
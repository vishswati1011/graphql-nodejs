
import dbConnection  from './dbSetup.js'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {readFileSync} from 'fs'
import gql from 'graphql-tag';
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4'
import { mergeTypeDefs } from '@graphql-tools/merge';
import resolvers from "./graphQL/resolver/resolvers.js";


const PORT = process.env.PORT || 4000
const app = express();

app.use(cors({ credentials: true, origin: '*' }));
// app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// );

app.use(express.json())

dotenv.config();

// mongodb 
dbConnection().then(conn =>{
    console.log("Mongo connect")
})

const typeDefsArray = [
    gql(readFileSync("./graphQL/Schema/game.graphql", { encoding: "utf-8" })),
    gql(readFileSync("./graphQL/Schema/review.graphql", { encoding: "utf-8" })),
    gql(readFileSync("./graphQL/Schema/author.graphql", { encoding: "utf-8" })),
];
  
const typeDefs = mergeTypeDefs(typeDefsArray);

const server = new ApolloServer({
    typeDefs,  // --definitions and type of data
    resolvers
})

await server.start();

app.get('/',(req,res)=>{
    res.send("Server running on PORT : 4000")
})
app.use('/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
)

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})
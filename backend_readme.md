## how to create a backend using Graphql, Node.js, Mongodb 

1. create and move folder "server" using cmd
### 
    mkdir server
    cd server
###

2. npm init to initialize node.js and create package.json and lock file

3. install core dependency of nodejs project 
###
    npm i express cors body-parser dotenv nodemon fs
###    

4. create index.js file to config server setup 

###
    import dotenv from 'dotenv'
    import express from 'express'
    import cors from 'cors'
    import bodyParser from "body-parser";
    import {readFileSync} from 'fs'
    const PORT = process.env.PORT || 4000
    const app = express();

    app.use(cors({ credentials: true, origin: '*' }));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    dotenv.config();

    app.get('/',(req,res)=>{
        res.send("Server running on PORT : 4000")
    })

    app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`)
    })

###

5. add start script in package.json

###
    "start" : "nodemon index.js"
###

6. now we install apollo graph-ql dependencies

###
    npm i graphql graphql-tag @apollo/server  @graphql-tools/merge
###

7. now we install mongoose and connect with mongodb database

###
    npm i mongoose
###

8. now create dbSetup.js file in root folder
###
    import mongoose from 'mongoose'

    const dbConnection = async () =>{
        try{
            console.log("process.env.MONGO_URL",process.env.MONGO_URL)
            const con = await mongoose.connect(process.env.MONGO_URL)
            const dbName = con.connection.db.databaseName;
            console.log("Connected MongoDB : "+ dbName)
            return con;
        }catch(error){
            console.log("Error connecting with MongoDB : ",error)
        }
    }

    export default dbConnection

###

9. import dbsetup in main index.js file

###
    import dbConnection  from './dbSetup.js'
###


10. after dotenv.config call dbconnection function

###
    // mongodb 
    dbConnection().then(conn =>{
        console.log("Mongo connect")
    })
###

11. now we create schema of mongodb database we will create 3 files in models folder

(a).  create models folder in root folder
(b).  create authors.js file

###
    import mongoose from "mongoose";

    const AuthorSchema = mongoose.Schema({
        name:String,
        verified:Boolean,
    })
    const authors = mongoose.model('authors',AuthorSchema)
    export default authors;
###

(c). create games.js file

###
    import mongoose from "mongoose";

    const GamesSchema = mongoose.Schema({
        title:String,
        platform:Array,
    })
    const games = mongoose.model('games',GamesSchema)
    export default games;
###  

(d). create reviews.js file 

###
    import mongoose from "mongoose";
    const ReviewSchema = mongoose.Schema({
        rating:String,
        content:String,
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"authors"
        },
        game_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'games'
        }
    })
    const reviews = mongoose.model('reviews',ReviewSchema)
    export default reviews;
###

12. now create GraphQl folder 

13.  now we create schema folder to create graphQL schema 

    13. 1. create Schema folder
    13. 2. create authors.graphql 
    13. 3. create games.graphql 
    13. 4. create reviews.graphql 


14. inside graphQl/Schema/author.graphql

###

    type Authors {
        id: ID!
        name: String!
        verified: String!
        reviews: [Reviews!]
    }
    type Query{
        authors: [Authors]
        author(id: ID!): Authors
    }
    type Mutation {
        addAuthor(author:AddAuthorInput!):Authors,
        deleteAuthor(id:ID!) : [Authors]
        updateAuthor(id:ID!,edits:EditAuthorInput!):Authors
    }
    input AddAuthorInput {
        name: String!,
        verified: Boolean
    }
    input EditAuthorInput {
        name: String,
        verified: Boolean
    }

###    

15.  inside graphQl/Schema/game.graphql

###
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Reviews!]   
    }
    type Query{
        games: [Game]
        game(id: ID!): Game
    }
    type Mutation {
        addGame(game: AddGameInput!): Game,
        deleteGame(id: ID!) : [Game]
        updateGame(id: ID!, edits:EditGameInput!): Game
    }
    input AddGameInput {
        title: String!,
        platform: [String!]!
    }
    input EditGameInput {
        title: String,
        platform: [String!]
    }
###


16.  inside graphQl/Schema/review.graphql

###

    type Reviews {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Authors!
    }
    type Query{
        reviews: [Reviews]
        review(id:ID!): Reviews
    }
    type Mutation {
        addReview(review: AddReviewInput!): Reviews,
        deleteReview(id:ID!): [Reviews]
        updateReview(id:ID, edits: EditReviewInput!): Reviews
    }
    input AddReviewInput {
        rating: String!,
        content: String!,
        author_id: String
        game_id: String
    }
    input EditReviewInput {
        rating: String!,
        content: String!,
        author_id: String
        game_id: String
    }

###


17. now we read this file to index.js using readFileSync 

17. 1.  first import readFileSync
### 
    import {readFileSync} from 'fs'
###

17. 2. import gql 
###
    import gql from 'graphql-tag';
### 

17. 3. import graphql tool to merge typedef

###
    import { mergeTypeDefs } from '@graphql-tools/merge';
###

17. 4. 
###
    const typeDefsArray = [
        gql(readFileSync("./graphQL/Schema/game.graphql", { encoding: "utf-8" })),
        gql(readFileSync("./graphQL/Schema/review.graphql", { encoding: "utf-8" })),
        gql(readFileSync("./graphQL/Schema/author.graphql", { encoding: "utf-8" })),
    ];
    
    const typeDefs = mergeTypeDefs(typeDefsArray);
###


18. now we write resolver to fetch data

18. 1. create resolver folder inside graphQL
18. 2. create resolver/authorResolvers.js
18. 3. create resolver/gameResolvers.js
18. 4. create resolver/reviewResolvers.js
18. 5. create resolver/resolvers.js

18. 1. add code resolver/authorResolvers.js

###
    import Author from '../../models/authors.js'
    import Reviews from '../../models/reviews.js';
    const resolvers = {

        Authors: {
            id:(parent)=> parent.id ?? parent._id,
            reviews : async (parent) => {
                const review = await Reviews.find({author_id:parent.id})
                return review;
            }
        },
        Query: {
            async authors() {
                const authors = await Author.find({});
                return authors;
            },
            async author(_,{id}) {
                let author = await Author.findOne({_id:id});
                return author
            }    
        },
        Mutation: {
            async addAuthor(_,{author}){
                let newAuthorData = new Author({
                    name: author.name,
                    verified: author.verified
                })
                let result = await newAuthorData.save();
                return result;
            },
            async updateAuthor(_,{id,edits}){
                let updateData = await Author.findByIdAndUpdate(
                    {_id:id},
                    {$set:{name:edits.name,verified:edits.verified}},
                    {new:true}
                )
                return updateData;
            },
            async deleteAuthor(_,{id}){
                const deleteAuthor = await Author.findByIdAndDelete({_id:id});
                return [deleteAuthor];
            }
        }
    }
    export default resolvers;
###

18. 2. add code in resolver/gameResolvers.js

###
    import Game from '../../models/games.js'
    import Review from '../../models/reviews.js'
    const resolvers = {

        Game: {
            id: (parent)=> parent.id ?? parent._id,
            reviews : async (parent) =>{             // for nested query game with reviews
                const review = await Review.find({game_id:parent._id})
                return review && review
            }
        },
        Query: {
            async games() {
                const games = await Game.find({});
                return games;
            },
            async game(_,{id}){
                let game = await Game.findOne({_id:id});
                return game
            }
        },
        Mutation: {
            async addGame(_,{game}){
                let newGameData = new Game({
                    title:game.title,
                    platform:game.platform
                })
                let result =await newGameData.save()
                return result;
            },
            async updateGame(_,{id,edits}){
                let updateData = await Game.findByIdAndUpdate(
                    {_id:id},
                    {$set:{title:edits.title,platform:edits.platform}},
                    {new:true}
                )
                return updateData;
            },
            async deleteGame(_,{id}){
                const deletedGame = await Game.findByIdAndDelete({_id: id});
                return [deletedGame];
            }

        }

    }
    export default resolvers;
###

18. 3. add code in resolver/reviewResolvers.js

###

    import Review from '../../models/reviews.js'
    import Games from '../../models/games.js';
    import Authors from '../../models/authors.js';

    const resolvers = {

        Reviews: {
            id: (parent) => parent.id ?? parent._id,
            author : async (parent) =>{         // for nested query reviews with author and game 
                const author = await Authors.findOne({_id:parent.author_id});
                return author
            },
            game : async (parent) => {
                const game = await Games.findOne({_id:parent.game_id})
                return game
            }
        },
        Query: {
            async reviews() {
                const reviews = await Review.find({});
                return reviews;
            },
            async review(_,{id}){
                let review = await Review.findOne({_id:id})
                return review;
            }
        },
        Mutation: {
            async addReview(_,{review}){
                let addReviewData =  new Review({
                    rating: review.rating,
                    content: review.content,
                    author_id: review.author_id,
                    game_id:  review.game_id
                })
                let savedData = await addReviewData.save();
                return savedData;
            },
            async updateReview(_,{id,edits}){
                let updateData = await Review.findByIdAndUpdate(
                    {_id:id},
                    {$set: {
                        rating:edits.rating,
                        content:edits.content,
                        author_id:edits.author_id,
                        game_id:edits.game_id
                    }},
                    {new:true}
                )
                return updateData;
            },
            async deleteReview(_,{id}){
                const deleteReview = await Review.findByIdAndDelete({_id:id});
                return [deleteReview]
            }
        }

    }
    export default resolvers;
###

18. 4. import add resolver modules in resolvers.js

###
    import authorResolvers from './authorResolvers.js';
    import gameResolvers from './gameResolvers.js';
    import reviewResolvers from './reviewResolvers.js';
    const resolvers = {
        Query: {
            ...authorResolvers.Query,
            ...gameResolvers.Query,
            ...reviewResolvers.Query,
        },
        Mutation: {
            ...gameResolvers.Mutation,
            ...authorResolvers.Mutation,
            ...reviewResolvers.Mutation
        },
        Reviews: {
            ...reviewResolvers.Reviews
        },
        Game : {
            ...gameResolvers.Game
        },
        Authors : {
            ...authorResolvers.Authors
        }

    
    }
    export default resolvers;
###

19. now we import resolver to index.js and us using appolloserver

19. 1. 
###
    import { ApolloServer } from "@apollo/server";
    import {expressMiddleware} from '@apollo/server/express4'
###
 
19. 2. 

###
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
###



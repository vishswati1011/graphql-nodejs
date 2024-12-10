export const typeDefs = `#graphql

    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Reviews!]   
    }
    type Reviews {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Authors!
    }
    type Authors {
        id: ID!
        name: String!
        verified: String!
        reviews: [Reviews!]
    }
    type Query{
        reviews: [Reviews]
        review(id:ID!): Reviews
        games: [Game]
        game(id: ID!): Game
        authors: [Authors]
        author(id: ID!): Authors
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

`


//not-equal mark for required ID
// int float string boolean ID


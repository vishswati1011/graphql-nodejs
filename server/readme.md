

#  fetch single data by id

1. first add query in schema 

    ###
    review(id:ID!): Reviews, 
    ###

2. then add resolver function

###
    review(_,args) {
        return db.reviews.find((review)=>review.id === args.id)
    },
###



# write nested query

## fetch game with reviews

pass id in variable

###
    {
    "id": "2",
    // reviewId: null
    }
###

###
    query GameQuery($id: ID! ) {
    game(id: $id){
        title,
        reviews {
        rating
        content
        }
    }
    }
###

## Fetch author with reviews

###
    query GameQuery($id: ID! ) {
    author(id: $id){
        name,
        reviews {
        rating,
        content
        }
    }
    }

###


## 3. fetch review with game and author
###
    query ReviewQuery($id: ID! ) {
    review(id: $id){
        rating,
        game {
        title,
        platform
        },
        author {
        name
        verified
        }
    }
    }

###

## 4. 
###

    query ReviewQuery($id: ID! ) {
    review(id: $id){
        rating,
        game {
        title,
        platform,
        reviews {
            rating
        }
        },
        
    }
    }
###


# Mutation

## delete Query

1. first create delete mutation in schema

###
    type Mutation {
        deleteGame(id: ID!) : [Game]
    }
###

2. create resolver 

###
    Mutation: {
        deleteGame(_,args){
            db.games = db.games.filter((g)=> g.id != args.id)
            return db.games
        }
    }
###

3. run from apollo



# update mutation 

1. create a updateGame mutation in schema
###
    type Mutation {
            updateGame(id: ID!, edits:EditGameInput!): Game
    }
    input EditGameInput {
        title: String,
        platform: [String!]
    }
###

2. create resolver

###
    Mutation: {
    updateGame(_, args){
                db.games = db.games.map((g)=>{
                    if(g.id === args.id){
                        return {...g,...args.edits}
                    }
                    return g
                })
                return db.games.find((g)=>g.id === args.id)
            }
    }
###

3.  run from apollo 


## References link

https://www.apollographql.com/docs/apollo-server/getting-started



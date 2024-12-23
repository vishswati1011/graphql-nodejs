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
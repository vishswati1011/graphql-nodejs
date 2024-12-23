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
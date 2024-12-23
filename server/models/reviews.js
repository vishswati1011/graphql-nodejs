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
import mongoose from "mongoose";

const GamesSchema = mongoose.Schema({
    title:String,
    platform:Array,
})
const games = mongoose.model('games',GamesSchema)
export default games;
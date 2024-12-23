import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
    name:String,
    verified:Boolean,
})
const authors = mongoose.model('authors',AuthorSchema)
export default authors;
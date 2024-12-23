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
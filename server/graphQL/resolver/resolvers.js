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
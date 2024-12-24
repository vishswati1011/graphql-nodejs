
export const GET_REVIEWS = `
  query GET_REVIEWS {
    reviews{
        id
        rating
        content
        author{
            name
        }
        game{
            title
        }
    }
    }
`;


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

export const ADD_REVIEW = `
    mutation ADD_REVIEW ($addReviewInput : AddReviewInput!) {
        addReview (review : $addReviewInput) {
            content
            rating
        }
    }
`

export const DELETE_REVIEW = `
    mutation DELETE_REVIEW ($deleteReviewId : ID!) {
        deleteReview (id: $deleteReviewId) {
            content
        }
    }
`
export const GET_AUTHORS = `
  query {
    authors{
        id
        name
    }
    }
`;
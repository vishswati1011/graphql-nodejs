import {gql} from '@apollo/client';

export const GET_AUTHORS = gql`
  query {
    authors{
        id
        name
        verified
    }
    }
`;

export const ADD_AUTHOR = gql`
  mutation 
    addAuthorMutation ($addAuthorInput: AddAuthorInput!) {
      addAuthor (author: $addAuthorInput) {
        name
        id
      }
    }
`;

export const DELETE_AUTHOR = gql`
  mutation
    deleteAuthorMutation ($deleteAuthorId: ID!){
      deleteAuthor (id: $deleteAuthorId) {
        name
      }
    }
`;
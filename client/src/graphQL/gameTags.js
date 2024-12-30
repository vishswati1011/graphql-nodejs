import {gql} from 'graphql-request';

export const GET_GAMES = gql`
  query {
    games{
        id
        title
        platform
    }
    }
`;

export const ADD_GAME = `
    mutation
      addGameMutation ($addGameInput: AddGameInput!){
        addGame(game: $addGameInput) {
          title
          platform  
          id
        }
      }
`;

export const DELETE_GAME = `
  mutation deleteGame($deleteGameId: ID!) {
    deleteGame(id: $deleteGameId) {
      title
    }
}
`;

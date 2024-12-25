import {gql} from 'graphql-request';

export const GET_GAMES = `
  query {
    games{
        id
        title
        platform
    }
    }
`;

export const ADD_GAME = gql`
    mutation
      addGameMutation ($addGameInput: AddGameInput!){
        addGame(game: $addGameInput) {
          title
          platform  
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

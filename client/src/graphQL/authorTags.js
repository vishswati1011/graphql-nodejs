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

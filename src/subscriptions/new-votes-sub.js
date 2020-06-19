import gql from 'graphql-tag'


export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`
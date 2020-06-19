import gql from "graphql-tag"

export const FEED_QUERY = gql `
            query {
                feed{
                   links{
                    id
                    createdAt
                    url
                    description
                   }
                }
            }

`
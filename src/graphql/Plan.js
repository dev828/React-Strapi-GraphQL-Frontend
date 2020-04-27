import gql from "graphql-tag";

export const PLANS_QUERY = gql `
    query Plans {
        plans {
            id
            price
            description
            mostpopular
            speicialdeal
            save
            title
            months
        }
    }
`;
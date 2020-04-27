import gql from "graphql-tag";

export const PAGES_QUERY = gql `
    query Pages {
        pages {
            id
            datetry
            URL
            status
            incache
            timeduration
        }
    }
`;
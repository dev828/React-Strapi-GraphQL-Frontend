import gql from "graphql-tag";

export const SITEMAPS_QUERY = gql`
    query Sitemaps {
        sitemaps {
            id
            name
            URL
        
        }
    }
`;

export const SITEMAPS_INSERT = gql`
    mutation insertSitemap($name: String!, $URL: String!) {
        createSitemap(input: {
            data: {
                name: $name,
                URL: $URL,
            }
        })
        {
            sitemap {
                id
                name
                URL
            }
        }
    } 
`;

export const SITEMAPS_DELETE = gql `
    mutation deleteSitemap($index: ID!) {
        deleteSitemap(input: {
            where: {
                id: $index
            }
        }) 
        {
            sitemap {
                id
                name
                URL
            }
        }
    } 
`;

export const SITEMAPS_UPDATE = gql `
    mutation updateSitemap ($index: ID!, $name: String!, $url: String!) {
        updateSitemap(input: {
        where: {
            id: $index
        },
        data: {
            name: $name,
            URL: $url
        }
        })
        {
        sitemap {
            id
            name
            URL
        }
        }
    }
`
import gql from 'graphql-tag';

export const INSERT_UPSTACKUSER = gql `
    mutation insertUptrackuser ($name: String!, $email: String!, $pass: String!, $confirm: Boolean!, $number: Long!) {
        createUptrackuser (input: {
            data: {
                name: $name,
                email: $email,
                password: $pass,
                confirmed: $confirm,
                phonenumber: $number
            }
        }) {
            uptrackuser {
                id
                name
                email
                password
                confirmed
                phonenumber
            }
        }
    }
`;

export const GET_UPSTACKUSER = gql `
    query ($where: JSON!) {
        uptrackusers (where: $where) {
            id
        }
    }
`
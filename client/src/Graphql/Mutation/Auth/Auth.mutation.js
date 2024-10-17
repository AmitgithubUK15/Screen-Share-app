import {gql} from '@apollo/client'

export const OAuth_Type = gql`
mutation login($name:String!, $email:String!, $profile:String!){
SignupUser(name:$name, email:$email, profile:$profile){
msg
}
}
`;


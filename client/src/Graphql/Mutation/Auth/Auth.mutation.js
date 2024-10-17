import {gql} from '@apollo/client'

export const OAuth_Type = gql`
mutation login($name:String!, $email:String, $password:String!){
SignupUser(name:$name, email:$email, password:$password){
msg
}
}
`


import {gql} from '@apollo/client'

export const OAuth_Type = gql`
mutation login($name:String!, $email:String!, $profile:String!){
SignupUser(name:$name, email:$email, profile:$profile){
msg,
email
}
}
`;

export const CreatePassword_Type = gql`
mutation Mutation($email:String!, $password:String!){
createpassword(email:$email, password:$password){
msg
}
}
`

export const Login_Type = gql`
mutation Mutation($email:String!, $password:String!){
loginUser(email:$email , password:$password){
msg,
user{
_id,
email
}
}
}
`


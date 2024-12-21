const typeDefs = `#graphql 

   type User{
   _id:String
   name:String!
   email:String!
   password:String!
   profile:String!
   }
   
   type response{
   msg:String
   user:User
   }

   type Query{
   hello: response!
   Alluser: [User]
   }

   type Mutation {
   SignupUser(name:String!, email:String!, profile:String!) : response
   createpassword(email:String!,password:String!) : response
   loginUser(email:String! , password:String!) : response
   } 
`;

module.exports = typeDefs;


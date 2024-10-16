const typeDefs = `#graphql 

   type User{
   name:String!
   email:String!
   password:String!
   profile:String
   }
   
   type response{
   msg:String!
   }
   type Query{
   hello: response!
   }

   type Mutation {
   SignupUser(name:String!, email:String!, password:String!) : response!
   }
`;

module.exports = typeDefs;


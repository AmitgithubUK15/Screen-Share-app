const typeDefs = `#graphql 
   type response{
   msg:String!
   }
   type Query{
   hello: response!
   }
`;

module.exports = typeDefs;


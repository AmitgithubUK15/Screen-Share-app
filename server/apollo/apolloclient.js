const {ApolloServer} = require("@apollo/server");
const { app } = require("../socket/socket.client");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const typeDefs = require("../Graphql/Types/type");
const {Resolvers} = require("../Graphql/Resolvers/resolver")
const cors = require('cors');
const cookieparser = require("cookie-parser")

async function  Startserver() {
    const server = new ApolloServer({
        typeDefs:typeDefs,
        resolvers:Resolvers,
        context: async ({ req, res }) => {
            return { req, res };
          },
    });
    await server.start();
    
    app.use(bodyParser.json())
    app.use(cookieparser());

    app.use(cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials:true
    }));
      
    
    app.use("/graphql",expressMiddleware(server,
       {
        context: async ({req,res}) =>{
            return {req,res}
        } 
       }   
    ));
}

module.exports = {
    Startserver,
}
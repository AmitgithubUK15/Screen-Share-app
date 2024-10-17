const {ApolloServer} = require("@apollo/server");
const { app } = require("../socket/socket.client");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const typeDefs = require("../Graphql/Types/type");
const {Resolvers} = require("../Graphql/Resolvers/resolver")
const cors = require('cors');


async function  Startserver(params) {
    const server = new ApolloServer({
        typeDefs:typeDefs,
        resolvers:Resolvers
    });
    await server.start();
    
    app.use(bodyParser.json())
    app.use(cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
      }));
      
    
    app.use("/graphql",expressMiddleware(server));
}

module.exports = {
    Startserver,
}
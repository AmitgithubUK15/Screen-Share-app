const { helloquery } = require("./Query/normal/Normalquery");
const {createuser} = require("./Mutation/Auth/Auth.mutation")

const Resolvers = {
    Query:{
        hello: helloquery
    },

    Mutation:{
        SignupUser: createuser
    }
}

module.exports = {
    Resolvers
}
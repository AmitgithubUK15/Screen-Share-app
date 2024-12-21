const { helloquery, GetAlluser } = require("./Query/normal/Normalquery");
const {createuser, resolve_createpassword, loginUser, resolve_login} = require("./Mutation/Auth/Auth.mutation")

const Resolvers = {
    Query:{
        hello: helloquery,
        Alluser:GetAlluser
    },

    Mutation:{
        SignupUser: createuser,
        createpassword: resolve_createpassword,
        loginUser:resolve_login
    }
}

module.exports = {
    Resolvers
}
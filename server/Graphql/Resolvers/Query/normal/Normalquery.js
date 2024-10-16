const Resolvers = {
    Query:{
        hello: ()=>{
            return {msg:"hello world"}
        }
    }
}

module.exports = Resolvers;
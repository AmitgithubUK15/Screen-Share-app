const jwt = require("jsonwebtoken");

function setUser(user){
    return jwt.sign({
        id:user._id
    },process.env.SECRETKEY)
}

function getUser(token){
    if(!token) return null;
    try {
     return jwt.verify(token,process.env.SECRETKEY)
    }    
    catch (error) {
      return null;
    }
 }

module.exports = {
    setUser,
    getUser
}
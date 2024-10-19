const { getUser } = require("../utils/VerifyUser");

async function  RestrictLoggedUser({req,res}) {
  let token = req.headers.cookie;
  if (token) {
    let split = token.split("=");
    let user =  getUser(split[1]);
    if(user){
     return {req,res};
    }
    else{
     return false;
    }
      
    }
    else{
        return false;
    }
  }

  module.exports = {
    RestrictLoggedUser,
  }


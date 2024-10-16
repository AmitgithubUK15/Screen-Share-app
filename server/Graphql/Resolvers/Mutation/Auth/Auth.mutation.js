const { GoogleAuth } = require("../../../../controllers/Auth/Auth.controller")


function createuser(parent,args,context){
   return GoogleAuth(args);
}

module.exports = {
    createuser
}
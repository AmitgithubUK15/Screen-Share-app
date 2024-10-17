const { GoogleAuth, controll_createpassword } = require("../../../../controllers/Auth/Auth.controller")


function createuser(parent,args,context){
   return GoogleAuth(args);
}

function resolve_createpassword(parent,args,context){
    return controll_createpassword(args);

}

module.exports = {
    createuser,
    resolve_createpassword
}
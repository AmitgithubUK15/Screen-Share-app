const User = require("../../../../model/User.model")

function helloquery() {
    return {msg:"hello world"}
}

async function GetAlluser(){
    try {
    let user = await User.find();
    
    if(!user)  throw new InternalServerError("User not created Internal server error");

    return user;
    } catch (error) {
        throw new InternalServerError(error.message || 'Internal Server Error');
    }
}

module.exports = {
    helloquery,
    GetAlluser
}
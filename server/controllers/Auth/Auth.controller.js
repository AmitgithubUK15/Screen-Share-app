const User = require("../../model/User.model.js")

async function GoogleAuth(args){
  try {
    const user = await User({
        name:args.name,
        email:args.email,
        password:args.password
    })

    const process = await user.save();

    if(!process) return {msg:"Not created"};

    return {msg:"User Created"};
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    GoogleAuth,
}
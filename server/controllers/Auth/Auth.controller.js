const User = require("../../model/User.model.js")
const bcrypt = require("bcrypt");

async function GoogleAuth(args){
  try {
    console.log(args);
    const ExistedUser = await User.findOne({email:args.email});

    if(!ExistedUser){
      const GeneratePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedpassword = await bcrypt.hash(GeneratePassword,8);

      const user = await User({
        name:args.name,
        email:args.email,
        password:hashedpassword,
        profile:args.profile
    })

    const process = await user.save();

    if(!process) return {msg:"Not created"};    

    return {msg:"Login success"};  
    }
    else{
      return {msg:"Already Login success"}
    }
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    GoogleAuth,
}
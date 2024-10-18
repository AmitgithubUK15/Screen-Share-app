const User = require("../../../../model/User.model");
const bcrypt = require("bcrypt");

async function createuser(parent,args,context){
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
    
        return {msg:"Login success",email:user.email};  
        }
        else{
          return {msg:"Already Login success",email:ExistedUser.email}
        }
        
      } catch (error) {
        console.log(error);
      }
}

async function resolve_createpassword(parent,args,context){
    try {
        const hashedpassword = await bcrypt.hash(args.password,8);
    
        const finduser = await User.findOneAndUpdate(
          {email:args.email},
          {$set:{password:hashedpassword}},
          {new :true}
        );
        
        if(!finduser) return {msg:"Failed to create password"};
    
        return {msg:"Password create successfully"}
    
      } catch (error) {
        console.log(error);
      }

}

async function resolve_login(_,args,context) {
  try {
    let finduser = await User.findOne({email:args.email});

    if(!finduser) return {msg:"Invalid email Id"};

    let checkpassword = await bcrypt.compare(args.password,finduser.password);

    if(!checkpassword) return {msg: "Wrong password"};

    return {msg:"Login success",email:finduser.email};
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
    createuser,
    resolve_createpassword,
    resolve_login
}
const User = require("../../../../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setUser } = require("../../../../utils/VerifyUser");
const { RestrictLoggedUser } = require("../../../../Middleware/CheckAuth");

async function createuser(parent,args,{req,res}){
    try {
        
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
        
        let token = setUser(ExistedUser);

        res.cookie(
          'token',
           token,
           {
            httpOnly:true,
            secure:true,
            sameSite: 'None',
           }
        )
    
        return {msg:"Login success",email:user.email};  
        }
        else{
          let token = setUser(ExistedUser);

          res.cookie(
            'token',
             token,
             {
              httpOnly:true,
              secure:true,
              sameSite: 'None',
             }
          )
          return {msg:"Already Login success",email:ExistedUser.email}
        }
        
      } catch (error) {
        console.log(error);
      }
}

async function resolve_createpassword(parent,args,{req,res}){
    try {
        let auth = await RestrictLoggedUser({req,res});
        
        console.log(auth);
        if(auth === false){
          return {msg:"Please login again"};
        }
        else{
          const hashedpassword = await bcrypt.hash(args.password,8);
    
          const finduser = await User.findOneAndUpdate(
            {email:args.email},
            {$set:{password:hashedpassword}},
            {new :true}
          );
          
          if(!finduser) return {msg:"Failed to create password"};
      
          return {msg:"Password create successfully"}
        }
    
      } catch (error) {
        console.log(error);
      }

}

async function resolve_login(_,args,{req,res}) {
  try {
    let finduser = await User.findOne({email:args.email});

    if(!finduser) return {msg:"Invalid email Id"};

    let checkpassword = await bcrypt.compare(args.password,finduser.password);

    if(!checkpassword) return {msg: "Wrong password"};
     
     let token = jwt.sign({id:finduser._id},process.env.SECRETKEY,{expiresIn:'1h'})

     res.cookie(
      'token',
       token,
       {
        httpOnly:true,
        secure:true,
        sameSite: 'None',
       }
     )

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
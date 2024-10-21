const User = require("../../../../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setUser } = require("../../../../utils/VerifyUser");
const { RestrictLoggedUser } = require("../../../../Middleware/CheckAuth");
const { InternalServerError, UnauthorizedError, NotFoundError } = require("../../../../error/error");


// Google Auth
async function createuser(parent, args, { req, res }) {
  try {

    const ExistedUser = await User.findOne({ email: args.email });

    if (!ExistedUser) {
      const GeneratePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedpassword = await bcrypt.hash(GeneratePassword, 8);

      const user = await User({
        name: args.name,
        email: args.email,
        password: hashedpassword,
        profile: args.profile
      })

      const process = await user.save();

      if (!process) throw new InternalServerError("User not created Internal server error");

      let token = setUser(user);

      res.cookie(
        'token',
        token,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        }
      )

      const { password: pass, ...rest } = user._doc;

      return { msg: "Login success", user:rest };
    }
    else {
      let token = setUser(ExistedUser);

      res.cookie(
        'token',
        token,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        }
      )

      const { password: pass, ...rest } = ExistedUser._doc;
      return { msg: "Already Login success", user: rest }
    }

  } catch (error) {
    throw new InternalServerError(error.message || 'Internal Server Error');
  }
}


// Google Auth after password create option
async function resolve_createpassword(parent, args, { req, res }) {
  try {
    let auth = await RestrictLoggedUser({ req, res });


    if (auth === false) {
      throw new UnauthorizedError("Please login again");
    }
    else {
      const hashedpassword = await bcrypt.hash(args.password, 8);

      const finduser = await User.findOneAndUpdate(
        { email: args.email },
        { $set: { password: hashedpassword } },
        { new: true }
      );

      if (!finduser) return { msg: "Failed to create password" };

      return { msg: "Password create successfully" }
    }

  } catch (error) {
    throw new UnauthorizedError(error.message || 'Unauthorized');
  }

}



// Login with email and password
async function resolve_login(_, args, { req, res }) {
  try {
    let finduser = await User.findOne({ email: args.email });

    if (!finduser) throw new NotFoundError("User not found");

    let checkpassword = await bcrypt.compare(args.password, finduser.password);

    if (!checkpassword) throw new NotFoundError("Wrong password");

    let token = jwt.sign({ id: finduser._id }, process.env.SECRETKEY, { expiresIn: '1h' })

    res.cookie(
      'token',
      token,
      {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
    )
    const {password:pass,...rest} = finduser._doc;
    
    return { msg: "Login success", user:rest };
  } catch (error) {
    throw new NotFoundError(error.message || 'Not Found');
  }
}


module.exports = {
  createuser,
  resolve_createpassword,
  resolve_login
}
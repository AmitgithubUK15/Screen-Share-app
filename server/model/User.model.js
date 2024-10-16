const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String,
        default:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1729072768~exp=1729076368~hmac=913fc8e5b55ccab3e3cd0a9950fad99cf8d3450a438184e79cd5183ae8cb8b0b&w=740"
    }
},{timestamps:true});

const User = mongoose.model('user',UserSchema);

module.exports = User;
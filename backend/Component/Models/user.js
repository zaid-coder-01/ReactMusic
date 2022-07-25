require("../Connection.js");
const mongoose=require('mongoose');

const user=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    uname:{
        type:String
    },
    pass:{
        type:String
    },
    Pic:{
        type:String
    }
})

const Users=new mongoose.model("Users",user);

module.exports=Users;
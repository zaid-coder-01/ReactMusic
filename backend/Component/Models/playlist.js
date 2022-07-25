require('../Connection.js');
const mongoose=require("mongoose")
const playlist=new mongoose.Schema({
    name:{
        type:String
    },    
    uname:{
        type:String
    },
    pass:{
        type:String
    },
    pic:{
        type:String
    }
})

const Playlist=new mongoose.model("Playlist",playlist);

module.exports=Playlist;
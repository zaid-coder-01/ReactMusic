require('../Connection.js');
const mongoose=require("mongoose")

const Song=new mongoose.Schema({
    Category:{
        type:String
    },
    Name:{
        type:String
    },
    Artist:{
        type:String
    },
    Song:{
        type:String
    },
    SongImg:{
        type:String
    }
})

const Songs=new mongoose.model("Songs",Song);

module.exports=Songs;
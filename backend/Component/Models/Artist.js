require('../Connection.js');
const mongoose=require("mongoose")

const artist=new mongoose.Schema({
    Name:{
        type:String
    },
    Bio:{
        type:String
    },
    Img:{
        type:String
    }
})

const Artists=new mongoose.model("Artists",artist);

module.exports=Artists;
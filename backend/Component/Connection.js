const mongoose=require('mongoose');

const con=mongoose.connect("mongodb://localhost:27017/MusicZone",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connect")
}).catch((err)=>{
    console.log(err);
})
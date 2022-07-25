const express=require('express');
const app=express()
const cors=require("cors");
const multer=require("multer")
const gridfs=require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');
require("./Component/Connection.js");
const Users=require('./Component/Models/user.js')
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
const Artists=require('./Component/Models/Artist.js');
const Songs=require('./Component/Models/Songs.js');
const Playlist=require('./Component/Models/playlist.js');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
const storage = new GridFsStorage({
    url:"mongodb://localhost:27017/MusicZone",
    options:{useNewUrlParser:true,useUnifiedTopology:true},
    file:(req,file)=>{
      return{
          bucketName:"musiczone",
          filename:`${Date.now()}-musiczone-${file.originalname}`
      }
    }

});

const upload=multer({storage});


app.post("/newuser",upload.single('Pic'),(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const uname=req.body.uname;
    const pass=req.body.pass;
    const Pic=req.file.filename;
    const user=new Users({name,email,uname,pass,Pic});
    user.save();
    res.send("get success");
})
app.post("/uploadpic",upload.single('pic'),(req,res)=>{
    const name=req.body.name;
    const uname=req.body.uname;
    const pic=req.file.filename;
    const playlist=new Playlist({name,uname,pic});
    playlist.save();
    res.send("get success");
})
app.post("/login",(req,res)=>{
   const {uname,pass}=req.body;
   Users.findOne({uname:uname,pass:pass},(err,data)=>{
    if(err)
    {
        res.send("no");
    }   
    else{
        res.send(data);
    }
   })

})
let fs;
const con=mongoose.connection
con.once('open',()=>{
fs=gridfs(con.db,mongoose.mongo)
fs.collection('musiczone')
})
app.get("/users/:name",async(req,res)=>{
    
    try{
        const file=await fs.files.findOne({filename:req.params.name})
    const read=fs.createReadStream(file.filename)
    read.pipe(res)
    }catch(err){
        console.log(err);
    }
})

app.post("/addsongs",upload.fields([{name:'Song'},{name:'SongImg'}]),(req,res)=>{
    const {Category,Name,Artist}=req.body;
    const Song=req.files.Song[0].filename;
    const SongImg=req.files.SongImg[0].filename;
    const songs=new Songs({Category,Name,Artist,Song,SongImg})
    songs.save();
    res.send("ok");
})
app.post("/artists",upload.single('Img'),(req,res)=>{
    const {Name,Bio}=req.body;
    const Img=req.file.filename;
    const artists=new Artists({Name,Bio,Img});
    artists.save();
    res.send("ok");
})
app.get("/getSong",(req,res)=>{
    Songs.find({},(err,data)=>{
     
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})
app.post("/getSearch",(req,res)=>{
    const search=req.body.sear;
    Songs.find({Name:{ $regex :search}},(err,data)=>{
     
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})
app.post("/getpic",(req,res)=>{
    let uname=req.body.uname;
    Playlist.find({uname:uname},(err,data)=>{     
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})
app.get("/getartist",(req,res)=>{
    Artists.find({},(err,data)=>{     
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})
app.get("/getSong/:song",async (req,res)=>{
    
try{
    const file= await fs.files.findOne({filename:req.params.song})
    const read=fs.createReadStream(file.filename);
    read.pipe(res);
}
catch(err)
{
    res.send(err);
}
})

app.listen("8000",()=>{
    console.log("running");
})
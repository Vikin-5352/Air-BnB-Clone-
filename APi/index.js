import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import User from "./Models/Users.js";
import brcypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import download from 'image-downloader';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from "multer";
import { renameSync } from "fs";
import Place from "./Models/Place.js"



const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
__dirname = __dirname.replace(/\\/g, '/');
const secretKey="qwe456rtyu789iouiop";
dotenv.config();
const app = express();
const brcyptSalt = brcypt.genSaltSync(10);



app.use('/Uploads', express.static('Uploads')); // this middle ware is used to mention this directory as static file section
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect to 4000 sever successfully"));

app.get("/test", async (req, res) => {
  //    var testing_db_index= await User.collection.indexes();
  //    console.log(testing_db_index);
  //    res.json(testing_db_index);
  res.json("test ok");
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const userDetail = await User.collection.findOne({ email });
  console.log(userDetail);
  if (userDetail) {
    console.log("user mail exist");
    // res.json("user exist");
    const passValidator = brcypt.compareSync(password, userDetail.password);
    if (passValidator) {
      console.log("inside the password if");

      jwt.sign({email:userDetail.email,id:userDetail._id,name:userDetail},secretKey,{},(err,token)=>{
        if(err) throw err;
        console.log("inside jwt call back")
        res.cookie('token',token).json(userDetail);
      })


      //res.json("password matched with DB");
    } else {
      res.status(422).json("password does not match with DB");
    }
  } else {
    res.status(422).json("Email not exist");
    res.json("email not exist");
  }
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: brcypt.hashSync(password, brcyptSalt),
    });
    console.log(userDoc);
    res.json({ userDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


app.get('/',()=>{
  res.json("server working ");
})

app.get('/profile',(req,res)=>{
 // console.log("inside profile handle server")
  const {token}=req.cookies;
  if(token){
    jwt.verify(token,secretKey,{},async (err,user)=>{

      if(err) throw err;
      const {name, email,_id}=await User.findById(user.id);
      res.json({name, email,_id});
    })
  }
  else{
    res.json(null);
  }
   
})


app.get('/logout',(req,res)=>{
  console.log("user logged out")
  res.cookie('token','').json(true);
})

app.post('/upload_by_link',async (req,res)=>{
  console.log("inside the upload ");
  const {link}=req.body;
  console.log(link);
  const newName= Date.now()+".jpg";
  console.log(newName);
  const options = {
    url: link ,
    dest: __dirname+'/Uploads/'+newName,               // will be saved to /path/to/dest/image.jpg
  };
  
  await download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err));
    res.json(newName);


})


const photosMiddleware=multer({dest:'Uploads'})
app.post("/upload",photosMiddleware.single("photos"),(req,res)=>{
  console.log("object")
  console.log(req.file.filename);
  let uploadedFile="";
  const {path,originalname}=req.file;
  const parts=originalname.split('.');
  const ext=parts[parts.length-1];
  const newPath=path+'.'+ext;
  renameSync(path,newPath);
  uploadedFile=(uploadedFile+newPath).replace(/\\/g, '/');
  console.log(uploadedFile)
  res.json(uploadedFile);
 })

app.post('/places',(req,res)=>{
  const {token}=req.cookies;
  const {title,address, description,perks,extrainfo,checkin,checkout,maxguest,addedphotos}=req.body;
  jwt.verify(token,secretKey,{},async (err,user)=>{

    if(err) throw err;
   const placeDoc= await Place.create({
      owner:user.id,
      title,address, description,perks,extrainfo,checkin,checkout,maxguest,addedphotos
    })
    res.json(placeDoc);
  })
})


app.listen(4000);

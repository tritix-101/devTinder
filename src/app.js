const express = require("express");
const {connectDb}= require("./config/database");
const {User} =require("./models/user");
const app = express();
const port = 7777;



app.post("/signup",async(req,res)=>{
  const user=new User({
    firstName:"Jon",
    lastName:"Doe",
    age:25,
    email:"jon@doe123.com",
    password:"1234",
    gender:"Male"
  })

  try{
    await user.save();
    res.send("user created successfully");
  }
  catch(error){
    res.status(404).send("User not created");
  }
  
})

connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`server is listenting to port:${port}`);
    });
  })
  .catch((err) => {
    console.log("Database not connected");
  });



const express = require("express");
const app = express();
const port = 7777;

const {adminAuth, userAuth}=require("./middlewares/auth");

app.get("/admin",adminAuth,(req,res)=>{
    res.send("✅ Returning all the data (admin only)");
})

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("✅ Returning all the data (admin only)");
});

app.get("/user",userAuth,(req,res)=>{
  res.send("getting user data  ")
})

app.listen(port, () => {
  console.log(`server is listenting to port:${port}`);
});

const express= require("express");
const app=express();
const port=7777;

app.use("/test",(req,res)=>{
    res.send("welcome to devtinder");
})



app.listen(port,()=>{
    console.log(`server is listenting to port:${port}`);
})
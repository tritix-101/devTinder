const express= require("express");
const app=express();
const port=7777;

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Priyanka",lastName:"Kandula"});
})


app.get("/user/:name",(req,res)=>{
    console.log(req.params);
    res.send("exploring routing");
})

app.listen(port,()=>{
    console.log(`server is listenting to port:${port}`);
})
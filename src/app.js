const express= require("express");
const app=express();
const port=7777;

app.get("/user",(req,res)=>{
    res.send({firstName:"Priyanka",lastName:"Kandula"});
})
app.post("/user",(req,res)=>{
    res.send("Dta fetched from the server successfully")
})
app.delete("/user",(req,res)=>{
    res.send("delete call performed"); 
})
app.use("/test",(req,res)=>{
    res.send("welcome to devtinder");
})



app.listen(port,()=>{
    console.log(`server is listenting to port:${port}`);
})
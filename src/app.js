const express = require("express");
const app = express();
const port = 7777;

app.use(
  "/user",
  [(req, res,next) => {
    console.log("1st response");
    //res.send("Sending 1st response");
    next();
  },
  (req, res,next) => {
    console.log("2nd response");
    //res.send("2nd response");
    next();
  },
  (req,res,next)=>{
    console.log("3rd response");
    next();
    //res.send("3rd response");
  },
  (req,res,next)=>{
    console.log("4th response");
    res.send("4th response");
  }]
);

app.listen(port, () => {
  console.log(`server is listenting to port:${port}`);
});

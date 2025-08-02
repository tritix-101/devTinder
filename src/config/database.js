const mongoose = require("mongoose");
const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://tritix:173880kp@debutproject.bnvfxut.mongodb.net/devTinder");
}

module.exports={connectDb};
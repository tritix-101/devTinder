const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength:5,
        maxLength:20,
    },
    lastName:{
        type:String,
    },
    age:{
        type:Number,
        min:18,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
                
            }

        },
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"This is a default message",
    }

},{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports={User};
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: 5,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email Address:"+value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is a default message",
    },
  },
  { timestamps: true }
);

const User=mongoose.model("User",userSchema);
module.exports={User};
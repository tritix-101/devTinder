const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email Address:" + value);
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
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("inavalid photo url " + value);
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

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "SomeSecretKey", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByInput) {
  const user = this;
  const passwordHash = user.password;
  const isValidPassword = await bcrypt.compare(passwordByInput, passwordHash);

  return isValidPassword;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };

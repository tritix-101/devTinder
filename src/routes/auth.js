const express = require("express");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const authRouter = express.Router();

//signup route
authRouter.post("/signup", async (req, res) => {
  try {
    //Dynamic signup api
    //validating data
    validateSignupData(req);
    const { firstName, lastName, email, password, photoUrl,skills,about } = req.body;
    //encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    //instance of a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      photoUrl,
      skills,
      about,
    });
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//login route
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid email");
    }

    const isValidPassword = user.validatePassword(password);
    if (isValidPassword) {
      // //creating a token manually
      // const token="ghvjbkasxygyhbjkndscxbjksaxoiknasx";
      // //sending token by wrapping inside a cookie using method
      // res.cookie("token",token);

      //creating a json web token
      const token = await user.getJwt();
      //sending token by wrapping inside a cookie using method
      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//logout route
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logged out successfully");
});

module.exports = authRouter;

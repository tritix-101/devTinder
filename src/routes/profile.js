const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const validator = require("validator");

const {
  validateProfileData,
  valiadteEditPassword,
} = require("../utils/validation");

//profile route
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // const cookies=req.cookies;
  // console.log(cookies);
  // const {token} = cookies;
  // console.log(token);
  // res.send("user profile");

  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("user not found");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    //res.send(`${loggedInUser.firstName} , your profile updated successfully`);
    res.json({
      message: `${loggedInUser.firstName} , your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!valiadteEditPassword(req)) {
      throw new Error("invalid request for password change");
    }
    if (!validator.isStrongPassword(req.body.newPassword)) {
      throw new Error("Enter a Strong password");
    }
    const user = req.user;
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;

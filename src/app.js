const express = require("express");
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    //Dynamic signup api
    //validating data
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    //encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    //instance of a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//login api
app.post("/login", async (req, res) => {
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

//getting a user profile
app.get("/profile", userAuth, async (req, res) => {
  // const cookies=req.cookies;
  // console.log(cookies);
  // const {token} = cookies;
  // console.log(token);
  // res.send("user profile");

  try {
    const user=req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("user not found");
  }
});

//getting a user by a specified emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ email: userEmail });
    if (users.length == 0) {
      res.send("no users found");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log("user not found", error);
    res.status(404).send("Something went wrong");
  }
});
//getting all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log("error occured", error);
    res.status(404).send("users not found");
  }
});

//deleting a user by their id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    console.log("error ocurred:", error);
    res.status(404).send("something went wrong");
  }
});

//updating a user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["gender", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error();
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills are exceeded");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });

    console.log(user);
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("update failed:" + error.message);
  }
});

//sending connection request
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  try{
    res.send("Connection request is sent successfully");
  }catch(error){
    res.status.end("ERROR:"+error.message);
  }
})


connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`server is listenting to port:${port}`);
    });
  })
  .catch((err) => {
    console.log("Database not connected", err.message);
    throw err;
  });

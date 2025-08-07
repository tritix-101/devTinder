const express = require("express");
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
const app = express();
const port = 7777;

app.use(express.json());
app.post("/signup", async (req, res) => {
  //Dynamic signup api
  const user = new User(req.body);
  //console.log(user);
  // const user=new User({
  //   firstName:"Jon",
  //   lastName:"Doe",
  //   age:25,
  //   email:"jon@doe123.com",
  //   password:"1234",
  //   gender:"Male"
  // })

  try {
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("User not created :" + error.message);
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
    const ALLOWED_UPDATES = ["gender", "about", "age","skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error;
    }

    if(data?.skills.length>10){
      throw new Error("Skills are exceeded");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });

    console.log(user);
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("update failed:"+error.message);
  }
});

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

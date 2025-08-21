const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(403).send("Unautorized user");
  } else next();
};

const userAuth = async (req, res, next) => {
  //  const token = "xyz";
  //  const isUser = token === "xyz1";
  //  if (!isUser) {
  //    res.status(403).send("Unautorized user");
  //  } else next();

  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(400).send("Invalid Token!!!");
    }
    const decodedObj = await jwt.verify(token, "SomeSecretKey");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = { adminAuth, userAuth };

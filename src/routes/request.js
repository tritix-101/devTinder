const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest= require("../models/connectionRequest");
const { User } = require("../models/user");

//sending connection request route
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

  //handling for the correct status type
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }
  //handling user not found if a person sends a request to one who is not even exist
      const toUser=await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({message:"User not found!!"});
      }
  //handling if the user already sent a request and user gets a request from another person
      const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
          {fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId},
        ],
      });
      if(existingConnectionRequest){
        return res.status(400).json({message:"Connection request already exists!!"})
      }

  //saving the user into database
    const connectionRequest= new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data=await connectionRequest.save();
    res.json({
      message:"Connection request sent successfully",
      data,
    })
    } catch (error) {
      res.status(400).send("ERROR:" + error.message);
    }
  }
);

module.exports = requestRouter;

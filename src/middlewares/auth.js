const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAdmin= token==="xyz";
    if(!isAdmin){
        res.status(403).send("Unautorized user");
    }
    else
        next();
}

const userAuth=(req,res,next)=>{
     const token = "xyz";
     const isUser = token === "xyz1";
     if (!isUser) {
       res.status(403).send("Unautorized user");
     } else next();
}

module.exports={adminAuth,userAuth};
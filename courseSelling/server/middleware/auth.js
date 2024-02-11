const jwt=require("jsonwebtoken");

const adminSecret="admin";
const adminJwtAuthenticate=(req,res,next)=>{
    const decodedToken=jwt.verify(req.headers.token,adminSecret);
    if(decodedToken){
        next();
    }else{
        res.status(403).json({msg:"admin auth failed!!"});
    }
};

const userSecret="user";
const userJwtAuthenticate=(req,res,next)=>{
    const decodedToken=jwt.verify(req.headers.token,userSecret);
    if(decodedToken){
        next();
    }else{
        res.status(403).json({msg:"User auth failed!!"});
    }
};

module.exports={
    adminJwtAuthenticate,
    adminSecret,
    userJwtAuthenticate,
    userSecret
}
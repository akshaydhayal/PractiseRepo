const jwt=require("jsonwebtoken");

const adminSecret="admin";
const adminJwtAuthenticate=(req,res,next)=>{
    console.log("came to admin auth middleware");
    jwt.verify(req.headers.token,adminSecret,(err,decodedToken)=>{
        if(err){
            res.status(403).json({msg:"Admin auth failedd!!, wrong token"});
        }else{
            console.log(decodedToken);
            req.username=decodedToken;
            next();
        }
    })
    // const decodedToken=jwt.verify(req.headers.token,adminSecret);
    // console.log("decodedToken");
    // console.log(decodedToken);
    // if(decodedToken){
    //     req.username=decodedToken;
    //     next();
    // }else{
    //     res.status(403).json({msg:"admin auth failed!!"});
    // }
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
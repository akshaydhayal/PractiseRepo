cd const express=require("express");
const bodyParser=require("body-parser");

const app=express();

function middleware1(req,res,next){
    console.log("from middleware1");
    next();
}
app.use(bodyParser.json());
app.use(middleware1);

function calculateSum(n){
    let total=0;
    for(let i=0; i<=n; i++){
        total+=i;
    }
    return total;
}
app.get("/:any",(req,res)=>{
    console.log(req.params.any);
    console.log(req.query);
    console.log(req.headers);
    console.log(req.body);
    let ans=calculateSum(req.query.counter);
    let str="hello world and sum is : "+ans;
    // res.status(201).send(str);

    // res.sendFile(__dirname+"/index.html");
    res.status(202).json({msg:"success", sum:ans})
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})
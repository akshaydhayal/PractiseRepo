const express=require("express");

const app=express();
function calculateSum(n){
    let total=0;
    for(let i=0; i<=n; i++){
        total+=i;
    }
    return total;
}
app.get("/:any",(req,res)=>{
    console.log(req.params.any);
    let ans=calculateSum(req.query.counter);
    let str="hello world and sum is : "+ans;
    res.send(str);
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})
// const fs=require("fs");

// function sum(n){
//    let total=0;
//    for(let i=1; i<=n; i++){
//     total+=i;
//    } 
//    console.log(total);
// }
// function fileIsRead(err,content){
//     sum(content);
// }
// fs.readFile("number.txt","utf8",fileIsRead);
// sum(10);



// function hello(){
//     console.log("after 3 sec");
// }

// setTimeout(hello,10);

// sum(1000000000);
// sum(1000000000);
// console.log("hi")

// let ctr=1;
// function stopwatch(){
//     console.clear();
//     console.log(ctr);
//     ctr+=1;
// }
// setInterval(stopwatch, 1000);















//     let a=2;
//     let p=new Promise((resolve,reject)=>{
//         if(a==1){
//             resolve("Success");
//         }else{
//             reject("failed")
//         }
//     })

// p.then((msg)=>{
//     console.log("then mwthod and msg is : "+msg);
// }).catch((err)=>{
//     console.log(".catch method and msg is "+err);
// })





function hello(){
    console.log("hello");
}
let pp=new Promise((resolve,reject)=>{
    resolve(setTimeout(hello,10000));
});

console.log(pp);

pp.then((msgg)=>{
    console.log("inside then : "+msgg);
})


function hello(){
    console.log("hello");
}
function higherOrderFunction(callback){
    let d=new Date();
    setTimeout(callback,d.getDay()*1000);
}

higherOrderFunction(hello);
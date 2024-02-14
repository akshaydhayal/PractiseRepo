function sum1(a: number, b:number,
  op:"sum" | "sub"|"mul" | "div" ):number {
  if(op==="sum"){
    return a + b;
  }
  if(op==="sub"){
    return a - b;
  }
  if(op==="mul"){
    return a * b;
  }
  if(op==="div"){
    return a/b;
  }
  return -1;
}

let ans1:number = sum1(1, 3,"sub");
console.log(ans1);

// interface extends einterface, interface can implments class, interface can use other interfaces
//type can neither implement class nor can extend to other types, types can use otehr types
//types lets you do union and ors
// interface and types can use each other

type operation="sum" | "add" | "mul" | "div";
enum ArithmeticOp{
  Add,Sub,Mul,Div
}
//usng enum : ArithmeticOp.Add;

type Bird={
  name:string;
  age:number;
  address:Address;
}

function greetBird(bird:Bird){
  return "Hi "+bird.name+" ,your age is : "+bird.age+" and he lives in "+JSON.stringify(bird.address); 
}
console.log(greetBird({name:"Parrot",age:9,address:{city:"Sky",state:"Heaven"}}));

interface Address{
  city:string;
  state:string;
}
interface Animal extends Address{
  name:string;
  age:number;
}

interface Person{
  name:string;
  age:number;
  address:Address;
}

class PersonClass implements Person{
  name:string;
  age:number;
  address:Address;

  constructor(name,age,address){
    this.name=name;
    this.age=age;
    this.address=address;
  }
  sayHi(){
    return "hi "+this.name+" age is : "+this.age+" address : "+JSON.stringify(this.address);
  }
}

let p1=new PersonClass("Ram",27,{city:"blore",state:"Karnataka"});
console.log(p1.sayHi());


function greetPerson(person:Person):string{
  return "Hi "+person.name+" and you are "+person.age+" years old and he lives in "+person.address.city;
}
function greetAnimal(animal:Animal):string{
  return "Hi "+animal.name+" and you are "+animal.age+" years old and he lives in "+animal.city;
}

console.log(greetPerson({name:"Akshay",age:22,address:{city:"Jaipur",state:"Rajasthan"}}));
console.log(greetPerson({name:"Lion",age:12,address:{city:"Ranthambore",state:"Rajasthan"}}));

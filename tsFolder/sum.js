function sum1(a, b, op) {
    if (op === "sum") {
        return a + b;
    }
    if (op === "sub") {
        return a - b;
    }
    if (op === "mul") {
        return a * b;
    }
    if (op === "div") {
        return a / b;
    }
    return -1;
}
let ans1 = sum1(1, 3, "sub");
console.log(ans1);
function greetBird(bird) {
    return "Hi " + bird.name + " ,your age is : " + bird.age + " and he lives in " + JSON.stringify(bird.address);
}
console.log(greetBird({ name: "Parrot", age: 9, address: { city: "Sky", state: "Heaven" } }));
class PersonClass {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    sayHi() {
        return "hi " + this.name + " age is : " + this.age + " address : " + JSON.stringify(this.address);
    }
}
let p1 = new PersonClass("Ram", 27, { city: "blore", state: "Karnataka" });
console.log(p1.sayHi());
function greetPerson(person) {
    return "Hi " + person.name + " and you are " + person.age + " years old and he lives in " + person.address.city;
}
function greetAnimal(animal) {
    return "Hi " + animal.name + " and you are " + animal.age + " years old and he lives in " + animal.city;
}
console.log(greetPerson({ name: "Akshay", age: 22, address: { city: "Jaipur", state: "Rajasthan" } }));
console.log(greetPerson({ name: "Lion", age: 12, address: { city: "Ranthambore", state: "Rajasthan" } }));

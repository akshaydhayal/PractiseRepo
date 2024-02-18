function firstElement<T>(arr: T[]): T {
  return arr[0];
}

let ans11 = firstElement<number>([1, 2, 3]);
let ans2 = firstElement<string>(["one", "two", "three"]);
console.log(ans11);
console.log(ans2);

console.log(ans2.toUpperCase());

interface User {
  name: string;
  age: number;
}
type Gender = {
  sex: string;
};
function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}
let ans3 = swap<number, string>(1, "2");
let ans4 = swap<number, User>(1, { name: "Akshay", age: 24 });
let ans5 = swap<boolean, Gender>(true, { sex: "male" });
console.log(ans3);
console.log(ans4);
console.log(ans5);

//Partials
type UserUpdate = Partial<User>; // now UserUpdate is just User interface but with all fields set as options

function updateUser(id: number, user: UserUpdate) {
    console.log("user updated");                                  
}
updateUser(1, {});
updateUser(1, { name: "AKSHAY" }); //not necesaary to give all fileds as all field are options
updateUser(1, { age: 23 });

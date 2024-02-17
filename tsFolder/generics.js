function firstElement(arr) {
    return arr[0];
}
let ans11 = firstElement([1, 2, 3]);
let ans2 = firstElement(["one", "two", "three"]);
console.log(ans11);
console.log(ans2);
console.log(ans2.toUpperCase());
function swap(a, b) {
    return [b, a];
}
let ans3 = swap(1, "2");
let ans4 = swap(1, { name: "Akshay", age: 24 });
let ans5 = swap(true, { sex: "male" });
console.log(ans3);
console.log(ans4);
console.log(ans5);

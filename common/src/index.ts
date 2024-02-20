import {z} from "zod";

export const loginInput=z.object({
    username:z.string().min(1).max(50),
    password:z.string().min(1).max(30)
});
export function isOdd(n:number){
    return (n%2==0)? false: true;
}

console.log(isOdd(5));
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOdd = exports.loginInput = void 0;
const zod_1 = require("zod");
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(50),
    password: zod_1.z.string().min(1).max(30)
});
function isOdd(n) {
    return (n % 2 == 0) ? false : true;
}
exports.isOdd = isOdd;
console.log(isOdd(5));

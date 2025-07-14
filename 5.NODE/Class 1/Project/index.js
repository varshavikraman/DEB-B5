import array from "lodash"
//import {add} from "./addition.js"
import sum from "./addition.js"
import {mul} from "../product.js"
const a = [1,2,3,4,5];
console.log("Reverse of the array is ", array.reverse(a));

//console.log("Sum of two number " , add(1,2));
console.log("Sum of two number " , sum(1,2));

let x=2,y=9;
console.log("Product of two numbers ",mul(x,y));
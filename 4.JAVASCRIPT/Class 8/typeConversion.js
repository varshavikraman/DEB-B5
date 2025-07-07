//type conversion or coercion

console.log("20" + 5); //205 - string concatenation
console.log("20" -5); //15 - integer 
console.log("20" * 5); //100
console.log("20" / 5); //4

console.log(true +1);  //2
console.log(Number("42")); //42
console.log(Number("Hello")); //NaN

console.log(typeof String(123)); //"123" - string 123
console.log(String(true)); //true - String

console.log(Boolean(0)); //false
console.log(Boolean('')); //false
console.log(Boolean('Hello')); //true

console.log(parseInt("15.99")); //15
console.log(parseFloat("3.14")); //3.14
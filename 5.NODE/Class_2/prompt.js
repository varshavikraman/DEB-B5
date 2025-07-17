const prompt = require('prompt-sync')();

// const name = prompt('What is your name?')
// console.log(`Your name is ${name}.`);

console.log('Sum of Two Numbers');

const a = parseInt(prompt('Enter the First Number:'));
const b = parseInt(prompt('Enter the Second Number:'));
const sum = a + b;
console.log(`Sum of ${a} and ${b} is ${sum}`);


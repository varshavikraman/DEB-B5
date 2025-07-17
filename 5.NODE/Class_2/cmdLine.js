//{ const args = process.argv;

// const name = args[2];

// console.log(args);
// console.log(`Hello,${name}`);
//}

// {const args = process.argv;

// const name = args;

// console.log(args);
// }

// {const args = process.argv.slice(2);

// const name = args;

// console.log(`Hello,${name}`);
// }

const args = process.argv.slice(2);

const a = parseInt(args[0]);
const b = parseInt(args[1]);

const sum = a + b ;

console.log(`Sum = ${sum}`);

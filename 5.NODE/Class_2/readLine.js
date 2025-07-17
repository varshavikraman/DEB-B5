const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter First Number: ', (a) => {
    console.log(a);
    rl.question('Enter Second Number: ', (b) => {
        console.log(b);
        const sum = parseInt(a) + parseInt(b);
        console.log(`Sum of ${a} and ${b} is ${sum}`);
        rl.close();
    });

});
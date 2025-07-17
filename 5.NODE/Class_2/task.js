const args = process.argv.slice(2);

const a = args[0];
const task = []

if(a === 'add'){
    const b = args[1];
    task.push(b)
    console.log(`task add : ${b}`)
    console.log(`tasks : ${task}`)
}
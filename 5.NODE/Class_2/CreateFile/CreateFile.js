import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Ask for user input
rl.question('Enter some text to write into the file: ', (input) => {
  // Write to file
  fs.writeFile('Newfile.txt', input, (err) => {
    if (err) {
      console.error(" Error writing to file:", err);
    } else {
      console.log("Successfully wrote to Newfile.txt");
    }
    rl.close(); // Close the readline interface
  });
});

console.log('Welcome to JavaScript')
let a =10,b=30;
sum = a+b;
console.log(sum)

let a1 = 1 ,a2 =2,a3=3;
if (a1>a2) {
    if(a1>a3) {
        console.log('a1 is largest among a1,a2,a3');
    }else{
        console.log('a3 is largest among a1,a2,a3');
    } 
} else {
    if (a2>a3) {
        console.log('a2 is largest among a1,a2,a3');
    } else {
        console.log('a3 is largest among a1,a2,a3');
    }  
}

const array = [1,2,3,4,5,6,7,8,9,10];

const evenArray = ()=>{
    return array.filter(num=> num % 2===0);
};

console.log("evenArray =", evenArray());

// => unknown type; comparison between 'unknown' and 'any'
let userInput: unknown;
let userName: string;

// if (typeof userInput === 'string') {
//     userName = userInput;
// }

//userName = userInput; // here we have a problem; with 'any' type we would not have this problem';
// 'unknown' type is more flexible than 'any' type;

// => never type; comparison between 'never' and 'void'
function generateError(msg: string, code: Number): never {
    throw { message: msg, errorCode: code };
    while (true) { } // infinite loop => another function that returns nothing
}

let result = generateError('An error ocurred', 500) // this function returns 'never' in spite of when we hover over it we see 'void' type
console.log(result);
// generateError function never produces a value, because by throwing error we cancel its execution
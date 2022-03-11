// => unknown type; comparison between 'unknown' and 'any'
var userInput;
var userName;
// if (typeof userInput === 'string') {
//     userName = userInput;
// }
//userName = userInput; // here we have a problem; with 'any' type we would not have this problem';
// 'unknown' type is more flexible than 'any' type;
// => never type; comparison between 'never' and 'void'
function generateError(msg, code) {
    return { message: msg, errorCode: code };
}
var result = generateError('An error ocurred', 500);
console.log(result);
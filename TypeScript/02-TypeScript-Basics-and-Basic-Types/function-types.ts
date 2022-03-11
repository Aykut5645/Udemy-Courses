function add(n1: number, n2: number) {
    return n1 + n2;
}

function printResult(n1: number) {
    console.log('Result is ' + n1);
}

function addAndHandler(
    n1: number,
    n2: number,
    cb: (a: number) => void
) {
    const result = n1 + n2;
    cb(result);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number; // function type
// combineValues = printResult;
combineValues = add;

console.log(combineValues(8, 8));

addAndHandler(5, 3, printResult);
addAndHandler(
    2,
    9,
    (arg) => console.log('Anonymous result is ' + arg)
);
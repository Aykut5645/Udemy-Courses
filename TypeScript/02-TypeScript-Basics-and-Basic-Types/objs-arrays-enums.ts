// => objects
// const person: {
//     name: string;
//     age: number;
// } = {
// const person: {} = {
//     name: 'Max',
//     age: 30
// }
// const person: object = {
//     name: 'Max',
//     age: 30
// }
const person = {
    name: 'Max',
    age: 30
}; // => better sintax

console.log(person.name);

// nested object
const product = {
    id: 'abc1',
    price: 12.99,
    tags: ['great-offer', 'hot-and-new'],
    details: {
        title: 'Red Carpet',
        description: 'A great carpet - almost brand-new!'
    }
};

// => arrays
const arr = [1, 2, 3];

const student: {
    name: string,
    grades: number[],
    hobbies: string[],
    role: [number, string] // tuple type!
} = {
    name: 'John',
    grades: [5, 4, 3, 2, 6],
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};

// student.role = [0, 'admin', 'user'] // => TS can catch this, because tuples must have only two elements!
student.role.push('admin') // => TS cannot catch this error related to tuples types!

for (const hobby of student.hobbies) {
    console.log(hobby.toLocaleLowerCase());
    // hobby.map() => !!! ERROR !!!
}

let favoriteActivities: string[];

// if we want a mixed array
let mixedArray: any[]; // we are lose all the benefits that TS offers. Is not a good idea.


// enum type
enum Role { ADMIN, READ_ONLY, AUTHOR };

const student2 = {
    name: 'John',
    role: Role.ADMIN
};

console.log('>>>', student2);
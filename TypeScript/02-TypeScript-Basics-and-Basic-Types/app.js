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
var person = {
    name: 'Max',
    age: 30
}; // => better sintax
console.log(person.name);
// nested object
var product = {
    id: 'abc1',
    price: 12.99,
    tags: ['great-offer', 'hot-and-new'],
    details: {
        title: 'Red Carpet',
        description: 'A great carpet - almost brand-new!'
    }
};
// => arrays
var arr = [1, 2, 3];
var student = {
    name: 'John',
    grades: [5, 4, 3, 2, 6],
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};
// student.role = [0, 'admin', 'user'] // => TS can catch this, because tuples must have only two elements!
student.role.push('admin'); // => TS cannot catch this error related to tuples types!
for (var _i = 0, _a = student.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toLocaleLowerCase());
    // hobby.map() => !!! ERROR !!!
}
var favoriteActivities;
// if we want a mixed array
var mixedArray; // we are lose all the benefits that TS offers. Is not a good idea.
// enum type
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
var student2 = {
    name: 'John',
    role: Role.ADMIN
};
console.log('>>>', student2);

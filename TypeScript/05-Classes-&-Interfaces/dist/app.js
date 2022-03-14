"use strict";
class Department {
    constructor(n) {
        this.employees = [];
        this.name = n;
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    describe() {
        console.log('Department: ' + this.name);
    }
    printCount() {
        console.log(this.employees.length);
    }
}
const accounting = new Department('Accounting');
accounting.addEmployee('Pesho');
accounting.describe();
accounting.printCount();
//# sourceMappingURL=app.js.map
class Department {
    name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    addEmployee(employee: string) {
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
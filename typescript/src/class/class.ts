// public private protected


// private
// class Animal {
//     private name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }
// class Rhino extends Animal {
//     constructor(name: string) {
//         super(name);
//     }
// }
// class Employee {
//     private name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }

// let animal = new Animal('a');
// let rhino = new Rhino('r');
// let employee = new Employee('e');
// rhino = animal;


// protected
// class Person {
//     protected name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }
// class Employee extends Person {
//     private department: string;
//     constructor(name: string, department: string) {
//         super(name);
//         this.department =  department;
//     }
//     public getInfo() {
//         return `${this.name} - ${this.department}`;
//     }
// }
// let howard = new Employee('Howard', 'Sales');
// console.log(howard.getInfo());


// readonly
// class Octopus {
//     readonly name: string;
//     readonly numberOfLegs: number = 8;
//     constructor(name: string) {
//         this.name = name;
//     }
// }
// let o = new Octopus('raoo');
// o.numberOfLegs = 10;


// static property
// class Grid {
//     public static origin = { x: 0, y: 0 };
//     calculateDistanceFromOrigin(point: { x: number, y: number }) {
//         let xDist = point.x - Grid.origin.x;
//         let yDist = point.y - Grid.origin.y;
//         return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
//     }
//     constructor(public scale: number) { }
// }
// let grid = new Grid(1.0);
// console.log(grid.calculateDistanceFromOrigin({x: 10, y: 20}));


// abstract class
// abstract class Animal {
//     abstract makeSound(): void;
//     move(): void {
//         console.log('roaming the earth...');
//     }
// }

// abstract class Department {
//     constructor(public name: string) { }
//     printName(): void {
//         console.log("Department name: " + this.name);
//     }
//     abstract printMeeting(): void; // must be implemented in derived classes
// }
// class AccountingDepartment extends Department {
//     constructor() {
//         super('Accounting and Auditing');
//     }
//     printMeeting() {
//         console.log("The Accounting Department meets each Monday at 10am.");
//     }
// }
// let department: Department; // department = new Department();
// department = new AccountingDepartment();
// department.printName();
// department.printMeeting();


class A {
    name: ''
    constructor(name) {
        this.name = name;
    }
    
    say() {
        console.log(this.name);
    }
}

class B extends A {
    age: 0
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}


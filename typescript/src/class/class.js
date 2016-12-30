// public private protected
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var A = (function () {
    function A(name) {
        this.name = name;
    }
    A.prototype.say = function () {
        console.log(this.name);
    };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    return B;
}(A));

// class Animal {
//     public name: string;
//     constructor(theName: string) {
//         this.name = theName;
//     }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }
// class Snack extends Animal {
//     constructor(name: string) {
//         super(name);
//     }
//     move(distanceInMeters = 5) {
//         console.log("snack moving...");
//         super.move(distanceInMeters);
//     }
// }
// let snack = new Snack('Jorgey');
// snack.name;
// snack.move(100);
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
//         this.department = department;
//     }
//     public getInfo() {
//         return `Hello, my name is ${this.name}, and I work in ${this.department}.`;
//     }
// }
// let howard = new Employee("Howard", "Sales");
// console.log(howard.getInfo());
// // console.log(howard.name); // error
// abstract class Department {
//     constructor(public name: string) {
//     }
//     printName(): void {
//         console.log(`Department: ${this.name}`);
//     }
//     abstract printMetting(): void;
// }
// class AccountingDepartment extends Department {
//     constructor() {
//         super('AccountingDepartment');
//     }
//     printMetting(): void {
//         console.log(`${this.name} is having metting.`);
//     }
//     genetateReports(): void {
//         console.log("Generating accounting reports...");
//     }
// }
// let department: Department;
// // department = new Department();
// department = new AccountingDepartment();
// department.printName();
// department.printMetting();
// // department.generateReports();
var Point = (function () {
    function Point() {
    }
    Point.prototype.printPoint = function () {
        console.log("x: " + this.x + " y: " + this.y);
    };
    return Point;
}());
var ImplPoint3d = (function () {
    function ImplPoint3d() {
    }
    ImplPoint3d.prototype.printPoint = function () {
    };
    return ImplPoint3d;
}());

// generics
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// introduction
// function identity<T>(arg: T): T {
//     return arg;
// }
// let output = identity<string>("bla");
// console.log(output);
// generic types 1
// interface GenericIdentityFn {
//     <T>(arg: T): T
// }
// function identity<T>(arg: T): T {
//     return arg;
// }
// let myIdentity: GenericIdentityFn = identity;
// console.log(myIdentity("aaa"));
// generic types 2
// interface GenericIdentityFn<T> {
//     (arg: T): T
// }
// function identity<T>(arg: T): T {
//     return arg;
// }
// let myIdentity: GenericIdentityFn<string> = identity;
// console.log(myIdentity('bbb'));
// generic class
// class GenericClass<T> {
//     zeroValue: T;
//     add: (x: T, y: T) => T;
// }
// let myGenericNumber = new GenericClass<number>();
// myGenericNumber.zeroValue = 10;
// myGenericNumber.add = function(x, y) {
//     return x + y;
// }
// let myGenericString = new GenericClass<string>();
// myGenericString.zeroValue = 'blah';
// myGenericString.add = function(x, y) {
//     return `${x} ${y}`;
// }
// console.log(myGenericString.add(myGenericString.zeroValue, 'boob'));
// generic constraints
// interface LengthWise {
//     length: number
// }
// function loggingIdentity<T extends LengthWise>(arg: T): T {
//     console.log(arg.length);
//     return arg;
// }
// loggingIdentity({length: 1, name: 'foo'});
// class type
var Beekeeper = (function () {
    function Beekeeper() {
    }
    return Beekeeper;
}());
var ZooKeeper = (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
}());
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super.apply(this, arguments) || this;
    }
    return Bee;
}(Animal));
var Lion = (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        return _super.apply(this, arguments) || this;
    }
    return Lion;
}(Animal));
function findKeeper(a) {
    return a.prototype.keeper;
}
findKeeper(Lion).nametag; // "." get the nametag.got hasMask if change to Bee;

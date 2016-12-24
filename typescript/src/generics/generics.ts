// generics


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
class Beekeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numLegs: number;
}
class Bee extends Animal {
    keeper: Beekeeper;
}
class Lion extends Animal {
    keeper: ZooKeeper;
}
function findKeeper<A extends Animal, K>(a: {
    new (): A;
    prototype: { keeper: K }
}): K {
    return a.prototype.keeper;
}
findKeeper(Lion).nametag; // "." get the nametag.got hasMask if change to Bee;
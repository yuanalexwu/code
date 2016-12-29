// property enumerable writable configurable

// var ob = {a: 1}
// Object.defineProperty(ob, 'c', {
//   value: 3,
//   enumerable: false,
//   writable: false,
//   configurable: false
// })
// console.log(ob.c)
// console.log(Object.getOwnPropertyDescriptor(ob, 'c'))
// for (var prop in ob) {
//     console.log(prop)
// }
// console.log(Object.keys(ob))

// console.log(ob.c)
// ob.c = 4
// console.log(ob.c)

// var ob = Object.create(
//   Object.prototype,
//   {
//     a: { writable: true, enumerable: true, value: 1 },
//     b: { enumerable: false, value: 2 }
//   }
// )
// console.log(ob)
// console.log(JSON.stringify(ob))
// console.log(Object.getOwnPropertyNames(ob))
// ob.a = 11
// Object.freeze(ob)
// ob.a = 22
// console.log(ob)

// all TypeError
var ob = {}
Object.defineProperty(ob, 'a', { configurable: false, writable: true })
Object.defineProperty(ob, 'a', { enumerable: true})
Object.defineProperty(ob, 'a', { value: 12})
ob.a = 11
Object.defineProperty(ob, 'a', { writable: false}) // except this one
ob.a = 22
Object.defineProperty(ob, 'a', { writable: true})
console.log(ob)

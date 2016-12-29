// advance function


// bind
// function bind(fn, context) {
//     return function() {
//         fn.apply(context, arguments);
//     }
// };
// var handler = {
//     message: "blah blah..",
//     say: function() {
//         console.log(this.message);
//     }
// };
// var new_fun = bind(function() {
//     this.say();
// }, handler);
// new_fun();


// curry
function curry(fn) {
    // get all the parameters except the first one `fn`
    var outterArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
        // get all the parameters of the inner function
        var innerArgs = Array.prototype.slice.call(arguments);
        // contact the outter and inner parameters
        var finalArgs = outterArgs.concat(innerArgs);
        // apply the `fn`
        return fn.apply(null, finalArgs);
    };
}
function add(num1, num2) {
    return num1 + num2;
}
var curryAdd = curry(add, 10);
var result = curryAdd(5);
console.log(result);
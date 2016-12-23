for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
function foo() {
    var a = 10;
    // okay to capture 'a'
    return a;
}
// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
console.log(foo());
var data = [1, 2];
var first = data[0], second = data[1];
_a = [second, first], first = _a[0], second = _a[1];
console.log(first, second);
// ?表示可以传递或者不传递，如果传递类型必须为number
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
    console.log(a, b);
}
keepWholeObject({ a: '1' });
function f(_a) {
    var a = _a.a, _b = _a.b, b = _b === void 0 ? 10 : _b;
    console.log(a, b);
}
f({ a: '1' });
var _a;

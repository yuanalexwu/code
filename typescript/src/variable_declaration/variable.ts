for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}


function foo() {
    let a = 10;
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
console.log(foo());


let data: number[] = [1, 2];
let [first, second] = data;
[first, second] = [second, first];
console.log(first, second);


// ?表示可以传递或者不传递，如果传递类型必须为number
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
    console.log(a, b);
}
keepWholeObject({a: '1'});

// type
type C = {a: string, b?: number};
function f({ a, b = 10 }: C): void {
    console.log(a, b);
}
f({a: '1'});


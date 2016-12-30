// throllte


// setTimeout
// setTimeout(function() {
//     console.log(111)
//     setTimeout(arguments.callee, 500)
// }, 500)


// throllte process
function throllte(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
        method.call(context);
    }, 100);
}
function method() {
    console.log(1231231);
}
throllte(method); // this  will be clearTimeout
throllte(method); // only this will log info
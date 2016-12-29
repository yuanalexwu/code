// advance type
// Intersection types
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = first[id];
        }
    }
    return result;
}
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log('blah blah...');
    };
    return ConsoleLogger;
}());
var jim = extend(new Person('Jim'), new ConsoleLogger());
console.log(Object.keys(jim));
console.log(jim.name);
jim.log();

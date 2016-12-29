// function Circle(radius) {
//     this.radius = radius;
//     Circle.circlesMade++;
// }
// Circle.draw = function(circle, canvas) {
// };
// Object.defineProperty(Circle, "circlesMade", {
//     get: function() {
//         return !this._count ? 0 : this._count;
//     },
//     set: function(val) {
//         this._count = val;
//     }
// });
// Circle.prototype = {
//     area:  function() {
//         return Math.pow(this.radius, 2) * Math.PI;
//     }
// };
// Object.defineProperty(Circle.prototype, "radius", {
//     get: function() {
//         return this._radius;
//     },
//     set: function(radius) {
//         if (!Number.isInteger(radius)) {
//             throw new Error("需要整数");
//         }
//         this._radius = radius;
//     }
// });
// var circle = new Circle(10);
// console.log(circle.radius);
var Circle = (function () {
    function Circle(radius) {
        this.raduis = radius;
        Circle.circlesMade++;
    }
    Circle.draw = function (circle, canvas) {
        // Canvas 回执代码
    };
    Object.defineProperty(Circle, "circlesMade", {
        get: function () {
            return !this._count ? 0 : this._count;
        },
        set: function (val) {
            this._count = val;
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.area = function () {
        return Math.pow(this.radius, 2) * Math.PI;
    };
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (radius) {
            if (!Number.isInteger(radius)) {
                throw new Error("需要整数");
            }
            this._radius = radius;
        },
        enumerable: true,
        configurable: true
    });
    return Circle;
}());

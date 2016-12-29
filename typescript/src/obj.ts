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


class Circle {
    constructor(radius) {
        this.raduis = radius;
        Circle.circlesMade++;
    }
    static draw(circle, canvas) {
        // Canvas 回执代码
    }
    static get circlesMade() {
        return !this._count ? 0: this._count;
    }
    static set circlesMade(val) {
        this._count = val;
    }
    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    }


    get radius() {
        return this._radius;
    }
    set radius(radius) {
        if (!Number.isInteger(radius)) {
            throw new Error("需要整数");
        }
        this._radius = radius;
    }
}
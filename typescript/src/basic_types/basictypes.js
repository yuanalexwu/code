// boolean
var isDone = false;
// number
var decimal = 10;
var hex = 0x10;
var binary = 14;
// array
// var list: number[] = [1, 2, 3];
var list = [1, 2, 3];
var x = ['1', 2];
// enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Bule"] = 2] = "Bule";
})(Color || (Color = {}));
;
var color = Color.Bule;
console.log(color);
// any
var notSure = 4;
console.log(notSure.toFixed(2));
var notSure2 = 4;
// console.log(notSure2.toFixed(2));
var list2 = [1, '2'];
console.log(list);
// void
function warnUser() {
    alert('This is a warning message');
}
var unusable = undefined || null;

// Enums
// basic
// enum Direction {
//     Up = 1,
//     Down,
//     Left,
//     Right
// }
// console.log(Direction.Up);
// console.log(Direction.Down);
// console.log(Direction.Left);
// console.log(Direction.Right);
// console.log(Direction[Direction.Up]);
// ambient enum
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 1] = "A";
    Enum[Enum["B"] = 2] = "B";
    Enum[Enum["C"] = 2] = "C";
})(Enum || (Enum = {}));
console.log(Enum.A);
console.log(Enum.B);
console.log(Enum.C);

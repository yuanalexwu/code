// enum FileAccess {
//     None,
//     Read = 1 << 1,
//     Write = 1 << 2,
//     ReadWrite = Read || Write
// }
// console.log(FileAccess);
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 1] = "A";
    Enum[Enum["B"] = 2] = "B";
    Enum[Enum["C"] = 2] = "C";
})(Enum || (Enum = {}));
console.log(Enum);
console.log(Enum.C);
console.log(Enum.B);

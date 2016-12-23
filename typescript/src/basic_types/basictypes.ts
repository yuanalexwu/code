// boolean
var isDone: boolean = false;

// number
var decimal: number = 10;
var hex: number = 0x10;
var binary: number = 0b1110;

// array
// var list: number[] = [1, 2, 3];
var list: Array<number> = [1, 2, 3];

var x: [string, number] = ['1', 2];

// enum
enum Color {Red, Green, Bule};
var color: Color = Color.Bule;
console.log(color);

// any
var notSure: any = 4;
console.log(notSure.toFixed(2));
var notSure2: Object = 4;
// console.log(notSure2.toFixed(2));
var list2: any[] = [1, '2'];
console.log(list);

// void
function warnUser(): void {
    alert('This is a warning message');
}
let unusable: void = undefined || null;





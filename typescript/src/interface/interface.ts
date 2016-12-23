// interface in Typescript

// common
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }
// function createSquare(config: SquareConfig): { color: string; area: number } {
//     const { color = "white", width = 100 } = config;
//     const area = width * width;
//     return {color, area};
// }
// const square = createSquare({color: "blue"});
// console.log(square);


// readonly
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// let p1: Point = {x: 10, y: 20};


// function type
// interface SearchFunc {
//     (source: string, subString: string): boolean
// }
// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//     let result = source.search(subString);
//     if (result == -1) {
//         return false;
//     }
//     return true;
// }


// index type ???
// interface StringsArray {
//     [index: number]: string
// }
// let myArray:  StringsArray;
// myArray = ["Bob", "Fred"];
// let myStr: string = myArray["0"];
// console.log(myStr);


// class 1
// interface ClockInterface {
//     currentTime: Date;
//     setTime(d: Date);
// }
// class Clock implements ClockInterface {
//     currentTime: Date;
//     setTime(d: Date) {
//         this.currentTime = d;
//     }
//     constructor(h: number, m: number) {

//     }
// }


// class 2
// interface ClockInterface {
//     tick();
// }
// interface ClockConstructor {
//     new (hour: number, minute: number): ClockInterface
// }
// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
//     return new ctor(hour, minute);
// }
// class DigitalClock implements ClockInterface {
//     hour: number;
//     minute: number;
//     constructor(h: number, m: number) {
//         this.hour = h;
//         this.minute = m;
//     }
//     tick() {
//         console.log(`${this.hour}:${this.minute} beep beep`);
//     }
// }
// const digital = createClock(DigitalClock, 12, 12);
// digital.tick();


// extends
// interface Shape {
//     color: string;
// }
// interface Square extends Shape {
//     sideLength: number;
// }
// let square = <Square>{}
// square.color = 'blue';
// square.sideLength = 10;


// hybrid types
// interface Counter {
//     (start: number): string;
//     interval: number;
//     reset(): void;
// }
// function getCounter() {
//     let counter = <Counter>function(start: number) { };
//     counter.interval = 13;
//     counter.reset = function() { };
//     return counter;
// }


// interface extends class
class Control {
    private state: any;
}
interface SelectedControl extends Control {
    select(): void;
}
class Button extends Control {
    select() {}
}

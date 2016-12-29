// type interface and compatibility


// common
// window.onmousedown = function(mouseEvent: any) {
//     console.log(mouseEvent.buton);
// };


// compare function 
// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;
// y = x;
// x = y;


// compare return type
// let x = () => ({name: "Alice"});
// let y = () => ({name: "Alice", location: "Seattle"});
// x = y;
// y = x


// function paramter
enum EventType { Mouse, Keyboard }
interface Event {
    timestamp: number;
}
interface MouseEvent extends Event {
    x: number;
    y: number;
}
interface KeyEvent extends Event {
    keyCode: number
}
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
}
listenEvent(EventType.Mouse, ((e: MouseEvent) => console.log(`x: ${e.x} y: ${e.y}`)));
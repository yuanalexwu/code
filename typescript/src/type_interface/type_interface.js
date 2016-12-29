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
var EventType;
(function (EventType) {
    EventType[EventType["Mouse"] = 0] = "Mouse";
    EventType[EventType["Keyboard"] = 1] = "Keyboard";
})(EventType || (EventType = {}));
function listenEvent(eventType, handler) {
}
listenEvent(EventType.Mouse, (function (e) { return console.log("x: " + e.x + " y: " + e.y); }));

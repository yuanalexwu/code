// function


// common
// let myFunc: (x: number, y: number) => number = function (x: number, y: number) {
//     return x + y;
// }


// optional and default parameters
// function buildName(firstName: string, lastName = "Smith") {
//     return `${firstName} ${lastName}`;
// }
// console.log(buildName("Olive"));


// rest parameters
// function buildName(firstName: string, ...restOfName: string[]) {
//     return `${firstName} ${restOfName.join(' ')}`;
// }
// console.log(buildName("Smith", "a", "b", "c"));


// this in function 1
// let desk = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function() {
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);
//             return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//         };
//     }
// };
// let cardPicker = desk.createCardPicker();
// let pickedCard = cardPicker();
// console.log(`card: ${pickedCard.card}, suit: ${pickedCard.suit}`);

// this in function 2
// interface Card {
//     suit: string;
//     card: number
// }
// interface Desk {
//     suits: string[];
//     cards: number[];
//     createCardPicker(this: Desk): () => Card;
// }
// let desk: Desk = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function(this: Desk) {
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);
//             return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//         }
//     }
// };
// let cardPicker = desk.createCardPicker();
// let pickedCard = cardPicker();
// console.log(`card: ${pickedCard.card}, suit: ${pickedCard.suit}`);

// this parameters in callback
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
class Handler {
    info: string;
    onClick(this: void, e: Event) {
        console.log('clicked!');
    }
}
let h = new Handler();
let ui: UIElement;
ui.addClickListener(h.onClick);
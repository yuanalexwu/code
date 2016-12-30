// custom event page: 637
// this is the Obsoverable Pattern

function EventTarget () {
  this.handlers = {}
}
EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function (type, handler) {
    if (typeof this.handlers[type] == 'undefined') {
      this.handlers[type] = []
    }
    this.handlers[type].push(handler)
  },
  removeHandler: function (type, handler) {
    var handlers = this.handlers[type]
    if (handlers instanceof Array) {
      for (var i = 0;i < handlers.length; i++) {
        if (handler === handlers[i]) {
          break
        }
      }
      handlers.splice(i, 1)
    }
  },
  fire: function (event) {
    if (this.handlers[event.type] instanceof Array) {
      var handlers = this.handlers[event.type]
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(this, event)
      }
    }
  }
}
function handleMessage (event) {
  console.log('Msg: ' + event.message)
}
function handleMessage2 (event) {
  console.log('Msg2: ' + event.message)
}
var target = new EventTarget()
target.addHandler('message', handleMessage)
target.addHandler('message', handleMessage2)
console.log('-------fire() start------')
target.fire({type: 'message', message: 'blah blah ...'}) // trigger the event, all the subscribed function will be fired
console.log('-------fire() end------')
target.removeHandler('message', handleMessage2) // remove a subscribed function
console.log('-------fire() start------')
target.fire({type: 'message', message: 'blah blah ...'}) // trigger the event again, this will only fire one function
console.log('-------fire() end------')

// inherit the event
function Person (name, age) {
  EventTarget.call(this); // 1.this will init the `handlers`(inherit all the property and method in EventTarget, but not the stuffs of EventTarget prototype!)
  this.name = name
  this.age = age
}
Person.prototype = new EventTarget() // inherit all the prototype functions that EventTarget has
Person.prototype.constructor = Person // set the correct constructor
Person.prototype.say = function (message) { // add new function for the subclass Person
  this.fire({type: 'message', message: message})
}
function handleSay(event) {
    console.log(this.name + ' says: ' + event.message);
}
var person = new Person('Jack', 26)
person.addHandler('message', handleSay)
console.log('-------say() start------')
person.say('hello')
console.log('-------say() end------')

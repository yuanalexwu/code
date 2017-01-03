// draggable(this file is included in `dragdrop.html`.u should check it on the browser)

var EventUtil = {
  addHandler: function (dom, type, handler) {
    dom.addEventListener(type, handler)
  },
  removeHandler: function (dom, type, handler) {
    dom.removeEventListener(type, handler)
  }
}
var DragDrop = function () {
  var dragdrop = new function () {}, // here we can extends the `EventTarget` in custom_event.js. and fire event
    dragging = null,
    offsetX = 0,
    offsetY = 0

  function handleEvent (event) {
    var target = event.target
    switch (event.type) {
      case 'mousedown':
        if (target.className.indexOf('draggable') > -1) {
          dragging = target // init the dragging when `mousedown`
          offsetX = event.clientX - target.offsetLeft // set the offset relative to current x position
          offsetY = event.clientY - target.offsetTop // set the offset relartive to current y position
        }
        break
      case 'mousemove':
        if (dragging !== null) {
          dragging.style.left = event.clientX - offsetX + 'px'
          dragging.style.top = event.clientY - offsetY + 'px'
        }
        break
      case 'mouseup':
        dragging = null
        offsetX = 0
        offsetY = 0
        break
    }
  }

  dragdrop.enable = function () {
    EventUtil.addHandler(document, 'mousedown', handleEvent)
    EventUtil.addHandler(document, 'mousemove', handleEvent)
    EventUtil.addHandler(document, 'mouseup', handleEvent)
  }
  dragdrop.disable = function () {
    EventUtil.removeHandler(document, 'mousedown', handleEvent)
    EventUtil.removeHandler(document, 'mousemove', handleEvent)
    EventUtil.removeHandler(document, 'mouseup', handleEvent)
  }

  return dragdrop
}

var dragDrop = DragDrop()
dragDrop.enable() // start

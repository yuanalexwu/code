// function
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.onClick = function (e) {
        console.log('clicked!');
    };
    return Handler;
}());
var h = new Handler();
var ui;
ui.addClickListener(h.onClick);

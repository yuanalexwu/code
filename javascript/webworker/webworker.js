// web worker
var worker = new Worker('worker.js');
worker.onmessage = function(event) {
	console.log('receive response from worker');
	var list = event.data.list;
	console.log(list);
};
worker.onerror = function(event) {
    console.log("Error: " + event.filename + " Line: " + event.lineno + " Msg: " + event.message);
};
var data = Array.from(Array(10000000), function() { return Math.floor(Math.random() * 1000);});
worker.postMessage({list: data});
// worker.terminate(); // terminate worker immediately

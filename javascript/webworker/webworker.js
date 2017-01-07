// web worker
var worker = new Worker('worker.js');
worker.onmessage = function(event) {
	console.log('receive response from worker');
	var data = event.data;
	console.log(data);
};
worker.onerror = function(event) {
    console.log("Error: " + event.filename + " Line: " + event.lineno + " Msg: " + event.message);
};
worker.postMessage({name: 'jack', age: 27});
// worker.terminate(); // terminate worker immediately

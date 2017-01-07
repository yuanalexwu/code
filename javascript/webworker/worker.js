// worker process
onmessage = function(e) {
	console.log('Message receivec from main script');
	var list = e.data.list;
	var rst = list.sort(function(a, b) { return a - b;});
	postMessage({list: rst});
}
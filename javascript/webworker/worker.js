// worker process
onmessage = function(e) {
	console.log('Message receivec from main script');
	var data = e.data;
	setTimeout(function() {
		postMessage(data);
	}, 2000);
}
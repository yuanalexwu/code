window.onload = function() {
	var box = document.querySelector('.box');
	box.addEventListener('touchstart', function(e) {
		console.log(e.type);
	});
	box.addEventListener('touchmove', function(e) {
		console.log(e.type);
	});
	box.addEventListener('touchend', function(e) {
		console.log(e.type);
	});
}
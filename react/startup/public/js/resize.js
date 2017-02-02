/**
 * Created by jack on 2016/10/19.
 */
window.onload = function () {
	var baseSize = 640;
	var baseFontSize = 16;
	function autoSize(width) {
		// 如果我们设计稿为750，则传入750，否则都认为是640
		width = width ? width : 640;
		// 为了便于计算，在参照宽度下设html字号为100px，
		var units = width / baseFontSize;
		var clientWidth = document.documentElement.clientWidth;
		clientWidth = clientWidth > 1080 ? 1080 : clientWidth; //设定最大值
		clientWidth = clientWidth <= 240 ? 240 : clientWidth; //设定最小值
		var calFontSize = clientWidth / units; //计算html字体的字号
		document.documentElement.style.fontSize = calFontSize + 'px';
	}
	autoSize(baseSize);
	window.onresize = function () {
		autoSize(baseSize)
	}
};

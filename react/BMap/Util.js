/**
 * Created by jack on 2016/10/19.
 */
	
	
class Util {
	constructor() {
	}
	
	importJs(jsUri, cb) {
		const scriptElement = document.createElement('script');
		scriptElement.src = jsUri;
		scriptElement.type = 'text/javascript';
		// scriptElement.async = true;
		if (typeof cb === 'function') {
			scriptElement.onload = () => {
				cb();
			};
		}
		document.body.appendChild(scriptElement);
	}

	importCss(cssUri) {
		const styleElement = document.createElement('link');
		styleElement.href = cssUri;
		styleElement.rel = 'stylesheet';
		document.head.appendChild(styleElement);
	}
}


export default Util;


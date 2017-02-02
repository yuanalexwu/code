import URLSearchParams from 'url-search-params';
import config from '../../config';


const DEFAULT_TIMEOUT = 10000; // 默认超时时间 10s


function* objectEntries(obj) {
	const keys = Object.getOwnPropertyNames(obj);
	let idx, key, value;
	for (idx in keys) {
		if (keys.hasOwnProperty(idx)) {
			key = keys[ idx ];
			value = obj[ key ];
			yield [ key, value ];
		}
	}
}


export const fetchRequest = (data) => {
	let searchParams = new URLSearchParams();
	for (const [key='', value=''] of objectEntries(data)) {
		searchParams.append(key, value);
	}

	const headers = new Headers();
	headers.set('Content-Type', 'application/x-www-form-urlencoded');
	headers.set('Accept', 'application/json, text/javascript, */*;');
	const fetch_options = {
		method: 'POST',
		headers,
		body: searchParams.toString(),
		credentials: 'include'
	};

	const { api_uri } = config;
	return fetch(api_uri, fetch_options).then((res) => {
		if (res.ok) {
			return res.json();
		}
		Promise.reject(new Error(res.status));
	});
};


const request = (fetch_promise, timeout = DEFAULT_TIMEOUT) => {
	let abort_fn = null;
	const abort_promise = new Promise((resolve, reject) => {
		abort_fn = () => {
			reject('timeout');
		};
	});

	const abortable_promise = Promise.race([
		fetch_promise,
		abort_promise
	]);

	// handle timeout
	setTimeout(() => {
		abort_fn();
	}, timeout);

	return abortable_promise;
};


export default request;
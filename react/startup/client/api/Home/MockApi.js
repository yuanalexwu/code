/**
 * Created by jack on 2016/10/19.
 */
import config from '../../config';


export function getHomeInitData(timeout = 0) {
	const slider_img_path = `${config.root_path}/public/img/swiper.jpg`;
	const quan_img_path = `${config.root_path}/public/img/quan.jpg`;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const mock = {
				'sliders': [
					{
						Id: '10001',
						url: 'http://www.baidu.com',
						img: slider_img_path
					},
					{
						Id: '10002',
						url: 'http://www.baidu.com',
						img: slider_img_path
					},
					{
						Id: '10003',
						url: 'http://www.baidu.com',
						img: slider_img_path
					},
				],
				'quans': [
					{
						Id: '10001',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-11-15',
						state: '1', // 1:未抢购，2：待使用, 3: 已使用
					},
					{
						Id: '10002',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '1',
					},
					{
						Id: '10003',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '1',
					},
					{
						Id: '10004',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '1',
					},
					{
						Id: '10005',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '1',
					},
				]
			};
			const response = {
				return_type: '1',
				data: mock
			};
			resolve(response);
		}, timeout);
	});
}
/**
 * Created by jack on 2016/10/19.
 */
// 微团订单
/* 
 1>已付款
 2>已清关
 3>已发货
 4>交易成功
 5>作废
 6>退换货
 */
import config from '../../config';


export function getUserInitData(timeout = 0) {
	const avatar_img_path = `${config.root_path}/public/img/avatar.png`;
	const quan_img_path = `${config.root_path}/public/img/quan.jpg`;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const mock = {
				name: '小小强',
				avatar: avatar_img_path,
				arrive_time: '2',
				avaiable_quan: '1',
				balance: '28.50',
				'quans': [
					{
						Id: '10002',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '2',
						barcode: '12311231231123',
					},
					{
						Id: '10003',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-11-22',
						state: '2',
						barcode: '12311231231123',
					},
					{
						Id: '10004',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '3',
						barcode: '12311231231123',
					},
					{
						Id: '10005',
						name: '康师傅黑胶牛肉面111g*2桶',
						origin_price: '12.12',
						price: '7',
						img: quan_img_path,
						start: '2016-10-01',
						end: '2016-10-15',
						state: '3',
						barcode: '12311231231123',
					},
				],
				orders: [
					{
						"Id": "2749",
						"no": "201610170847284752391",
						"f_openid": null,
						"member_openid": "o7WT5juwUiX0EBahvvBH7mJjZgEA",
						"payment": "1",
						"create_time": "2016-10-17 08:47:41",
						"money": "49.00",
						"shipping_fee": null,
						"consignee_name": "吴渊",
						"consignee_province": "江苏省",
						"consignee_city": "苏州市",
						"consigneeD_dstrict": "常熟市",
						"consignee_address": "通港路常客隆物流中心",
						"consignee_mobile": "18651186472",
						"state": "1",
						"ship_id": null,
						"ship_no": null,
						"update_time": null,
						"ship_time": null,
						"wx_quan_id": "209",
						"dikou": "10",
						"image": "14744231358683.jpg",
						"name": "云南双A级蒙自石榴（果园现采直发）",
						"num": "1",
						"price": "59.00",
						"wx_goods_id": "10"
					},
					{
						"Id": "2709",
						"no": "201610121752208444681",
						"f_openid": null,
						"member_openid": "o7WT5juwUiX0EBahvvBH7mJjZgEA",
						"payment": null,
						"create_time": "2016-10-12 17:52:20",
						"money": "59.00",
						"shipping_fee": null,
						"consignee_name": "无缘",
						"consignee_province": "江苏省",
						"consignee_city": "苏州市",
						"consigneeD_dstrict": "常熟市",
						"consignee_address": "新合作常客隆连锁超市有限公司物流中心东北158米",
						"consignee_mobile": "1231231231",
						"state": "0",
						"ship_id": null,
						"ship_no": null,
						"update_time": null,
						"ship_time": null,
						"wx_quan_id": null,
						"dikou": "0",
						"image": "14744231358683.jpg",
						"name": "云南双A级蒙自石榴（果园现采直发）",
						"num": "1",
						"price": "59.00",
						"wx_goods_id": "10"
					},
					{
						"Id": "2465",
						"no": "201609230954204444891",
						"f_openid": "o7WT5jpNmcnxI0oVF1XjAnVVpQgI",
						"member_openid": "o7WT5juwUiX0EBahvvBH7mJjZgEA",
						"payment": null,
						"create_time": "2016-09-23 09:54:20",
						"money": "59.00",
						"shipping_fee": null,
						"consignee_name": "阿道夫撒",
						"consignee_province": "江苏省",
						"consignee_city": "苏州市",
						"consigneeD_dstrict": "张家港市",
						"consignee_address": "通港路详细地址好",
						"consignee_mobile": "1111111111",
						"state": "5",
						"ship_id": "shentong",
						"ship_no": "888676189152",
						"update_time": null,
						"ship_time": null,
						"wx_quan_id": null,
						"dikou": "0",
						"image": "14744231358683.jpg",
						"name": "云南双A级蒙自石榴（果园现采直发）",
						"num": "1",
						"price": "59.00",
						"wx_goods_id": "10"
					}
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
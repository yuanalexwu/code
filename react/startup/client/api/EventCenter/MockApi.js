/**
 * Created by jack on 2016/10/19.
 */
import config from '../../config';


export function getEventInitData(timeout = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const mock = [
				{
					Id: "7",
					link_url: "http://www.csckl.com/ytj/phone/wxActivity/pangxie/index.php",
					pic_url: "px1.jpg",
					e_time: "2016-11-16 10:10:10",
					state: '1', // 1: 销售中, 2: 已售罄
				},
				{
					Id: "6",
					link_url: "http://www.csckl.com/ytj/phone/mzth.php?c=710",
					pic_url: "xpg.jpg",
					e_time: "2016-11-18 09:11:20",
					state: '1', // 1: 销售中, 2: 已售罄
				},
				{
					Id: "4",
					link_url: "http://www.csckl.com/ytj/phone/mzth.php?c=2047",
					pic_url: "slt.jpg",
					e_time: "2016-11-17 10:10:10",
					state: '2', // 1: 销售中, 2: 已售罄
				},
			];
			const response = {
				state: '1',
				data: mock
			};
			resolve(response);
		}, timeout);
	});
}
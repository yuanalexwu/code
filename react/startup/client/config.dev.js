// 服务器域名
const api_server = '';
// 项目所在服务器对应的目录
const root_path = '/event_jyl/event10';
// 图片根路径
const img_path = 'http://www.csckl.com/uploadfiles/cklpic/';


const config = {
	dev: false,
	root_path,
	api_uri: `${api_server}/event_api/appservice.php`,
	img_path,
};


export default config
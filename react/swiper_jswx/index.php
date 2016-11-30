<?
session_start();


$config = require_once("config.php");
require_once("JSSDK.php");

$jsSdk = new JSSDK($config['WX_APPID'], $config['WX_APPSERCET']);
$signPackage = $jsSdk->getSignPackage();


define('LOG_PATH', 'E:/tmp/');
define('API_URL', '127.0.0.1/event_api/appservice.php');


function httpPost($post_string, $url = '')
{
    if (empty($url)) {
        $url = API_URL;
    }
    $post_string = json_encode($post_string);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_string);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($post_string))
    );
    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
}

function redirect_current_url()
{
    $url = "Location: /event/event10/Home";
    header($url);
    exit;
}

// 检查用户是否已经微信登录
require_once "weixin/lib/WxPay.Api.php";
require_once "weixin/example/WxPay.JsApiPay.php";
require_once 'weixin/example/log.php';
$logHandler = new CLogFileHandler(LOG_PATH . 'weixin/event10/' . date('Y_m_d') . '.log');
Log::Init($logHandler, 15);

// 生产上注释
//$_SESSION['openid'] = 'o7WT5juwUiX0EBahvvBH7mJjZgEA';

$openid = $_SESSION['openid'];
if (empty($openid)) {
    $tools = new JsApiPay();
    $user_info = $tools->GetOpenid();
    if (empty($user_info)) {
        redirect_current_url();
    }

    $openid = $user_info['openid'];
    $_SESSION['openid'] = $openid;

    $avatar = $user_info['headimgurl'];
    $nickname = $user_info['nickname'];
    // 更新用户信息
    if ($avatar && $nickname) {
        $data = array(
            'handler' => 'Event10',
            'action' => 'initUserInfo',
            'openid' => $openid,
            'name' => $nickname,
            'avatar' => $avatar,
        );
        $rst = httpPost($data);

//        Log::DEBUG('-------------');
//        Log::DEBUG($rst);
//        Log::DEBUG('-------------');
    }
}


?>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <title>Loading...</title>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
        // 微信初始化
        wx.config({
            debug: false,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'checkJsApi',
                'openLocation',
                'getLocation'
            ]
        });


        // 微信jsdk加载成功后调用ready内的方法
        wx.ready(function () {
            // 检查是否支持jssdk
            wx.checkJsApi({
                jsApiList: [
                    'getLocation'
                ],
                success: function (rst) {
                    if (rst.checkResult.getLocation == false) {
                        alert("你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！");
                        return;
                    }
                }
            });
        });
    </script>
</head>
<body style="margin:0px;padding:0px;">
<div id="root"></div>
</body>
</html>


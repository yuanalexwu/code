<?php
echo 2222;
exit;
session_start();

//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';


//初始化日志
$logHandler= new CLogFileHandler('../logs/' .date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();


echo $openId;
exit;




?>

<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<title>正在跳转...</title>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script type="text/javascript">
//调用微信JS api 支付
function jsApiCall()
{
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest',
		<?php echo $jsApiParameters; ?>,
		function(res){
			// WeixinJSBridge.log(res.err_msg);
			// window.alert(res.err_code+'|'+res.err_desc+'|'+res.err_msg);
			if (res.err_msg == 'get_brand_wcpay_request:ok') {
				// 支付成功
			} else {
				window.alert('支付失败');
			}
			var url = '/ytj/phone/pay.php';
			window.location.href = url;
		}
	);
}

function callpay()
{
	if (typeof WeixinJSBridge == "undefined"){
	    if( document.addEventListener ){
	        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
	    }else if (document.attachEvent){
	        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
	        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
	    }
	}else{
	    jsApiCall();
	}
}
//获取共享地址
// function editAddress()
// {
// 	WeixinJSBridge.invoke(
// 		'editAddress',
// 		<?php echo $editAddress; ?>,
// 		function(res){
// 			var value1 = res.proviceFirstStageName;
// 			var value2 = res.addressCitySecondStageName;
// 			var value3 = res.addressCountiesThirdStageName;
// 			var value4 = res.addressDetailInfo;
// 			var tel = res.telNumber;

// 			alert(value1 + value2 + value3 + value4 + ":" + tel);
// 		}
// 	);
// }

window.onload = function(){
	var error_msg = '<?php echo $error_msg;?>';
	if (error_msg) {
		window.alert(error_msg);
		 window.location.href ='/ytj/phone/pay.php';
	}

	callpay();
};

</script>
<body>
<div class="msg"  style="text-align:center; font-size:22px; padding-top:300px"><b>家易乐账户充值</b></div>

<div class="msg"  style="text-align:center; font-size:22px">充值金额:<?=$row[0]['money']?>元</div>
</body>
</html>
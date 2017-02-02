<?php

session_start();

include_once "../../../../system/class/Sx_order.class.php";

$_Sx_order = new Sx_order();
$row = $_Sx_order->searchNews("", array('no' => $_GET['no']), 1, 10, "Id DESC", "WHERE 1=1 ");


//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';


//初始化日志
$logHandler = new CLogFileHandler('../logs/' . date('Y-m-d') . '.log');
$log = Log::Init($logHandler, 15);


$order_sn = $row[0]['no'];
$order_amount = $row[0]['money'] * 100;

if (in_array('', array($order_sn, $order_amount))) {
    //header("Location: " . BASE_PATH . "my_order.php");
    exit;
}
//打印输出数组信息
function printf_info($data)
{
    foreach ($data as $key => $value) {
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}

//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();

Log::DEBUG($openId);

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody('家易乐购物订单：' . $order_sn);
// $input->SetAttach("test2");
// $input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
$input->SetOut_trade_no($order_sn . '_jiayile');
$input->SetTotal_fee(($order_amount));
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
// $input->SetGoods_tag("test");
// $input->SetNotify_url("http://www.315pangxie.com/weixin_test/wx_pay/example/notify.php");
$input->SetNotify_url("http://www.csckl.com/ytj/phone/" . 'wzf/example/notify_order.php');
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);

$order = WxPayApi::unifiedOrder($input);
// echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
// printf_info($order);
$error_msg = '';
try {
    $jsApiParameters = $tools->GetJsApiParameters($order);
} catch (WxPayException $e) {
    Log::ERROR($e->getMessage());
    $error_msg = $e->getMessage();
}

//获取共享收货地址js函数参数
// $editAddress = $tools->GetEditAddressParameters();

//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */


$TITLE_ = '微信支付-正在跳转';
?>

<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<title>微信支付-正在跳转...</title>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <script type="text/javascript">
        //调用微信JS api 支付
        function jsApiCall() {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                <?php echo $jsApiParameters; ?>,
                function (res) {
                    // WeixinJSBridge.log(res.err_msg);
                    // window.alert(res.err_code+'|'+res.err_desc+'|'+res.err_msg);
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        // 支付成功
                    } else {
                        window.alert('支付失败');
                    }
                    var url = '/ytj/phone/order_fu.php';
                    window.location.href = url;
                }
            );
        }

        function callpay() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            } else {
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

        window.onload = function () {
            var error_msg = '<?php echo $error_msg;?>';
            if (error_msg) {
                window.alert(error_msg);
                window.location.href = '/ytj/phone/order_fu.php';
            }

            callpay();
        };

    </script>
<body>
<div class="msg" style="text-align:center; font-size:22px; padding-top:300px"><b>家易乐购物订单</b></div>

<div class="msg" style="text-align:center; font-size:22px">订单金额:<?= $row[0]['money'] ?>元</div>
</body>
</html>
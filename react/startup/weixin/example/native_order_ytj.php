<?php
ini_set('date.timezone', 'Asia/Shanghai');
session_start();
require_once('../base.php');

include_once "../../../../system/class/Sx_order.class.php";

$_Sx_order = new Sx_order();
$row = $_Sx_order->searchNews("", array('no' => $_GET['no']), 1, 10, "Id DESC", "WHERE 1=1 ");

require_once "../lib/WxPay.Api.php";
require_once "WxPay.NativePay.php";
require_once 'log.php';


$logHandler = new CLogFileHandler('../' . date('Y-m-d') . '.log');
$log = Log::Init($logHandler, 15);


//模式一
/**
 * 流程：
 * 1、组装包含支付信息的url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、确定支付之后，微信服务器会回调预先配置的回调地址，在【微信开放平台-微信支付-支付配置】中进行配置
 * 4、在接到回调通知之后，用户进行统一下单支付，并返回支付信息以完成支付（见：native_notify.php）
 * 5、支付完成之后，微信服务器会通知支付成功
 * 6、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */
$notify = new NativePay();
// $url1 = $notify->GetPrePayUrl("123456789");

//模式二
/**
 * 流程：
 * 1、调用统一下单，取得code_url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、支付完成之后，微信服务器会通知支付成功
 * 4、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */

// get 订单编号
// 用户回调时候标识系统中的底单


if ($row[0]['no'] == "") {
    echo "无此单号";
    exit;
}

$order_sn = $row[0]['no'];
$order_amount = $row[0]['money'] * 100;


//if (empty($order_sn) && empty($user_id)) {
//header("Location: " . ROOT_PATH . 'index.php?app=buyer_order');
//header("Location: http://zshzgs.com/card_chong.php");
//exit;
//}

//$table_name = 'ecm_order';
//$where_array = array('order_sn' => $order_sn, 'buyer_id' => $user_id, 'status' => '11');
//$order = $mysql->query_with_array_1st($table_name, $where_array);
//if ($mysql->num != 1) {
//	header("Location: " . ROOT_PATH . 'index.php?app=buyer_order');
//	exit;
//}

//$order_price = implode('', explode('.', $order['order_amount']));
//$order_price = ltrim($order_price, '0');

$input = new WxPayUnifiedOrder();
$input->SetBody('家易乐购物订单：' . $order_sn);
// $input->SetAttach("test");
$input->SetOut_trade_no($order_sn . '_jiayile');
$input->SetTotal_fee($order_amount);
$input->SetTime_start(date("YmdHis"));
// 10分种有效期
$input->SetTime_expire(date("YmdHis", time() + 600));
// $input->SetGoods_tag("test");
$input->SetNotify_url("http://www.csckl.com/ytj/phone/wzf/example/notify_order.php");
$input->SetTrade_type("NATIVE");
$input->SetProduct_id($order_sn);
$result = $notify->GetPayUrl($input);

$url2 = $result["code_url"];


$qr_url = 'http://www.csckl.com/ytj/phone/wzf/example/qrcode.php?data=' . urlencode($url2);
?>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>微信支付-<?php echo '家易乐购物订单：' . $order_sn; ?></title>
    <script src="/js/jquery-1.4.2.min.js"></script>
</head>
<body>
<div style="width: 100%; text-align: center;height: 200px;">
    <h2>使用微信支付<span style="color:#F00">￥<?= $row[0]['money'] ?></span></h2>
    <img src="<?php echo $qr_url; ?>" style="width: 294px; height: 294px;"/>
    <br/>

    <div style="display: inline-block;width: 294px;line-height: 30px;height: 30px; "><img src="../../../../img/wx.jpg"
                                                                                          width="294" height="77"></div>
</div>
</body>
</html>
<?php
ini_set('date.timezone', 'Asia/Shanghai');
error_reporting(E_ERROR);

require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';


require_once "../base.php";

include_once "../../../../system/class/Sx_order.class.php";
include_once "../../../../system/Functions.php";

//初始化日志
$logHandler = new CLogFileHandler(LOG_PATH . 'wx_pay/' . date('Y-m-d') . '.log');
$log = Log::Init($logHandler, 15);

class PayNotifyCallBack extends WxPayNotify
{
    private $data;

    public function getData()
    {
        return $this->data;
    }

    //查询订单
    public function Queryorder($transaction_id)
    {
        $input = new WxPayOrderQuery();
        $input->SetTransaction_id($transaction_id);
        $result = WxPayApi::orderQuery($input);
        Log::DEBUG("query:" . json_encode($result));
        if (array_key_exists("return_code", $result)
            && array_key_exists("result_code", $result)
            && $result["return_code"] == "SUCCESS"
            && $result["result_code"] == "SUCCESS"
        ) {
            return true;
        }
        return false;
    }

    //重写回调处理函数
    public function NotifyProcess($data, &$msg)
    {
        $this->data = $data;
        Log::DEBUG("call back:" . json_encode($data));
        $notfiyOutput = array();

        if (!array_key_exists("transaction_id", $data)) {
            $msg = "输入参数不正确";
            return false;
        }
        //查询订单，判断订单真实性
        if (!$this->Queryorder($data["transaction_id"])) {
            $msg = "订单查询失败";
            return false;
        }

        return true;
    }
}

Log::DEBUG("begin notify");
$notify = new PayNotifyCallBack();
$notify_result = $notify->Handle(false);

// 修改订单信息
if ($notify_result) {
    $data = $notify->getData();
    // 获取订单信息(返回订单的编号为 '12345678_时间戳')
    $tmp = $data['out_trade_no'];
    $tmp = explode('_', $tmp);
    $out_trade_no = $tmp[0];

    if (substr($out_trade_no, 0, 1) <> 5) {
        $_Sx_order = new Sx_order();
        $row = $_Sx_order->searchNews($query, array('no' => $out_trade_no), 1, 100, $orderBy = "Id DESC", $Where = "WHERE state='" . iconv('UTF-8', 'GBK', '未付款') . "'");


        $_Sx_order1 = new Sx_order();
        $row = $_Sx_order1->searchNews("", array('no' => $out_trade_no), 1, 1, $orderBy = "Id DESC", $Where = "WHERE 1 ");
        if ($row[0]['state'] == iconv('UTF-8', 'GBK', '未付款')) {
            $_Sx_order = new Sx_order($row[0]['Id']);
            $_Sx_order->apply(array('state' => iconv('UTF-8', 'GBK', '已付款')));
        }


    } else {
        $piliang_array = get_huizong_no($out_trade_no);
        $no_arry = explode(',', $piliang_array[0]['sx_order_nos']);
        $row[0]['money'] = $piliang_array[0]['price'];
        for ($i = 0; $i < count($no_arry); $i++) {
            $_Sx_order = new Sx_order();
            $row = $_Sx_order->searchNews($query, array('no' => $no_arry[$i]), 1, 100, $orderBy = "Id DESC", $Where = "WHERE state='" . iconv('UTF-8', 'GBK', '未付款') . "'");
            $_Sx_order = new Sx_order($row[0]['Id']);
            $_Sx_order->apply(array(iconv('UTF-8', 'GBK', '已付款')));
        }

    }


} else {
    Log::ERROR('error12333333333333333333');
}

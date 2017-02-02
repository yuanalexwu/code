<?php
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);

require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';


require_once "../base.php";

include_once "../../../../system/class/Online_pay.class.php";
include "../../../../system/class/member.class.php";
$_Online_pay=new Online_pay();

//初始化日志
$logHandler= new CLogFileHandler(LOG_PATH . 'wx_pay/' .date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

class PayNotifyCallBack extends WxPayNotify
{
	private $data;
	public function getData() {
		return $this->data;
	}
	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{
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
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
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
	
	 $dingdan=$out_trade_no;
		$row=$_Online_pay->searchNews("",array('no'=>$out_trade_no),1,10,$orderBy="Id DESC",$Where=" WHERE 1 ");	
		$_member=new Member($row[0]['member_id']);
		$_Online_pay1=new Online_pay($row[0]['Id']);
		
		    $infoArray1['beizhu']=$row[0]['Id'].'#'.$row[0]['state'].'#'.$out_trade_no;
			$_Online_pay1->apply($infoArray1);
		
		if($row[0]['state']=='0'){
			
			$infoArray['state']=1;
			$infoArray['update_date']=date("Y-m-d H:i:s");
			$_Online_pay1->apply($infoArray);
			$client = new SoapClient("http://58.211.236.158:5511/CardService/Interface/PosSale.asmx?WSDL");//此处替换成您实际的引用地址
  
   
			$array=array();
			$array[0]='000001';//商户编码（上线时给一个固定值）
			$array[1]='718888';//部门编码（上线时给一个固定值）
			$array[2]='DZSW';//收银员编码(传DZSW)
			$array[3]='';//收银员名称(空值) 
			$array[4]=$_member->info_array['TIAO_MA'];//卡面号
			$array[5]=$_member->info_array['UID'];//卡内号 
			$array[6]=date("Ymd");//  消费日期 （YYYYMMDD）
			$array[7]=date("His");//  消费时间 （HHNNSS）
			$array[8]=(number_format($row[0]['money'], 2,'.',''));// 充值金额
			$array[9]=(number_format($row[0]['money'], 2,'.',''));// 实收金额
			$array[10]=md5($array[0].$array[4].$array[6].$array[7].$array[8]);//  数据校验码（MD5加密，商户+收银员编+卡内号+消费日期+消费时间+消费金额）
			$array[11]='微支付';// 充值方式
			$array[12]='';// 支付账户
			
			
			 $param = array("DataInfo"=>implode("|",$array));
			 $result = $client->__soapCall('CardCharge',array('parameters' => $param)); 

        $infoArray2['beizhu1']=$row[0]['Id'].'#'.$row[0]['state'].'#'.iconv("UTF-8",'GBK',$result->CardChargeResult);
			$_Online_pay1->apply($infoArray2);
   
  
  if(substr(iconv("UTF-8",'GBK',$result->CardChargeResult),0,2)=='OK'){
	  
	  
  }
		}	
		
		
		 
		
}else{
	Log::ERROR('error12333333333333333333');
	}

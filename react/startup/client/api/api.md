## 请求地址
**http://120.27.140.172/wx_ckl_quan.php**
## 备注
### 图片访问路径
```url
http://www.csckl.com/uploadfiles/cklpic/
```
## 1.获取券商品list
入参
```json
{
    "json_type"："member_ckl_goods_list"
}
```
输出
```json
{
"total": "商品数量",
"data":  "商品明细"
}
```

## 2.微信登陆更新头像等信息
输入
```json
{
    "json_type"："member_ckl_update"
    "member_openid"："客户微信openid"
    "member_name"："客户微信昵称"
    "pic_url"："客户微信头像url"
    "key"："md5(openid . 'ckl')"
}
```
输出
```json
{
    "code"："0000": 成功, "2000": 会员参数不能为空, "1001": 签名不对
    "message"："返回信息"
}
```

## 3.会员中心
输入
```json
{
    "json_type"："member_ckl_info"
    "member_openid"："客户微信openid"
    "key"："md5(openid . 'ckl')"
}
```
输出
```json
{
    "code"："0000": 成功, "1001": 签名不对
    "message"："返回信息"
}
```

## 4.绑定手机号码
输入
```json
{
    "json_type":"member_ckl_info_update",
    "member_openid":"客户微信openid",
    "tel":"手机号码",
    "key":"md5(openid . 'ckl')"
}
```
输出
```json
{
    "code"："0000": 成功, "2000": 会员参数不能为空, "1001": 签名不对
    "message"："返回信息"
}
```

## 5.获取我的优惠券
输入
```json
{
    "json_type":"member_ckl_my_quan",
    "member_openid":"客户微信openid",
    "key":"md5(openid . 'ckl')"
}
```
输出
```json
{
    "code"："0000": 成功, "2000": 会员参数不能为空, "1001": 签名不对, "1002": 微信openid未注册
    "message"："返回信息"
    "data": 优惠券列表信息
}
```

## 6.抢券
输入
```json
{
    "json_type":"member_ckl_quan_add",
    "member_openid":"客户微信openid",
    "wx_ckl_goods_id": "微信商品id",
    "wx_ckl_md": "门店id",
    "key":"md5(openid . 'ckl')"
}
```
输出
```json
{
    // "2000": 会员参数不能为空, "1001": 签名不对, "1002": 微信openid未注册, 1003: 没有该商品,
    // 1004: 该商品还未上架, 1005: 已抢完, 1006: 已经抢完 或者 已经等于每张券的限定个人抢购数量不能再抢
    "code"："0000": 成功 
    "message"："返回信息"
    "data": 优惠券信息(code:0000时返回此字段)
}
```

## 7.门店列表
输入
```json
{
    "json_type":"member_ckl_md_list"
}
```
输出
```json
{
    // "2000": 会员参数不能为空, "1001": 签名不对, "1002": 微信openid未注册, 1003: 没有该商品,
    // 1004: 该商品还未上架, 1005: 已抢完, 1006: 已经抢完 或者 已经等于每张券的限定个人抢购数量不能再抢
    "code"："0000": 成功 
    "message"："返回信息"
    "data": 优惠券信息(code:0000时返回此字段)
}
```

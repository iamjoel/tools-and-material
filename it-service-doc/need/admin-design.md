# 管理后台详细设计
## 所有菜单
* 商品
  * 商品
  * 商品分类
* 订单
  * 订单
  * 退款
* 营销
  * 广告
  * 会员
  * 积分规则
...

## 角色
店员，店长，长运营

## 店员 菜单
* 商品
  * 商品
  * 商品分类

## 店长 菜单
* 商品
  * 商品
  * 商品分类
* 订单
  * 订单
  * 退款

## 运营 菜单
* 营销
  * 广告
  * 会员
  * 积分规则

## 页面
### 商品列表页
搜索条件: 名称

字段： 名称，标题，分类，价格，Sku，图文...

操作： 新增(店员，店长)，上下架(店长)

## 商品编辑页
字段：名称(必填)，分类(必填，远程下拉，来自商品分类)，是否热门（必填，布尔值），价格(必填，数字)...

操作： 保存，保存为草稿，审核(店员)



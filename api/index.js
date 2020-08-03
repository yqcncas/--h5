// 请在此对象写后端的请求接口列表
export default {
	// 此处写开发调试地址--自动生效
	// dev: 'http://60.180.141.120:8083/',
	// pro: 'http://60.180.141.120:8083/',
	// dev:'http://jkb.bajiaostar.xyz/',
	// 此处写线上环境地址--自动生效
	// pro: 'http://jkb.bajiaostar.xyz/',
	
	dev: 'http://admin.jjkkx.com/',
	pro: 'http://admin.jjkkx.com/',
	
	baseLocation: 'https://img.bajiaostar.com/', 　//　上传图片
	uptoken: "/api/uptoken", // 七牛uptoken
	// 七牛
	unloadLocation: 'https://upload.qiniup.com/', 
	
	
	appid: 'wx5ce43c078d7bcc23', // appid
	redirect_url: 'http://h5.jjkkx.com/', // 重定向       
	
	/**
	 * 登录
	 */
	register: "/anon/register", //注册
	login: "/anon/login", // 登录
	sms: "/anon/sms", // 短信验证
	
	/**
	 * 用户信息
	 */
	userInfo: "/api/userInfo", // 用户信息
	signList: "/api/signList", // 打卡记录
	sign: "/api/sign", // 打卡
	maxMoney: "/api/maxMoney", // 怎样收益最多
	editUserInfo: "/api/editUserInfo", // 编辑用户信息
	book: "/api/book", // 健康资料与服务
	signFlag: "/api/signFlag", // 可否打卡
	remaindList: "/api/signRemaindList", // 提醒记录
	goodsList: "/api/goodsList", // 商品列表
	goodsInfo: "/api/goodsInfo", // 商品详情
	careInfo: "/api/careInfo", // 关爱卡详情
	myChild: "/api/myChild", // 我的影响力
	moneyList: "/api/moneyList", // 资金流水列表 | 类型 1.现金2.jk 3.ai
	careList: "/api/careList", // 我的关爱卡
	

	
	/**
	 * 地址
	 */
	editAddress: "/api/editAddress", // 修改收货地址 defaultFlag:是否默认 1是0否
	deleteAddress: "/api/deleteAddress", // 删除收货地址
	addressList: "/api/addressList", // 收货地址列表
	addressInfo: "/api/addressInfo", // 收货地址详情
	addAddress: "/api/addAddress", // 添加收货地址 defaultFlag:是否默认 1是0否
	addressDefault: "/api/addressDefault", // 获取默认地址
	
	/**
	 * 订单
	 */
	order: "/api/order", // 生成订单
	pay: "/api/pay", // 支付
	careOrder: "/api/careOrder",// g1.关爱卡生成订单
	orderInfo: "/api/orderInfo", // 订单详情
	orderList: "/api/orderList", // 订单列表 | 状态 0.已取消 10.待支付 20.待发货 30.已完成
	cancelOrder: "/api/cancelOrder", // 取消订单
	confirmOrder: "/api/confirmOrder", // 确认收货
	firstOrder: "/api/firstOrder", // 生成预订单
	careOrder2: "/api/careOrder2", // 关爱卡续费订单
	webPay: "/api/wxPay/wapPay", // H5支付
	gzPay: '/api/wxPay/webPay' , // 公众号支付
	getOpenIdFn: "/anon/getOpenId", // 获取openId
	


	/**
	 * 首页
	 */
	indexInfo: "/api/indexInfo", // 首页数据（轮播、视频、jk、ai数据）
	msg: "/api/msg", // 消息列表
	readMsg: "/api/readMsg", // 读取消息
	

	/**
	 * 意见反馈
	 */
	addIssue: "/api/addIssue", // 意见反馈
	aboutUs: "/api/aboutUs", // 关于我们
	
	
	

}

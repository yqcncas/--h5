<template>
	<view class="carecard">
		<view class="carecard-header">
			<image src="../../static/image/index/11.png" mode=""></image>
		</view>
		<view class="carecard-main">
		<!-- 	<view class="carecard-main-top"><span>21</span>天预计收益<span>5000</span>积分</view>
			<view class="carecard-main-center">图文详情</view> -->
			<view class="carecard-main-footer">
				<jyf-parser :html="richText" ref="article"></jyf-parser>
			</view>
			
		</view>
		<view class="buy-button" @click.stop="showPayShow">
			<view class="buy-button-title">¥<span>{{careCardPrice}}</span></view>
			<view class="buy-button-bottom">立刻关爱</view>
		</view>
		
		<u-popup v-model="payshow" mode="bottom">
			<view class="payshow-box">
				<view class="payshow-header">
					<view class="payshow-header-left">现在支付</view>
					<view class="payshow-header-right">¥<span>{{careCardPrice}}</span></view>
				</view>
				<view class="pay-way">
					<view class="pay-way-left">
						<image src="../../static/image/index/12.png" mode=""></image>
						<view class="wxpay">微信支付</view>
					</view>
					<view class="pay-way-right">
						<label class="radio"><radio value="r1" checked="true" /></label>
					</view>
				</view>
				<view class="pay-tip">我同意<span>购买守则</span>，我也同意支付以下所示的总金额（含服务费）。</view>
				<view class="pay" @click="payMoney">确认支付</view>
			</view>
		</u-popup>
		
		<u-popup v-model="paySucessShow" mode="center">
			<view class="paySucessShow-box">
				<view class="paySucessShow-box-top">
					<image src="../../static/image/index/13.png" mode=""></image>
				</view>
				<view class="paySucessShow-box-center">支付成功,去关爱他人</view>
				<view class="paySucessShow-box-footer">
					<image :src="careQrCode" mode="aspectFill"></image>
				</view>
				<view class="paySucessShow-box-button">长按二维码, 保存图片</view>
			</view>
		</u-popup>
		
		<Tabbar :pagePath = "pagePath"></Tabbar>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	var jweixin = require('jweixin-module');
	export default {
		onLoad(options) {
			if (options.code) {
				console.log(options.code)
			}
			
			this.initCareInfo()
			var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				
			} else {
				if (uni.getStorageSync('careCardOrderId')) {
					this.liulanqiPay()
				}
			}
		},
		onShow() {
			this.pagePath = this.$route.fullPath
			console.log(this.pagePath)
			
			// 若是浏览器打开的页面
			
			
		},
		data () {
			return {
				pagePath: '', // 路径
				payshow: false, // 支付弹框
				paySucessShow: false, // 支付成功弹框
				richText: '我是富文本',
				careCardPrice: 0,
				productId: 0,
				orderId: 0,
				orderFlag : 0,
				orderErrMsg: '',
				code: '',
				openid: '',
				careQrCode: ''
			}
		},
		methods: {
			// 浏览器打开的支付处理
			async liulanqiPay() {
			
				let orderId = uni.getStorageSync('careCardOrderId')
				// 获取详情
				let successRes = await this.$fetch(this.$api.orderInfo, {orderId: orderId}, "GET", "FORM")
				if (successRes.data.status == 30) {
					uni.showToast({
						icon: 'success',
						title: '支付成功'
					})
					this.careQrCode = successRes.data.carePic
					if (this.careQrCode) {
						this.paySucessShow = true
						this.payshow = false
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '支付失败'
					})
				}
				uni.removeStorageSync('careCardOrderId')
			},
			// 保存图片
			// saveImg () {
			// 	uni.saveImageToPhotosAlbum({
			// 		filePath: this.careQrCode,
			// 		success: function () {
			// 			uni.showToast({
			// 				icon: 'success',
			// 				title: '保存成功'
			// 			})
			// 		},
			// 		fail: () => {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '保存失败'
			// 			})
			// 		}
			// 	});
			// },
			// 截取code
			getWechatCode () {
				 function parse_url (url) {
				// 定义函数
				var pattern = /(\w+)=(\w+)/gi // 定义正则表达式
				var parames = {} // 定义数组
				url.replace(pattern, function (a, b, c) {
				  parames[b] = c
				})
				return parames // 返回这个数组.
				 }
				 // 获取当前url   取到code
				 let url = window.location.href
				 let params = parse_url(url)
				 return params.code
			},
			// 支付弹框
			showPayShow () {
				this.payshow = true
				this.initCareOrder()
			},
			// 支付
			async payMoney () {
				if (this.orderFlag == 500) {
					return uni.showToast({
						icon: 'none',
						title: this.orderErrMsg
					})
				}
				uni.showLoading({
					title: '加载中'
				})
				var me = this
				var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
				 //在微信中打开
				 console.log('微信打开')
				 if (uni.getStorageSync('openId')) {
					 this.openid = uni.getStorageSync('openId')
				
					 let res = await this.$fetch(this.$api.gzPay, {openId: this.openid, orderId: this.orderId}, "POST", 'FORM')
					 let payInfo = JSON.parse(res.data)

					 uni.hideLoading()
					 jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx5ce43c078d7bcc23', // 必填，公众号的唯一标识
						timestamp:payInfo.timeStamp, // 必填，生成签名的时间戳
						nonceStr:payInfo.nonceStr, // 必填，生成签名的随机串
						signature:payInfo.paySign, // 必填，签名，见附录1
						jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				
					 
					 
					 jweixin.ready(() =>{
						jweixin.checkJsApi({
							jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
							success: function(res) {
								console.log('checkjsapi Success')
								console.log(res);
							},
							fail:function(res) {
								console.log('res')
								console.log(res);
							}
						});
						jweixin.chooseWXPay({								timestamp:payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符								nonceStr: payInfo.nonceStr, // 支付签名随机串，不长于 32 位								package: payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）								signType: payInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'								paySign:payInfo.paySign, // 支付签名								success: async (result) => {									// 支付成功后的回调函数
									uni.showToast({
										icon: 'success',
										title: '支付成功'
									})
									let successRes = await me.$fetch(me.$api.orderInfo, {orderId: me.orderId}, "GET", "FORM")
									me.careQrCode = successRes.data.carePic
									if (me.careQrCode) {
										me.paySucessShow = true
										me.payshow = false
									}
																											
									console.log(successRes)								},								cancel: (r) => {
									uni.showToast({
										icon: 'none',
										title: '取消支付'
									})								   console.log(r)								   console.log("/////////")								},								fail:(err) => {
									uni.showToast({
										icon: 'none',
										title: '支付失败'
									})								   console.log(err)								   console.log("******")								}							});
					});
					 				 
					jweixin.error(function(res) {
					
						uni.showToast({
							icon: 'none',
							title: '支付失败了',
							duration: 4000
						});
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							/*alert("config信息验证失败");*/
					});
				 }
				 
				 
				 
				} else {
					// 不是微信时支付
					let res = await this.$fetch(this.$api.webPay, {orderId: this.orderId}, "POST", 'FORM')
					console.log(res)
					
					if (res.code == 500) {
						return uni.showToast({
							icon: 'none',
							title: res.msg
						})
					} else {
						uni.hideLoading()
						window.location.href = res.data + '&redirect_url=http%3A%2F%2Fh5.jjkkx.com/pages/CareCard/CareCard'
						// this.paySucessShow = true
						// this.payshow = false
					}
				}
			},
			// 关爱卡详情
			async initCareInfo () {
				let {data: res} = await this.$fetch(this.$api.careInfo, {}, 'GET', 'FORM')
				console.log(res)
				this.productId = res.productId
				this.careCardPrice = res.price	
				this.richText = res.content
			},
			// 生成订单
			async initCareOrder () {
				let res = await this.$fetch(this.$api.careOrder, {productId: this.productId, num: 1}, 'POST', 'FORM')
				console.log(res)
				this.orderId = res.data
				this.orderErrMsg = res.msg
				this.orderFlag = res.code
				uni.setStorageSync('careCardOrderId', this.orderId)
			}
		
		},
		components: {
		    jyfParser
		},
	}
</script>

<style lang="less">
	.carecard{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/3.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.carecard-header{
			width: 100%;
			text-align: center;
			margin-top: 36rpx;
			box-sizing: border-box;
			image{
				width: 678rpx;
				height: 362rpx;
				
			}
		}
		.carecard-main{
			width: 714rpx;
			height: calc(100% - 116rpx);
			background: #FDDB3C;
			box-shadow: 0 2px 4px 0 rgba(21,45,27,0.50);
			border-radius: 8px;
			overflow: hidden;
			margin: 0 auto;
			padding: 16rpx 18rpx;
			margin-top: 18rpx;
			box-sizing: border-box;
			.carecard-main-top{
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #1F1F1F;
				letter-spacing: 0;
				span{
					color: #FF9515;
				}
			}
			.carecard-main-center{
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #2A2A2A;
				letter-spacing: 0;
				font-weight: bold;
			}
			.carecard-main-footer{
				height: 58%;
				overflow-y: auto;
				
			}
		}
		.buy-button{
			position: fixed;
			bottom: 162rpx;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			.buy-button-title{
				font-size: 14px;
				font-family: PingFangSC-Medium;
				color: #FF9515;
				span{
					font-size: 18px;
				}
			}
			.buy-button-bottom{
				width: 576rpx;
				height: 84rpx;
				line-height: 84rpx;
				background: #FF9515;
				border-radius: 21px;
				font-family: PingFangSC-Medium;
				font-size: 18px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
			}
		}
		.payshow-box{
			width: 100%;
			// height: 652rpx;
			box-sizing: border-box;
			.payshow-header{
				padding-top: 26rpx;
				padding-left: 36rpx;
				padding-right: 41rpx;
				box-sizing: border-box;
				background:#FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 24rpx 24rpx 0 0;
				overflow: hidden;
				.payshow-header-left{
					opacity: 0.9;
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #000000;
					font-weight: bold;
				}
				.payshow-header-right{
					opacity: 0.9;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #EB4F81;
					span{
						font-size: 18px;
					}
				}
			}
			.pay-way{
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #fff;
				padding-left: 42rpx;
				padding-bottom: 46rpx;
				box-sizing: border-box;
				.pay-way-left{
					padding-top: 54rpx;
					box-sizing: border-box;
					display: flex;
					align-content: center;
					image{
						width: 74rpx;
						height: 82rpx;
					}
					.wxpay{
						line-height: 82rpx;
						padding-left: 21rpx;
						font-family: PingFangSC-Regular;
						font-size: 17px;
						color: #000000;
						box-sizing: border-box;
					}
				}
				.pay-way-right{
					padding-top: 54rpx;
					box-sizing: border-box;
					display: flex;
					align-content: center;
				}
			}
			.pay-tip{
				padding-left: 38rpx;
				padding-right: 34rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #000000;
				line-height: 20px;
				background-color: #fff;
				padding-bottom: 12rpx;
				box-sizing: border-box;
				span{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #56b4ff;
					line-height: 20px;
				}
			}
			.pay{
				width: 100%;
				height: 116rpx;
				line-height: 116rpx;
				text-align: center;
				opacity: 0.9;
				font-family: PingFangSC-Medium;
				font-size: 17px;
				color: #FFFFFF;
				background: #FCCA17;
			}
		}
		.paySucessShow-box{
			width: 652rpx;
			height: 798rpx;
			background: #FCCA17;
			text-align: center;
			padding-top: 20rpx;
			box-sizing: border-box;
			.paySucessShow-box-top{
				
				image{
					width: 148rpx;
					height: 252rpx;
				}
			}
			.paySucessShow-box-center{
				font-family: PingFangSC-Medium;
				font-size: 18px;
				color: #FFFFFF;
				letter-spacing: 0;
				padding-bottom: 14rpx;
				box-sizing: border-box;
			}
			.paySucessShow-box-footer{
				padding-bottom: 34rpx;
				box-sizing: border-box;
				image{
					width: 310rpx;
					height: 310rpx;
				}
			}
			.paySucessShow-box-button{
				width: 400rpx;
				height: 84rpx;
				line-height: 84rpx;
				background: #FF9515;
				border-radius: 21px;
				font-family: PingFangSC-Medium;
				font-size: 18px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
</style>
<style lang="less">
	/deep/.u-drawer-bottom{
		border-radius: 24rpx 24rpx 0 0;
	}
	/deep/.u-mode-center-box{
		border-radius: 16rpx;
		overflow: hidden;
	}
</style>

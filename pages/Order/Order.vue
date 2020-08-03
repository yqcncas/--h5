<template>
	<view class="order" :style="{backgroundImage: bgFlag ? '' : 'url(../../static/image/index/5.png)'}">
		<view class="order-tab">
			<view class="order-tab-item" @click="handleTab(index)" :class="{active: tabListIndex == index}" v-for="(item, index) in tabList" :key = "index">{{item}}</view>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh - 86rpx);" @scrolltolower="lower">
			<view class="order-main">
				<view class="order-main-item" v-for="(item,index) in orderList" :key = "index" @click="goToOrderDetail(item.orderId, item.categoryId)">
					<view class="order-main-item-top">
						<view class="order-main-item-top-left">
							<text>订单编号</text>
							<text>{{item.orderNo}}</text>
						</view>
						<view class="order-main-item-top-right">{{item.status == 0 ? '已取消' : item.status == 20 ? '待发货' : item.status == 30 ? '已完成' : item.status == 10 ? '待支付' : item.status == 25 ? '待收货' : ''}}</view>
					</view>
					<view class="order-main-item-center" :class="{noBottomBorder: item.status == 10 || item.status == 25}">
						<view class="order-main-item-center-left">
							<image :src="item.pic[0]" mode=""></image>
						</view>
						<view class="order-main-item-center-right">
							<view class="order-main-item-center-right-top">{{item.productName}}</view>
							<view class="order-main-item-center-right-center"><text>数量</text>{{item.num}}</view>
							<view class="order-main-item-center-right-footer">商品合计：<text>{{item.categoryName == '关爱卡' ? item.price + '元' : item.jkPrice + 'JK'}}</text></view>
						</view>	
					</view>
					<view class="order-main-item-footer" v-if="item.status == 10 || item.status == 25">
						<image src="../../static/image/order/2.png" mode="" v-if="item.status == 10" @click.stop="cancelOrder(item.orderId)"></image>
						<image src="../../static/image/order/1.png" mode="" v-if="item.status == 10" @click.stop="payMoney(item.orderId, item.categoryId)"></image>
						<image src="../../static/image/order/3.png" mode="" v-if="item.status == 25" @click.stop="RealizeTake(item.orderId)"></image>
					</view>
				</view>
				<view v-if = "showNoList">
					<u-empty mode="list" ></u-empty>
				</view>
				
			</view>
		</scroll-view>
		
		
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
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	var jweixin = require('jweixin-module');
	export default {
		onLoad () {
			this.initOrderList()
			
			var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				
			} else {
				if (uni.getStorageSync('orderPayLiulan')) {
			
					this.liulanqiPay()
				}
			}
		},
		onShow () {
			
			if (uni.getStorageSync('refreshOrder')) {
				this.handleTab(0)
				uni.removeStorageSync('refreshOrder')
			}
			
		},
		data () {
			return {
				tabList: ['全部', '待付款', '待发货', '待收货'],
				tabListIndex: 0,
				orderStatus: ['待付款', '待发货', '待收货'],
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				orderList: [],
				status: '',
				showNoList: false,
				bgFlag: true,
				orderId: 0,
				paySucessShow: false,
				careQrCode: '',
				successIndex: 0
			}
		},
		methods: {
			// 浏览器支付
			async liulanqiPay () {
				let orderId = uni.getStorageSync('orderPayLiulan')
				// 获取详情
				let successRes = await this.$fetch(this.$api.orderInfo, {orderId: orderId}, "GET", "FORM")
				if (successRes.data.status == 30) {
					uni.showToast({
						icon: 'success',
						title: '支付成功'
					})
					this.careQrCode = successRes.data.carePic
					if (this.careQrCode) {
						this.orderList.forEach((item, index) => {
							if (item.orderId == orderId) {
								this.successIndex =  index
							}
						})
						this.orderList[this.successIndex].status = 30
						this.paySucessShow = true
						
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '支付失败'
					})
				}
				uni.removeStorageSync('orderPayLiulan')
			},
			// tab切换
			handleTab (index) {
				this.tabListIndex = index
				this.pageNum = 0
				this.pageSize = 10
				this.hasFlag = true
				this.orderList = []
				this.showNoList = false
				this.initOrderList()
			},
			// 订单详情
			goToOrderDetail (index, type) {
				if (type == 0 ) {
					// 关爱卡
				} else {
					uni.navigateTo({
						url: '../OrderDetail/OrderDetail?orderId=' + index
					})
				}
				
			},
			async initOrderList () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				if (this.tabListIndex == 0) {
					this.status = ""
				} else if (this.tabListIndex == 1) {
					this.status = 10
				}else if (this.tabListIndex == 2) {
					this.status = 20
				}else if (this.tabListIndex == 3) {
					this.status = 25
				}
				let res = await this.$fetch(this.$api.orderList, {pageNum: this.pageNum, pageSize: this.pageSize, status: this.status}, "GET", "FORM")
				 console.log(res)
				 res.rows.forEach((item) => {
					 
					 item.pic = item.pic.split(',')
				 })
				this.orderList = [...this.orderList, ... res.rows]
				if (this.orderList.length == 0) {
					this.showNoList = true
				} else {
					this.bgFlag = false
				}
				this.hasFlag = this.pageNum * 10 < res.total
			},
			lower () {
				if (this.hasFlag) {
					this.initOrderList()
				}
			},
			// 支付
			async payMoney (orderId, orderType) {
				// let msg = await this.$fetch(this.$api.order, {addressId, productId}, "POST", "FORM")
				// console.log(msg)
				// if (msg.code == 0) {
				// 	this.orderId = msg.data
				// }
				
				if (orderType == 1) {
					uni.showModal({
					    title: '确认领取或购买',
					    content: '是否确认领取或购买该商品',
					    success: async(res) => {
					        if (res.confirm) {
					            console.log('用户点击确定');
								let payRes = await this.$fetch(this.$api.pay, {orderId: orderId}, 'POST', "FORM")
								console.log(payRes)
								if (payRes.code == 0) {
									uni.showToast({
										icon: 'success',
										title: payRes.msg
									})
									setTimeout(() => {
										this.handleTab(2)
									}, 1000)
								} else {
									uni.showToast({
										icon: 'none',
										title: payRes.msg
									})
								}
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				} else {
					var me = this
					var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
					
					uni.showModal({
					    title: '确认支付',
					    content: '是否确认购买该商品',
					    success: async(res) => {
					        if (res.confirm) {
								uni.showLoading({
									title: '加载中'
								})
					           if (ua.match(/MicroMessenger/i) == "micromessenger") {
								   if (uni.getStorageSync('openId')) {
									 let openid = uni.getStorageSync('openId')
								
									 let res = await this.$fetch(this.$api.gzPay, {openId: openid, orderId: orderId}, "POST", 'FORM')
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
										jweixin.chooseWXPay({
												timestamp:payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
												nonceStr: payInfo.nonceStr, // 支付签名随机串，不长于 32 位
												package: payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
												signType: payInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
												paySign:payInfo.paySign, // 支付签名
												success: async (result) => {
													// 支付成功后的回调函数
													uni.showToast({
														icon: 'success',
														title: '支付成功'
													})
													let successRes = await me.$fetch(me.$api.orderInfo, {orderId: orderId}, "GET", "FORM")
													
													me.careQrCode = successRes.data.carePic
													if (me.careQrCode) {
														me.orderList.forEach((item, index) => {
															if (item.orderId == orderId) {
																me.successIndex = index
															}
														})
														me.orderList[me.successIndex].status = 30
														me.paySucessShow = true
													}
													console.log(successRes)
												},
												cancel: (r) => {
													uni.showToast({
														icon: 'none',
														title: '取消支付'
													})
												   console.log(r)
												   console.log("/////////")
												},
												fail:(err) => {
													uni.showToast({
														icon: 'none',
														title: '支付失败'
													})
												   console.log(err)
												   console.log("******")
												}
											});
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
								   let res = await this.$fetch(this.$api.webPay, {orderId: orderId}, "POST", 'FORM')
								   console.log(res)
								   if (res.code == 500) {
								   	return uni.showToast({
								   		icon: 'none',
								   		title: res.msg
								   	})
								   } else {
									uni.setStorageSync('orderPayLiulan', orderId)
								   	uni.hideLoading()
								   	// window.location.href = res.data
									window.location.href = res.data + '&redirect_url=http%3A%2F%2Fh5.jjkkx.com/pages/Order/Order'
								   	// this.paySucessShow = true
								   	// this.payshow = false
								   }
							   }
								
								
								
								
								
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
			},
			cancelOrder (orderId) {
				uni.showModal({
				    title: '取消订单',
				    content: '是否取消该订单',
				    success: async(res) => {
				        if (res.confirm) {
						let res = await this.$fetch(this.$api.cancelOrder, {orderId}, "POST", 'FORM')
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								icon: 'success',
								title: res.msg
							})
							setTimeout(() => {
								this.handleTab(this.tabListIndex)
							}, 1000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			
			RealizeTake (index) {
				uni.showModal({
				    title: '确认收货',
				    content: '请确认是否已收到货物',
				    success:  async (res) => {
				        if (res.confirm) {
				           let res = await this.$fetch(this.$api.confirmOrder, {orderId: index}, "POST", "FORM")
				           console.log(res)
				           if (res.code == 0) {
				           	uni.showToast({
				           		icon: 'success',
				           		title: res.msg
				           	})
							this.pageNum = 0,
							this.pageSize = 10,
							this.hasFlag = true,
							this.orderList = [],
							this.showNoList = false,
							this.orderId = 0
				           	this.initOrderList()
				           } else {
				           	uni.showToast({
				           		icon: 'none',
				           		title: res.msg
				           	})
				           }
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		},
		onPullDownRefresh () {
			setTimeout(() => {
				this.pageNum = 0,
				this.pageSize = 10,
				this.hasFlag = true,
				this.orderList = [],
				this.showNoList = false,
				this.orderId = 0
				this.initOrderList()
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="less">
	.order{
		width: 100%;
		height: 100%;
		overflow: hidden;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.order-tab{
			width: 100%;
			height: 86rpx;
			line-height: 86rpx;
			display: flex;
			align-items: center;
			background: #FF9515;
			.order-tab-item{
				flex: 1;
				text-align: center;
				position: relative;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #252525;
				letter-spacing: 0;
				&::after{
					content: '';
					width: 0;
					height: 0;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					border-bottom: 6rpx solid #FDDB3C;
					// border-radius: 5rpx;
					transition: .5s;
				}
				&.active{
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #252525;
					font-weight: 600;
					&::after{
						width: 60%;
					}
				}
			}
		}
		.order-main{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			.order-main-item{
				width: 690rpx;
				// height: 464rpx;
				background: #FDDB3C;
				border-radius: 10px;
				padding: 0 30rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				&:first-child{
					margin-top: 0
				}
				.order-main-item-top{
					display: flex;
					justify-content: space-between;
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					border-bottom: 1rpx solid #FFFFFF;
					.order-main-item-top-left{
						text{
							&:nth-child(1) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #262626;
								letter-spacing: -0.34px;
							}
							&:nth-child(2) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #393939;
								letter-spacing: -0.34px;
								padding-left: 30rpx;
								box-sizing: border-box;
							}
						}
					}
					.order-main-item-top-right{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FF6715;
						letter-spacing: -0.34px;
					}
				}
				.order-main-item-center{
					width: 100%;
					height: 250rpx;
					display: flex;
					align-items: center;
					// border-bottom: 1rpx solid #FFFFFF;
					&.noBottomBorder{
						border-bottom: 1rpx solid #FFFFFF;
					}
					.order-main-item-center-left{
						image{
							width: 200rpx;
							height: 200rpx;
						}
					}
					.order-main-item-center-right{
						flex: 1;
						.order-main-item-center-right-top{
							font-family: PingFangSC-Medium;
							font-size: 12px;
							color: #272727;
							letter-spacing: -0.29px;
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 2;    //控制行数
							overflow: hidden;
							padding-left: 20rpx;
							box-sizing: border-box;
						}
						.order-main-item-center-right-center{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #444444;
							letter-spacing: -0.29px;
							padding-top: 10rpx;
							padding-bottom: 24rpx;
							box-sizing: border-box;
							text-align: right;
							text{
								color: #202020;
								margin-right: 30rpx;
								box-sizing: border-box;
							}
						}
						.order-main-item-center-right-footer{
							width: 100%;
							display: flex;
							justify-content: flex-end;
							align-items: center;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #202020;
							letter-spacing: -0.34px;
							// text-align: right;
							text{
								padding-left: 10rpx;
								box-sizing: border-box;
								font-family: PingFangSC-Medium;
								font-size: 16px;
								color: #FF6715;
							}
						}
					}
				}
				.order-main-item-footer{
					width: 100%;
					height: 120rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					image{
						width: 160rpx;
						height: 60rpx;
						margin-left: 40rpx;
						box-sizing: border-box;
					}
				}
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

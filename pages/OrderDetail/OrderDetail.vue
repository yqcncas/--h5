<template>
	<view class="orderdetail">
		<view class="orderdetail-box">
			<view class="orderdetail-box-header">
				<view class="orderdetail-box-header-top">{{orderInfo.status == 0 ? '订单已取消' : orderInfo.status == 10 ? '订单待支付' :orderInfo.status == 20 ? '订单待发货' :orderInfo.status == 25 ? '订单待收货' :orderInfo.status == 30 ? '订单已完成' : '订单状态异常'}}</view>
				<view class="orderdetail-box-header-bottom">
					<view class="orderdetail-box-header-bottom-left">
						<image src="../../static/image/index/14.png" mode=""></image>
					</view>
					<view class="orderdetail-box-header-bottom-right">
						<view class="orderdetail-box-header-bottom-right-top">
							<text>{{orderInfo.name}}</text>
							<text>{{orderInfo.mobile}}</text>
						</view>
						<view class="orderdetail-box-header-bottom-right-bottom">
							<text>{{orderInfo.detailAddress}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="orderdetail-box-main">
				<view class="orderdetail-box-main-left">
					<image :src="orderInfo.pic[0]" mode=""></image>
				</view>
				<view class="orderdetail-box-main-right">
					<view class="orderdetail-box-main-right-top">{{orderInfo.productName}}</view>
					<view class="orderdetail-box-main-right-center"><text>数量</text>{{orderInfo.num}}</view>
					
					<view class="orderdetail-box-main-right-footer"><text>商品合计：</text>{{orderInfo.categoryName == '关爱卡' ? orderInfo.price + '元' : orderInfo.jkPrice + 'JK'}}</view>
				</view>
			</view>
			<view class="orderdetail-box-footer">
				<view class="orderdetail-box-footer-top">
					<text>订单编号</text>
					<text>{{orderInfo.orderNo}}</text>
				</view>
				<view class="orderdetail-box-footer-bottom">
					<text>下单时间</text>
					<view class="orderdetail-box-footer-bottom-time">
						<text>{{orderInfo.payTime[0]}}</text>
						<text>{{orderInfo.payTime[1]}}</text>
					</view>
				</view>
				
				<view class="orderdetail-box-footer-top" v-if="orderInfo.wl.expressNo">
					<text>物流单号</text>
					<text>{{orderInfo.wl.expressNo}}</text>
				</view>
				
				<view class="orderdetail-box-footer-top" v-if="orderInfo.wl.expressCompany">
					<text>快递公司</text>
					<text>{{orderInfo.wl.expressCompany}}</text>
				</view>
			</view>
		</view>
		<view class="orderdetail-submit" v-if="orderInfo.status == 10 || orderInfo.url != '' " @click="payOrGo(orderInfo.status, orderInfo.url)">{{orderInfo.status == 10 ? '立即付款' : '去学习'}}</view>
		<view class="orderdetail-submit" v-if="orderInfo.status == 25" @click="RealizeTake(orderInfo.orderId)">确认收货</view>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			console.log(options)
			this.orderId = options.orderId
			this.initOrderDetail()
		},
		data () {
			return {
				orderId: 0,
				orderInfo: []
			}
		},
		methods: {
			async initOrderDetail () {
				let res = await this.$fetch(this.$api.orderInfo, {orderId: this.orderId}, "GET", "FORM")
				
				res.data.pic = res.data.pic.split(',')
				
				res.data.detailAddress = res.data.provinceString + res.data.address
				res.data.payTime = res.data.createTime.split(' ')
				this.orderInfo = res.data
				console.log(this.orderInfo)
			},
			//　付款和跳转
			payOrGo (status, webUrl) {
				// 付款
				if (status == 10) {
					uni.showModal({
					    title: '确认领取或购买',
					    content: '是否确认领取或购买该商品',
					    success: async(res) => {
					        if (res.confirm) {
					            console.log('用户点击确定');
								let payRes = await this.$fetch(this.$api.pay, {orderId: this.orderId}, 'POST', "FORM")
								console.log(payRes)
								if (payRes.code == 0) {
									uni.setStorageSync('refreshOrder', true)
									
									uni.showToast({
										icon: 'success',
										title: payRes.msg
									})
									setTimeout(() => {
										this.initOrderDetail()
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
					uni.navigateTo({
						url: '../WebViewPage/WebViewPage?webUrl=' + webUrl
					})
				}
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
				           	this.initOrderDetail()
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
		}
	}
</script>

<style lang="less">
	.orderdetail{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.orderdetail-box{
			.orderdetail-box-header{
				.orderdetail-box-header-top{
					padding-top: 32rpx;
					padding-bottom: 24rpx;
					padding-left: 60rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 18px;
					color: #1E1E1E;
					letter-spacing: -0.43px;
					font-weight: bold;
				}
				.orderdetail-box-header-bottom{
					width: 690rpx;
					height: 164rpx;
					background: #FDDB3C;
					border-radius: 16rpx;
					overflow: hidden;
					display: flex;
					align-items: center;
					margin: 0 auto;
					padding: 0 30rpx;
					box-sizing: border-box;
					.orderdetail-box-header-bottom-left{
						image{
							width: 60rpx;
							height: 60rpx;
						}
					}
					.orderdetail-box-header-bottom-right{
						padding-left: 22rpx;
						box-sizing: border-box;
						.orderdetail-box-header-bottom-right-top{
							padding-bottom: 20rpx;
							box-sizing: border-box;
							text{
								&:nth-child(1){
									font-family: PingFangSC-Medium;
									font-size: 16px;
									color: #3D3D3D;
									letter-spacing: -0.39px;
								}
								&:nth-child(2){
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: #424242;
									letter-spacing: -0.34px;
									padding-left: 30rpx;
									box-sizing: border-box;
								}
							}
						}
						.orderdetail-box-header-bottom-right-bottom{
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 2;    //控制行数
							overflow: hidden;
							text{
								font-family: PingFangSC-Medium;
								font-size: 14px;
								color: #3D3D3D;
								letter-spacing: -0.34px;
							}
						}
					}
				}
			}
			.orderdetail-box-main{
				width: 690rpx;
				height: 262rpx;
				background: #FDDB3C;
				border-radius: 16rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
				margin: 0 auto;
				margin-top: 24rpx;
				padding-left: 28rpx;
				padding-right: 24rpx;
				box-sizing: border-box;
				
				.orderdetail-box-main-left{
					image{
						width: 100px;
						height: 100px;
					}
				}
				.orderdetail-box-main-right{
					padding-left: 18rpx;
					box-sizing: border-box;
					flex: 1;
					.orderdetail-box-main-right-top{
						font-family: PingFangSC-Medium;
						font-size: 12px;
						color: #272727;
						letter-spacing: -0.29px;
						display: -webkit-box;    
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
					}
					.orderdetail-box-main-right-center{
						padding-top: 38rpx;
						padding-bottom: 20rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #444444;
						letter-spacing: -0.29px;
						text-align: right;
						text{
							color: #202020;
							padding-right: 30rpx;
							box-sizing: border-box;
						}
					}
					.orderdetail-box-main-right-footer{
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: #FE6D17;
						text-align: right;
						text{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #202020;
							letter-spacing: -0.29px;
							padding-right: 14rpx;
							box-sizing: border-box;
						}
					}
				}
			}
			.orderdetail-box-footer{
				width: 690rpx;
				// height: 152rpx;
				background: #FDDB3C;
				margin: 0 auto;
				margin-top: 28rpx;
				border-radius: 16rpx;
				padding: 30rpx;
				box-sizing: border-box;
				.orderdetail-box-footer-top{
					padding-bottom: 12rpx;
					box-sizing: border-box;
					text{
						&:nth-child(1){
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #212121;
							letter-spacing: 0;
						}
						&:nth-child(2){
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #414141;
							letter-spacing: 0;
							margin-left: 30rpx;
							box-sizing: border-box;
						}
					}
				}
				.orderdetail-box-footer-bottom{
					padding-bottom: 12rpx;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					text{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #212121;
						letter-spacing: 0;
					}
					.orderdetail-box-footer-bottom-time{
						display: flex;
						align-items: center;
						text{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #414141;
							letter-spacing: 0;
							&:first-child{
								margin-left: 30rpx;
								margin-right: 14rpx;
								box-sizing: border-box;
							}
						}
					}
				}
			}
		}
		.orderdetail-submit{
			width: 576rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: #FF9515;
			border-radius: 22px;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 30rpx;
		}
	}
</style>

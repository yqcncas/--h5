<template>
	<view class="shopbuy">
		<view class="shopbuy-address" @click="goToAddress">
			<view class="shopbuy-address-left">
				<view class="shopbuy-address-left-icon">
					<image src="../../static/image/index/14.png" mode=""></image>
				</view>
				<view class="shopbuy-address-info">
					<view class="noAddress" v-if="JSON.stringify(userAddress) == '{}' ">请选择您的地址</view>	
					<view class="info-show" v-else>
						<view class="shopbuy-address-info-top">
							<text>收货人:</text>
							<text>{{userAddress.name}}</text>
							<text>{{userAddress.mobile}}</text>
						</view>
						<view class="shopbuy-address-info-bottom">
							<text>收货地址:</text>
							<text>{{userAddress.detailAddress}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="shopbuy-address-right">
				<image src="../../static/image/index/9.png" mode=""></image>
			</view>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh);">
			<view class="shopbuy-main">
				<view class="shopbuy-main-item">
					<view class="shopbuy-main-item-left">
						<image :src="shopInfo.pic[0]" mode=""></image>
					</view>
					<view class="shopbuy-main-item-right">
						<view class="shopbuy-main-item-right-top">{{shopInfo.productName}}</view>
						<view class="shopbuy-main-item-right-bottom">商品合计：¥<span>{{shopInfo.price}}</span></view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="shopbuy-submit">
			<view class="shopbuy-submit-text">实付：<span>{{discountPrice}}JK</span><span class = "newPeople" v-if = "disPrice > 0">(新人优惠<span>{{disPrice}}</span>JK)</span> </view>
			<view class="shopbuy-submit-button" @click="showPay">立即领取或支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
		
			this.shopInfo = JSON.parse(options.shopInfo)
			console.log(this.shopInfo)
			this.initAddressDefault()
			this.initFirstOrder()
			
		},
		onShow () {
			if (uni.getStorageSync('userAddress')) {
				this.userAddress = JSON.parse(uni.getStorageSync('userAddress'))
				console.log(this.userAddress)
				
				uni.removeStorageSync('userAddress')
			}
		},
		data () {
			return {
				userAddress: {},
				shopInfo: {},
				orderId: 0,
				discountPrice: 0,
				disPrice: 0
			}
		},
		methods: {
			goToAddress () {
				uni.setStorageSync('enterWay', 1)
				uni.navigateTo({
					url: '../Address/Address'
				})
			},
			// 立即支付
			async showPay () {
				if (JSON.stringify(this.userAddress) == '{}') {
					return uni.showToast({
						icon: 'none',
						title: '请选择收货地址'
					})
				}
				let msg = await this.$fetch(this.$api.order, {addressId: this.userAddress.addressId , productId: this.shopInfo.productId}, "POST", "FORM")
				console.log(msg)
				if (msg.code == 0) {
					this.orderId = msg.data
				}
				uni.showModal({
				    title: '确认领取或购买',
				    content: '是否确认领取或购买该商品',
				    success: async(res) => {
				        if (res.confirm) {
				            console.log('用户点击确定');
							let payRes = await this.$fetch(this.$api.pay, {orderId: this.orderId}, 'POST', "FORM")
							console.log(payRes)
							if (payRes.code == 0) {
								uni.showToast({
									icon: 'success',
									title: payRes.msg
								})
								setTimeout(() => {
									uni.reLaunch({
										url: '../Order/Order'
									})
								}, 1000)
							} else {
								uni.showToast({
									icon: 'none',
									title: payRes.msg
								})
							}
				        } else if (res.cancel) {
							uni.showToast({
								icon: 'none',
								title: '取消付款'
							})
							
				           setTimeout(() => {
								uni.reLaunch({
									url: '../Order/Order',
								})
				           }, 1000)
				        }
				    }
				});
			},
			// 获取默认地址
			async initAddressDefault () {
				let res = await this.$fetch(this.$api.addressDefault, {}, "GET", "FORM")
				console.log(res.data)
				if(res.data != undefined) {
					res.data.detailAddress = res.data.provinceString + res.data.address
					this.userAddress = res.data
					console.log(this.userAddress)
				}
			},
			//　第一次购买
			async initFirstOrder () {
				console.log(this.userAddress)
				let res = await this.$fetch(this.$api.firstOrder, {productId: this.shopInfo.productId}, "POST", 'FORM')
				console.log(res)
				if (res.code == 0) {
					// this.shopInfo.jkPrice = res.data
					this.discountPrice = res.data
					this.disPrice = (this.shopInfo.jkPrice - this.discountPrice).toFixed(2)
				}
			}
		}
	}
</script>

<style lang="less">
	.shopbuy{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.shopbuy-address{
			width: 714rpx;
			height: 150rpx;
			margin: 0 auto;
			margin-top: 16rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			background: #FCCA17;
			border-radius: 8px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.shopbuy-address-left{
				display: flex;
				align-items: center;
				.shopbuy-address-left-icon{
					image{
						width: 50rpx;
						height: 50rpx;
					}
				}
				.shopbuy-address-info{
					margin-left: 20rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #2C2C2C;
					letter-spacing: -0.34px;
					.shopbuy-address-info-top{
						padding-bottom: 20rpx;
						box-sizing: border-box;
						text{
							&:nth-child(2) {
								// padding: 0 30rpx;
								padding-left: 20rpx;
								padding-right: 30rpx;
								box-sizing: border-box;
								letter-spacing: 0.34px;
							}
						}
					}
					.shopbuy-address-info-bottom{
						display: -webkit-box;    
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 1;    //控制行数
						overflow: hidden;
						text{
							&:nth-child(2) {
								// padding: 0 30rpx;
								padding-left: 15rpx;
								box-sizing: border-box;
								
							}
						}
					}
					.noAddress{
						font-size: 14px;
						
						font-weight: bold;
					}
				}
			}
			.shopbuy-address-right{
				image{
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
		.shopbuy-main{
			padding-bottom: 200rpx;
			border-radius: 8px;
			overflow: hidden;
			.shopbuy-main-item{
				width: 714rpx;
				height: 268rpx;
				background: #FF9515;
				border-radius: 8px;
				padding-left: 20rpx;
			
				overflow: hidden;
				margin: 0 auto;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				.shopbuy-main-item-left{
					// width: 232rpx;
					// height: 228rpx;
					// border-radius: 6rpx;
					// box-sizing: border-box;
					// overflow: hidden;
					image{
						width: 232rpx;
						height: 228rpx;
						border-radius: 6rpx;
						overflow: hidden;
						vertical-align: bottom;
					}
				}
				.shopbuy-main-item-right{
					margin-left: 18rpx;
					box-sizing: border-box;
					flex: 1;
					.shopbuy-main-item-right-top{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #FFFFFF;
						letter-spacing: -0.29px;
						box-sizing: border-box;
						padding-right: 12rpx;
						display: -webkit-box;    
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
						
					}
					.shopbuy-main-item-right-bottom{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: -0.34px;
						text-align: right;
						padding-right: 30rpx;
						padding-top: 112rpx;
						box-sizing: border-box;
						
						span{
							font-family: PingFangSC-Medium;
							font-size: 18px;
							color: #FFFFFF;
						}
					}
				}
			}
		}
		.shopbuy-submit{
			text-align: center;
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			.shopbuy-submit-text{
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #000000;
				letter-spacing: 0;
				font-weight: bold;
				padding-bottom: 8rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				span{
					font-weight: normal;
					font-family: PingFangSC-Medium;
					font-size: 18px;
					color: #63C3D1;
				}
				.newPeople{
					font-size: 14px !important;
					color: #000000 !important;
					span{
						font-size: 14px !important;
						color: #FF5415!important;
					}
				}
			}
			.shopbuy-submit-button{
				width: 576rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				font-family: PingFangSC-Medium;
				font-size: 18px;
				color: #FFFFFF;
				letter-spacing: 0;
				background: #FF9515;
				border-radius: 22px;
				box-sizing: border-box;
			}
		}
	}
</style>

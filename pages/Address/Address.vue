<template>
	<view class="address" :style="{backgroundImage: bgFlag ? 'url()' : 'url(../../static/image/index/5.png)'}">
		<scroll-view scroll-y="true" style="height: 100vh;">
			<view class="address-wrapper">
				<view class="address-item" v-for="(item, index) in addressList" :key = "item.addressId" @click="goToEditAddress(item.addressId, item)"> 
					<view class="address-item-left">
						<view class="address-item-left-top">
							<text>{{item.name}}</text>
							<text>{{item.mobile}}</text>
							<text v-if="item.defaultFlag">默认</text>
						</view>
						<view class="address-item-left-bottom">
							{{item.detailAddress}}
						</view>
					</view>
					<view class="address-item-right" @click.stop="newgoToEditAddress(item.addressId)">编辑</view>
				</view>
			</view>
			<view v-if = "showNoList">
				<u-empty mode="address" ></u-empty>
			</view>
		</scroll-view>
		<view class="submit-button" @click="goToEditAddress('')">新增收货地址</view>
	</view>
</template>

<script>
	export default {
		onShow () {
			this.initAddress()
		},
		data () {
			return {
				addressList: [],
				showNoList: false,
				bgFlag: true
			}
		},
	
		methods: {
			// enterWay 1 商品购买跳转  2 我的地址跳转
			goToEditAddress (index, item) {
				if (uni.getStorageSync('enterWay') === 1 && index) {
					console.log(item)
					let addressInfo = {
						name: item.name,
						mobile: item.mobile,
						province: item.province,
						provinceString: item.provinceString,
						detailAddress: item.detailAddress,
						address: item.address,
						addressId: item.addressId
					}
					uni.setStorageSync('userAddress', JSON.stringify(addressInfo))
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.navigateTo({
						url: '../EditAddress/EditAddress?addressId=' + index
					})
				}		
			},
			// 防止出问题 给编辑单独写了跳转
			newgoToEditAddress (index) {
				uni.navigateTo({
					url: '../EditAddress/EditAddress?addressId=' + index
				})
			},
			async initAddress () {
				let res = await this.$fetch(this.$api.addressList, {}, "GET", "FORM")
				console.log(res)
				if (res.data.length == 0) {
					this.showNoList = true
					this.bgFlag = true
				} else {
					this.bgFlag = false
					this.showNoList = false
				}
				this.addressList = res.data
				this.addressList.forEach((item) => {
					item.detailAddress = item.provinceString + item.address
				})
			}
		}
	}
</script>

<style lang="less">

	.address{
		width: 100%;
		height: 100%;
		overflow: hidden;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-bottom: 30rpx;
		.address-wrapper{
			width: 714rpx;
			// height: 150rpx;
			margin: 0 auto;
			padding-bottom: 140rpx;
			box-sizing: border-box;
			.address-item{
				width: 100%;
				height: 150rpx;
				padding-left: 26rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				background: #FCCA17;
				border-radius: 8px;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 26rpx;
				box-sizing: border-box;
				&:first-child{
					margin-top: 14rpx !important;
					box-sizing: border-box;
				}
				.address-item-left{
					flex: 1;
					border-right: 1rpx solid #FFFFFF;
					.address-item-left-top{
						padding-bottom: 12rpx;
						box-sizing: border-box;
						text{
							&:nth-child(1) {
								font-weight: bold;
								font-family: PingFangSC-Medium;
								font-size: 16px;
								color: #282828;
								letter-spacing: -0.39px;
							}
							&:nth-child(2) {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #303030;
								letter-spacing: -0.34px;
								padding: 0 30rpx;
								box-sizing: border-box;
							}
							&:nth-child(3) {
								width: 70rpx;
								height: 34rpx;
								background: #63C3D1;
								border-radius: 2px;
								overflow: hidden;
								padding-left: 12rpx;
								padding-right: 10rpx;
								box-sizing: border-box;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #FFFFFF;
								letter-spacing: 0;
							}
						}
					}
					.address-item-left-bottom{
						padding-right: 10rpx;
						box-sizing: border-box;
						font-weight: bold;
						display: -webkit-box;    
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
					}
				}
				.address-item-right{
					height: 150rpx;
					line-height: 150rpx;
					text-align: center;
					padding-left: 22rpx;
					box-sizing: border-box;
				}
			}
		}
		.submit-button{
			position: fixed;
			left: 50%;
			bottom: 30rpx;
			transform: translateX(-50%);
			z-index: 99;
			width: 576rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #FF9515;
			border-radius: 22px;
			box-sizing: border-box;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
		}
	}
</style>

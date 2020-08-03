<template>
	<view class="editAddress">
		<view class="editAddress-wrapper">
			<view class="editAddress-item">
				<view class="editAddress-item-main">
					<view class="editAddress-item-main-left">收货人</view>
					<input type="text" v-model="userName" class="editAddress-item-main-right" placeholder="请输入收货人姓名" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #505050;letter-spacing: -0.34px;">
				</view>
			</view>
			<view class="editAddress-item">
				<view class="editAddress-item-main">
					<view class="editAddress-item-main-left">联系电话</view>
					<input type="number" maxlength="11" v-model="userPhone" class="editAddress-item-main-right" placeholder="请输入收货人联系电话" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #505050;letter-spacing: -0.34px;">
				</view>
			</view>
			<view class="editAddress-item">
				<view class="editAddress-item-main">
					<view class="editAddress-item-main-left">所在地区</view>
					<view class="editAddress-item-main-left-area-right" @click="showAddress">
						<text>{{provinceString ? provinceString : '请选择省市区'}}</text>
						<image src="../../static/image/index/8.png" mode=""></image>
					</view>
		
				</view>
			</view>
			<view class="editAddress-item">
				<view class="editAddress-item-main">
					<view class="editAddress-item-main-left">详细地址</view>
					<input type="text" v-model="detailAddress" class="editAddress-item-main-right" placeholder="请输入收货详细地址" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #505050;letter-spacing: -0.34px;">
				</view>
			</view>
		</view>
		<view class="editAddress-moren">
			<view class="editAddress-moren-left">设为默认地址</view>
			<view class="editAddress-moren-right">
				<u-switch v-model="checked" @change="handleSwitch"></u-switch>
			</view>
		</view>
		<view class="editAddress-submit" @click="saveAddressInfo" >保存并使用</view>
		<view class="editAddress-submit-del" @click="deleteAddressInfo" v-if="addressId">删除地址</view>
		 <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		onLoad (options) {
			console.log(options)
			if (options.addressId) {
				this.addressId = options.addressId
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				})
				this.getAddressInfo()
			}
		},
		data () {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				checked: false,
				userName: '',
				userPhone: '',
				detailAddress: '', // 详细地址
				province: '', // 区域编码
				provinceString: '', // 显示区域文字
				addressId: 0 //　是否有地址进入
			};
		},
		methods: {
			showAddress () {
				 this.$refs.simpleAddress.open();
			},
			// picker组件
			onConfirm (e) {
				console.log(e)
				this.province = e.areaCode
				this.provinceString = e.labelArr.join('')
			},
			// switch 滑动
			handleSwitch (e) {
				console.log(e)
				this.checked = e
			},
			// 新增地址
			async saveAddressInfo () {
				if (this.userName.trim() == "") {
					return uni.showToast({
						icon: 'none',
						title: '请输入收货人'
					})
				}
				
				if(!this.$u.test.mobile(this.userPhone)) {
					return uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
				}
				if (this.provinceString.trim() == "") {
					return uni.showToast({
						icon: 'none',
						title: '请选择所在的省市区'
					})
				}
				if (this.detailAddress.trim() == "") {
					return uni.showToast({
						icon: 'none',
						title: '请输入详细地址'
					})
				}
				
				// 新增地址
				if (this.checked && !this.addressId) {
					let res = await this.$fetch(this.$api.addAddress, {address: this.detailAddress, defaultFlag: 1, mobile: this.userPhone, name : this.userName, province: this.province, provinceString: this.provinceString}, "POST", "FORM")
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				} else if (this.checked == 0 && !this.addressId) {
					let res = await this.$fetch(this.$api.addAddress, {address: this.detailAddress, defaultFlag: 0, mobile: this.userPhone, name : this.userName, province: this.province, provinceString: this.provinceString}, "POST", "FORM")
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}
				
				// 编辑地址
				if (this.checked && this.addressId) {
					let res = await this.$fetch(this.$api.editAddress, {address: this.detailAddress, defaultFlag: 1, mobile: this.userPhone, name : this.userName, province: this.province, provinceString: this.provinceString, addressId: this.addressId}, "POST", "FORM")
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				} else if (this.checked == 0 && this.addressId) {
					let res = await this.$fetch(this.$api.editAddress, {address: this.detailAddress, defaultFlag: 0, mobile: this.userPhone, name : this.userName, province: this.province, provinceString: this.provinceString, addressId: this.addressId}, "POST", "FORM")
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}
			},
			// 带地址内容进入
			async getAddressInfo () {
				let {data: res} = await this.$fetch(this.$api.addressInfo, {addressId: this.addressId}, "GET", "FORM")
				console.log(res)
				
				this.checked = res.defaultFlag == 0 ? false : true 
				this.userName = res.name
				this.userPhone = res.mobile
				this.detailAddress = res.address
				this.province = res.province
				this.provinceString = res.provinceString
			},
			// 删除地址
			async deleteAddressInfo () {
				let res = await this.$fetch(this.$api.deleteAddress, {addressId: this.addressId}, "GET", "FORM")
				console.log(res)
				if (res.code == 0) {
					uni.showToast({
						icon: 'success',
						title: res.msg
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.editAddress{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.editAddress-wrapper{
			width: 714rpx;
			background: #FCCA17;
			border-radius: 8px;
			margin: 0 auto;
			margin-top: 16rpx;
			box-sizing: border-box;
			overflow: hidden;
			.editAddress-item{
				width: 100%;
				height: 90rpx;
				padding: 0 16rpx;
				box-sizing: border-box;
				&:first-child{
					.editAddress-item-main-left{
						margin-right: 60rpx !important;
						box-sizing: border-box;
					}
				}
				&:last-child{
					.editAddress-item-main{
						border-bottom: 0;
					}
				}
				.editAddress-item-main{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #FFFFFF;
					.editAddress-item-main-left{
						margin-right: 32rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #161616;
						letter-spacing: -0.34px;
					}
					.editAddress-item-main-right{
						flex: 1;
						font-size: 14px;
					}
					.editAddress-item-main-left-area-right{
						height: 100%;
						flex: 1;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						image{
							width: 26rpx;
							height: 30rpx;
							margin-left: 8rpx;
							box-sizing: border-box;
							vertical-align: bottom;
						}
					}
				}
			}
		}
		.editAddress-moren{
			width: 714rpx;
			height: 100rpx;
			background: #FCCA17;
			border-radius: 8px;
			margin: 0 auto;
			margin-top: 20rpx;
			padding-left: 12rpx;
			padding-right: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.editAddress-moren-left{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #161616;
				letter-spacing: -0.34px;
			}
		}
		.editAddress-submit{
			width: 576rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #FF9515;
			border-radius: 22px;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		.editAddress-submit-del{
			width: 576rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #FF9515;
			border-radius: 22px;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			position: fixed;
			
			bottom: 140rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>

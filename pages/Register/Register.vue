<template>
	<view class="login">
		<view class="login-logo">
			<image src="../../static/image/index/2.png" mode=""></image>
		</view>
		<view class="login-center">
			<view class="login-center-top">
				<image src="../../static/image/login-phone.png" mode=""></image>
				<input type="number" v-model="userNum" maxlength = "11" placeholder="请输入您的手机号" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
			</view>
			<view class="login-center-bottom">
				<view class="login-center-bottom-left">
					<image src="../../static/image/login-slock.png" mode=""></image>
					<input type="number" v-model="userPwd" placeholder="请输入验证码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
				</view>
				<view class="getQrCode" :class="{ getQrCodeing: !getYzm }" @click="handleGetYzm">{{getYzm ? '获取验证码' : countTimer + 's'}}</view>
			</view>
		</view>
		<view class="login-button" @click="login">注册</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.orderNo = options.shareCode
		},
		data () {
			return {
				getYzm: true, // 判断是否点击获取验证码
				countTimer: 60,
				userNum: '',
				userPwd: '',
				orderNo: ''
			}
		},
		methods: {
			// 验证码
			async handleGetYzm () {
				if (!this.$u.test.mobile(this.userNum)) {
					return uni.showToast({
						icon: 'none',
						title: '请检查手机号是否输入正确'
					})
				}
				
				if (!this.getYzm) return
				this.countTimer = 60
				this.getYzm = false
				
				let res = await this.$fetch(this.$api.sms, {mobile: this.userNum}, 'GET')
				console.log(res)
				const timer = setInterval(() => {
					if (this.countTimer <= 0) {
						clearInterval(timer)
						this.getYzm = true
					} else {
						this.countTimer--
					}
				}, 1000)
			},
			// 登录
			async login () {
				console.log(this.orderNo)
				console.log(this.$u.test.mobile('15157707980'));
				if (!this.$u.test.mobile(this.userNum)) {
					return uni.showToast({
						icon: 'none',
						title: '请检查手机号是否输入正确'
					})
				}
				if (this.userPwd.trim() == "") {
					return uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
				}
				let res = await this.$fetch(this.$api.register,{loginName: this.userNum,verification: this.userPwd, shareCode: this.orderNo}, 'GET')
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
				if (res.code == 0) {
					uni.setStorageSync('token', res.data.token)
					setTimeout(() => {
						uni.reLaunch({
							url: '../index/index'
						})
					}, 1000)
				} else if (res.msg == "该用户已注册，请确认") {
					setTimeout(() => {
						uni.reLaunch({
							url: '../Login/Login'
						})
					}, 1000)
					
				}
			}
		}
	}
</script>

<style lang="less">
	.login{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.login-logo{
			// box-shadow: 0 0 17px 0 rgba(144,0,0,0.10);
			width: 100%;
			text-align: center;
			padding-top: 140rpx;
			padding-bottom: 152rpx;
			box-sizing: border-box;
			image{
				width: 294rpx;
				height: 294rpx;
			}
		}
		.login-center{
			margin-left: 82rpx;
			margin-right: 78rpx;
			box-sizing: border-box;
			input{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				flex: 1;
				height: 100%;
			}
			image{
				width: 44rpx;
				height: 44rpx;
				margin-right: 30rpx;
				box-sizing: border-box;
			}
			.login-center-top{
				height: 118rpx;
				line-height: 118rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #F3F3F3;
			}
			.login-center-bottom{
				height: 118rpx;
				line-height: 118rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #F3F3F3;
				.login-center-bottom-left{
					height: 100%;
					display: flex;
					align-items: center;
				}
				.getQrCode{
					width: 160rpx;
					height: 48rpx;
					text-align: center;
					line-height: 48rpx;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #61b101;
					border: 2rpx solid #61b101;
					border-radius: 2px;
					&.getQrCodeing{
						color: #909399;
						border: 2rpx solid #909399;
					}
				}
			}
		}
		.login-button{
			width: 590rpx;
			height: 90rpx;
			line-height: 90rpx;
			margin: 0 auto;
			margin-top: 60rpx;
			box-sizing: border-box;
			// background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
			background-color: #61b101;
			border-radius: 22.5px;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
		}
		
	}
</style>

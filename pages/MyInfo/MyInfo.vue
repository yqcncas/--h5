<template>
	<view class="myinfo">
		<view class="myinfo-wrapper">
			<view class="myinfo-wrapper-avatar" @click="handleAvatar">
				<view class="myinfo-wrapper-avatar-box">
					<view class="myinfo-wrapper-avatar-text">头像</view>
					<view class="myinfo-wrapper-avatar-right">
						<!-- <image src="../../static/image/index/2.png" mode="" class="right-avatar" ></image> -->
						<image :class="{ciecle: userAvatar}" :src="userAvatar ? userAvatar : '../../static/image/index/2.png'" mode="aspectFill" class="right-avatar" ></image>
						<image src="../../static/image/index/7.png" mode="" class="jiantou"></image>
					</view>
				</view>
				
			</view>
			<view class="myinfo-wrapper-item">
				<view class="myinfo-wrapper-item-box">
					<view class="myinfo-wrapper-item-left">姓名</view>
					<input v-model="userName" type="text" class="user-name" placeholder="请输入你的昵称" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #414141;letter-spacing: -0.34px;"/>
				</view>
			</view>
			<view class="myinfo-wrapper-item">
				<view class="myinfo-wrapper-item-box">
					<view class="myinfo-wrapper-item-left">所在地区</view>
					<view class="myinfo-wrapper-item-area-right" @click="showAddress">
						<text>{{userAddress ? userAddress : '请选择省市区'}}</text>
						<image src="../../static/image/index/8.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="myinfo-wrapper-item">
				<view class="myinfo-wrapper-item-box">
					<view class="myinfo-wrapper-item-left">详细地址</view>
					<input type="text" v-model="userDetailAddress" class="detailAddress" placeholder="请输入详细地址" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #414141;letter-spacing: -0.34px;"/>
				</view>
			</view>
		</view>
		<view class="submit-button" @click="saveUserInfo">保存</view>
			
		
		 <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		onLoad(options) {
			console.log(options)
			let user = JSON.parse(uni.getStorageSync('myUserInfo'))
			console.log(user)
			this.userName = user.name
			this.userDetailAddress = user.address
			this.userAvatar = user.avatar
			this.userAddress = user.provinceString
			
			this.GetQnToken()
		},
		data () {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				qnToken: '', // 七牛token
				userName: '', // 用户姓名
				userAddress: '', // 地址
				userDetailAddress: '', //　详细地址
				province: '', //　编号
				userAvatar: ''
			};
		},
		methods: {
			showAddress () {
				 this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.userAddress = e.labelArr.join('')
				this.province = e.areaCode
			},
			// 获取七牛token
			async GetQnToken () {
				let res = await this.$fetch(this.$api.uptoken, {}, "GET")
				this.qnToken = res.data
			},
			// 保存信息
			async saveUserInfo () {
				if (this.userName.trim() == "") return uni.showToast({
					icon: 'none',
					title: '请输入您的姓名'
				})
				
				let res = await this.$fetch(this.$api.editUserInfo, {address: this.userDetailAddress, avatar: this.userAvatar, province: this.province, provinceString: this.userAddress,userName: this.userName}, 'POST', 'FORM')
				console.log(res)
				if (res.code == 0) {
					uni.showToast({
						icon: 'success',
						title: res.msg
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '../My/My'
						})
					}, 1000)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			},
			
			//　修改头像
			handleAvatar () {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						if (res.tempFilePaths) {
							uni.uploadFile({
									url: this.$api.unloadLocation, //仅为示例，非真实的接口地址
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: {
										token: this.qnToken
									},
									success: (uploadFileRes) => {
										console.log(JSON.parse(uploadFileRes.data).hash);
										this.userAvatar = this.$api.baseLocation + JSON.parse(uploadFileRes.data).hash
										console.log(this.userAvatar)
										
										uni.showToast({
											icon: 'success',
											title: '上传成功'
										})
									}
								});
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.myinfo{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.myinfo-wrapper{
			width: 714rpx;
			border-radius: 8px;
			overflow: hidden;
			margin: 0 auto;
			margin-top: 16rpx;
			box-sizing: border-box;
			.myinfo-wrapper-avatar{
				width: 100%;
				height: 182rpx;
				padding-left: 32rpx;
				padding-right: 32rpx;
				background: #FCCA17;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.myinfo-wrapper-avatar-box{
					width: 100%;
					height: 100%;
					border-bottom: 1rpx solid #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.myinfo-wrapper-avatar-text{
					font-family: PingFangSC-Medium;
					font-size: 14px;
					font-weight: bold;
					color: #121212;
					letter-spacing: 0;
				}
				.myinfo-wrapper-avatar-right{
					display: flex;
					align-items: center;
					.right-avatar{
						width: 134rpx;
						height: 128rpx;
						margin-right: 20rpx;
						&.ciecle{
							border-radius: 50%;
						}
					}
				}
				.jiantou{
					width: 16rpx;
					height: 26rpx;
				}
			}
			.myinfo-wrapper-item{
				width: 100%;
				height: 98rpx;
				padding: 0 32rpx;
				background: #FCCA17;
				box-sizing: border-box;
				&:last-child{
					.myinfo-wrapper-item-box{
						border-bottom: 0;
					}
				}
				.myinfo-wrapper-item-box{
					width: 100%;
					height: 100%;
					border-bottom: 1rpx solid #FFFFFF;
					display: flex;
					align-items: center;
					.myinfo-wrapper-item-left{
						font-weight: bold;
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #161616;
						letter-spacing: -0.34px;
						// padding-right: 116rpx;
						box-sizing: border-box;
					}
					.myinfo-wrapper-item-area-right{
						height: 100%;
						flex: 1;
						padding-left: 66rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						image{
							width: 26rpx;
							height: 30rpx;
							margin-left: 8rpx;
							box-sizing: border-box;
						}
					}
					
					.user-name{
						flex: 1;
						height: 100%;
						margin-left: 120rpx;
						box-sizing: border-box;
					}
					.detailAddress{
						flex: 1;
						height: 100%;
						margin-left: 66rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.submit-button{
			width: 576rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;	
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			background: #FF9515;
			border-radius: 22px;
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>

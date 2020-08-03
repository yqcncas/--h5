<template>
	<view class="mysetting">
		<view class="mysetting-box">
			<!-- <view class="mysetting-box-item" @click="goToChangePwd">
				<view class="mysetting-box-item-box">
					<view class="mysetting-box-item-left">修改密码</view>
					<image src="../../static/image/index/9.png" mode=""></image>
				</view>
			</view> -->
			<view class="mysetting-box-item" @click="goToFeedBack">
				<view class="mysetting-box-item-box">
					<view class="mysetting-box-item-left">意见反馈</view>
					<image src="../../static/image/index/9.png" mode=""></image>
				</view>
			</view>
			<view class="mysetting-box-item" @click="callPhone">
				<view class="mysetting-box-item-box">
					<view class="mysetting-box-item-left">客服电话</view>
					<view class="mysetting-box-item-right">{{kfPhone}}</view>
				</view>
			</view>
			<view class="mysetting-box-item" @click="goToAboutMy()">
				<view class="mysetting-box-item-box">
					<view class="mysetting-box-item-left">关于我们</view>
					<image src="../../static/image/index/9.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="mysetting-submit" @click="exitButton">
			安全退出
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initIndexInfo()
		},
		data () {
			return {
				kfPhone: ''
			}
		},
		methods: {
			async initIndexInfo () {
				let res = await this.$fetch(this.$api.indexInfo, {}, "GET", "FORM")
				console.log(res)
				this.kfPhone = res.data.baseData.mobile
			},
			goToChangePwd () {
				uni.navigateTo({
					url: '../ChangePwd/ChangePwd'
				})
			},
			callPhone () {
				uni.makePhoneCall({
				    phoneNumber: this.kfPhone //仅为示例
				});
			},
			goToFeedBack () {
				uni.navigateTo({
					url: '../FeedBack/FeedBack'
				})
			},
			goToAboutMy () {
				uni.navigateTo({
					url: '../RichText/RichText?aboutMy=' + 1
				})
			},
			exitButton () {
				uni.showModal({
				    title: '安全退出',
				    content: '确定退出该账号么',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.removeStorageSync('token')
							uni.showToast({
								icon: 'success',
								title: '操作成功'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '../index/index'
								})
							}, 1000)
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
	.mysetting{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.mysetting-box{
			width: 714rpx;
			border-radius: 8px;
			overflow: hidden;
			margin: 0 auto;
			margin-top: 16rpx;
			.mysetting-box-item{
				width: 100%;
				height: 110rpx;
				padding-left: 13rpx;
				padding-right: 34rpx;
				box-sizing: border-box;
				background: #FDDB3C;
				&:last-child{
					.mysetting-box-item-box{
						border-bottom: 0;
					}
				}
				.mysetting-box-item-box{
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #000;
				
					border-color: rgba(0,0,0,0.10);
				}
				.mysetting-box-item-left{
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: #2E2E2E;
					letter-spacing: 0;
					// font-weight: bold;
					
				}
				.mysetting-box-item-right{
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #191919;
					letter-spacing: 0;
				}
				image{
					width: 16rpx;
					height: 26rpx;
					
					box-sizing: border-box;
				}
			}
		}
		.mysetting-submit{
			width: 576rpx;
			height: 88rpx;
			line-height: 88rpx;
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

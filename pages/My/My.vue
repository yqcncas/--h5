<template>
	<view class="my">
		<view class="my-header" @click="goToPage('../MyInfo/MyInfo?myInfo=' + JSON.stringify(userInfo) )">
			<view class="my-header-left">
				<view class="avatar">
					<!-- <image src="../../static/image/index/2.png" mode=""></image> -->
					<image :class="{ciecle: userInfo.avatar}" :src="userInfo.avatar ? userInfo.avatar : '../../static/image/index/2.png'" mode="aspectFill"></image>
				</view>
				<view class="my-header-left-right">
					<view class="my-header-left-right-top">
						<view class="my-header-left-right-top-left">{{userInfo.name}}</view>
						<view class="my-header-left-right-top-right">{{bbLeavel[userInfo.level]}}</view>
					</view>
					<view class="my-header-left-right-bottom">伞下人数: {{userInfo.child ? userInfo.child : 0}}</view>
		<!-- 			<view class="my-header-left-right-bottom" v-if="userInfo.level + 1 >= 2">离晋级<span>{{bbLeavel[userInfo.level + 1]}}</span></view>
					<view class="my-header-left-right-bottom" v-else="userInfo.level + 1 >= 2"></view> -->
				</view>
			</view>
			<view class="my-header-right">
				<image src="../../static/image/index/9.png" mode=""></image>
			</view>
		</view>
		<view class="jknumber" @click="goToPage('../MyMoney/MyMoney?myMoney=' + userInfo.allJk)">
			<view class="jknumber-top">天天奖钱包（JK值）</view>
			<view class="jknumber-center">{{userInfo.allJk}}</view>
		</view>
		
		<scroll-view scroll-y="true" style="height: 794rpx;">
			<view class="my-main">
					<view class="my-main-item" @click="goToPage('../HealthInformation/HealthInformation')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">健康资料与服务</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item"  @click="goToPage('../MyInfluence/MyInfluence')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的影响力</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../MyAi/MyAi?allAi='+ userInfo.allAi + '&avatar=' + userInfo.avatar)">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的AI</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../MyCard/MyCard')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的打卡</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../MyRemind/MyRemind')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的提醒</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../MyCareCard/MyCareCard')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的关爱卡</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../Order/Order')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的订单</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../Address/Address')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">我的地址</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="my-main-item" @click="goToPage('../MySetting/MySetting')">
						<view class="my-main-item-linebox">
							<view class="my-main-item-linebox-left">系统设置</view>
							<view class="my-main-item-linebox-right">
								<image src="../../static/image/index/10.png" mode=""></image>
							</view>
						</view>
					</view>
					

			</view>
			<view class="line-30"></view>
		</scroll-view>
	
		
		
		<Tabbar :pagePath = "pagePath"></Tabbar>
		
	</view>
</template>

<script>
	export default {
		onLoad () {
			
		},
		onShow() {
			// tabbar路径
			this.pagePath = this.$route.fullPath
			this.initMyInfo()
		},
		data () {
			return {
				pagePath: '',
				userInfo: {
					name: '',
					level: 1,
					allAi: 0,
					allJk: 0,
					avatar: '',
					address: '',
					provinceString: '',
					child: 0
				},
				bbLeavel: ['幸福宝宝','幸福宝宝', '健康宝宝', '富贵宝宝']
			}
		},
		methods: {
			goToPage (pagePath) {
				if (pagePath == '../Address/Address') {
					uni.setStorageSync('enterWay', 2)
				}
				uni.navigateTo({
					url: pagePath
				})
			},
			async initMyInfo () {
				let res = await this.$fetch(this.$api.userInfo, {}, 'GET')
				console.log(res)
				if (res.code == 0) {
					if (res.data.userName) {
						this.userInfo.name = res.data.userName
					} else {
						this.userInfo.name = '健康宝用户'
					}
					
					this.userInfo.level = res.data.level
					this.userInfo.allAi = res.data.allAi
					this.userInfo.allJk = res.data.allJk
					this.userInfo.avatar = res.data.avatar
					this.userInfo.address = res.data.address
					this.userInfo.provinceString = res.data.provinceString
					this.userInfo.child = res.data.child
					uni.setStorageSync('myUserInfo', JSON.stringify(this.userInfo))
				}
			},
		
		}
	}
</script>

<style lang="less">
	.my{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.my-header{
			width: 714rpx;
			height: 206rpx;
			background: #FCCA17;
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 auto;
			margin-top: 16rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			
			.my-header-left{
				display: flex;
				align-items: center;
				.avatar{
					margin-right: 26rpx;
					box-sizing: border-box;
					image{
						width: 160rpx;
						height: 152rpx;
						&.ciecle{
							border-radius: 50%;
						}
					}
				}
				.my-header-left-right{
					.my-header-left-right-top{
						display: flex;
						flex-direction: column;
						justify-content: center;
						// align-items: center;
						// padding-bottom: 36rpx;
						box-sizing: border-box;
						.my-header-left-right-top-left{
							// width: 240rpx;
							font-family: STYuanti-SC-Regular;
							font-size: 17px;
							color: #2E2E2E;
							letter-spacing: 0;
							margin-right: 40rpx;
							box-sizing: border-box;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.my-header-left-right-top-right{
							width: 110rpx;
							height: 34rpx;
							line-height: 34rpx;
							background-image: linear-gradient(136deg, #FE99AF 0%, #FE71B0 100%);
							border-radius: 17rpx;
							font-family: PingFangSC-Medium;
							font-size: 10px;
							color: #FFFFFF;
							text-align: center;
							letter-spacing: 0;
							margin-top: 20rpx;
							box-sizing: border-box;
						}
					}
					.my-header-left-right-bottom{
						// font-family: PingFangSC-Regular;
						// font-size: 13px;
						// color: #484848;
						// letter-spacing: 0;
						// padding-top: 4rpx;
						// padding-left: 4rpx;
						// span{
						// 	color: #fe1f74;
						// }
						display: inline-block;
						// padding: 4rpx;
						padding-left: 8rpx;
						padding-right: 8rpx;
						margin-top: 10rpx;
						background-image: linear-gradient(136deg, #FE99AF 0%, #FE71B0 100%);
						border-radius: 17rpx;
						font-family: PingFangSC-Medium;
						font-size: 10px;
						color: #FFFFFF;
						text-align: center;
						letter-spacing: 0;
						box-sizing: border-box;
					}
				}
			}
			.my-header-right{
				// width: 24rpx;
				// height: 48rpx;
				image{
					width: 16rpx;
					height: 28rpx;
				}
			}
		}
		.jknumber{
			width: 714rpx;
			height: 156rpx;
			margin: 0 auto;
			margin-top: 24rpx;
			margin-bottom: 20rpx;
			background: #FF9515;
			border-radius: 16rpx;
			padding: 14rpx 28rpx;
			box-sizing: border-box;
			overflow: hidden;
			.jknumber-top{
				font-family: PingFangSC-Medium;
				font-size: 12px;
				color: #FFFFFF;
				letter-spacing: 0;
			}
			.jknumber-center{
				font-family: PingFangSC-Medium;
				font-size: 24px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
			}
		}
		.my-main{
			width: 714rpx;
			margin: 0 auto;
			
			padding-bottom: 170rpx;
			box-sizing: border-box;
			// overflow: hidden;
			.my-main-item{
				width: 100%;
				height: 88rpx;
				background: #FCCA17;
				padding-left: 28rpx;
				padding-right: 36rpx;
				box-sizing: border-box;
				&:first-child{
					border-top-left-radius: 16rpx;
					border-top-right-radius: 16rpx;
					box-sizing: border-box;
				}
				&:last-child{
					border-bottom-left-radius: 16rpx;
					border-bottom-right-radius: 16rpx;
					.my-main-item-linebox{
						border-bottom: 0;
					}
				}
				.my-main-item-linebox{
					width: 100%;
					height:100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #FFFFFF;
					.my-main-item-linebox-left{
						font-family: PingFangSC-Regular;
						font-size: 16px;
						color: #000000;
						letter-spacing: 0;
					}
					.my-main-item-linebox-right{
						image{
							width: 16rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
		.line-30{
			width: 100%;
			height: 40rpx;
		}
	}
</style>

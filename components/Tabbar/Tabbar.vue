<template>
	<view class="tabbar">
		<view class="tabbar-box">
			<view class="tabbar-box-item item1" @click="goToIndex">
				<image src="../../static/image/tabbar/6.png" mode="" v-if="pagePath == '/pages/index/index' || pagePath == '/'"></image>
				<image src="../../static/image/tabbar/5.png" mode="" v-else></image>
				<view class="tabbar-box-item-text">首页</view>
			</view>
			<view class="tabbar-box-item item2" @click="goToCard">
				<image src="../../static/image/tabbar/4.png" mode="" v-if=" pagePath == '/pages/CareCard/CareCard'"></image>
				<image src="../../static/image/tabbar/3.png" mode="" v-else></image>
				
				<view class="tabbar-box-item-text">关爱卡</view>
			</view>
			<view class="tabbar-box-item item3"  @click="goToBigMarket">
				<image src="../../static/image/tabbar/2.png" mode="" v-if="pagePath == '/pages/BigMarket/BigMarket'"></image>
				<image src="../../static/image/tabbar/1.png" mode="" v-else></image>
				
				<view class="tabbar-box-item-text">大市场</view>
			</view>
			<view class="tabbar-box-item item4" @click="goToMy">
				<image src="../../static/image/tabbar/8.png" mode="" v-if="pagePath == '/pages/My/My'"></image>
				<image src="../../static/image/tabbar/7.png" mode="" v-else></image>

				<view class="tabbar-box-item-text">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				// pagePath: ''
			}
		},
		props:{
			pagePath: {
				type: String
			}
		},
		methods: {
			// 首页
			goToIndex () {
				uni.navigateTo({
					url: '../../pages/index/index'
				})
			},
			// 关爱卡
			goToCard () {
				uni.navigateTo({
					url: '../../pages/CareCard/CareCard'
				})
			},
			// 大市场
			goToBigMarket () {
				uni.navigateTo({
					url: '../../pages/BigMarket/BigMarket'
				})
			},
			// 我的
			goToMy () {
				uni.navigateTo({
					url: '../../pages/My/My'
				})
			}
		}
	}
</script>

<style lang="less">
	.tabbar{
		width: 100%;
		height: 116rpx;
		background: #61B101;
		border-top-left-radius: 56rpx;
		border-top-right-radius: 56rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		z-index: 99;
		.tabbar-box{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			.tabbar-box-item{
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				font-family: PingFangSC-Medium;
				font-size: 13px;
				color: #FFFFFF;
				letter-spacing: 0;
			}
			.item1{
				image{
					width: 44rpx;
					height: 44rpx;
					margin-bottom: 8rpx;
					transform: translateY(6rpx);
				}
				
			}
			.item2{
				image{
					width: 57.4rpx;
					height: 41.8rpx;
					margin-bottom: 12rpx;
					transform: translateY(10rpx);
				}
				
			}
			.item3{
				image{
					width: 53.4rpx;
					height: 53.4rpx;
				}
				
			}
			.item4{
				image{
					width: 43.6rpx;
					height: 52.4rpx;
				}
				
			}
		}
	}
</style>

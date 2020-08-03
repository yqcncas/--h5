<template>
	<view class="myai" :style="{backgroundImage: bgFlag ? '' : 'url(../../static/image/index/5.png)'}">
		<view class="myai-header-wrapper">
			<view class="myai-header">
				<view class="myai-header-left">
					<image :src="userAvatar ? userAvatar : '../../static/image/index/2.png'" mode=""></image>
					<view class="myai-header-left-text">我的AI值</view>
				</view>
				<view class="myai-header-right">{{AllAi}}</view>
			</view>
		</view>
		<view class="myai-main">
			<view class="myai-main-header">AI明细</view>
			<scroll-view scroll-y="true" style="height: calc(100vh - 300rpx);" @scrolltolower="lower">
				<view class="myai-main-center">
					<view class="myai-main-center-item" v-for="(item, index) in myAiArr" :key = "index">
						<view class="myai-main-center-item-top">
							<view class="myai-main-center-item-top-left">{{item.content}}</view>
							<view class="myai-main-center-item-top-right">+{{item.num}}</view>
						</view>
						<view class="myai-main-center-item-bottom">{{item.createTime}}</view>
					</view>
				</view>
			
				<view v-if = "showNoList">
					<u-empty mode="list" ></u-empty>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			console.log(options)
			this.AllAi = options.allAi
			this.userAvatar = options.avatar
			this.initMoneyList()
		},
		data () {
			return {
				AllAi: 0,
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				type: 3,
				userAvatar: '',
				myAiArr: [],
				showNoList: false,
				bgFlag: true
			}
		},
		methods: {
			async initMoneyList () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.moneyList, {pageNum: this.pageNum, pageSize: this.pageSize, type: this.type}, "GET", 'FORM' )
				 console.log(res)
				if (res.total == 0) {
					this.showNoList = true
					this.bgFlag = true
				} else {
					this.showNoList = false
					this.bgFlag = false
				}
				 this.myAiArr = [...this.myAiArr, ...res.rows]
				 this.hasFlag = this.pageNum * 10 < res.total
			},
			lower () {
				if (this.hasFlag) {
					this.initMoneyList()
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.myai{
		width: 100%;
		height: 100%;
		overflow: hidden;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.myai-header-wrapper{
			width: 100%;
			height: 126rpx;
			background-color: #61B101;
			.myai-header{
				width: 690rpx;
				height: 206rpx;
				background: #FF9515;
				border-radius: 8px;
				overflow: hidden;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-left: 20rpx;
				padding-right: 32rpx;
				box-sizing: border-box;
				.myai-header-left{
					display: flex;
					align-items: center;
					image{
						width: 160rpx;
						height: 152rpx;
					}
					.myai-header-left-text{
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: #2E2E2E;
						letter-spacing: 0;
						padding-left: 32rpx;
						box-sizing: border-box;
					}
				}
				.myai-header-right{
					font-family: PingFangSC-Medium;
					font-size: 30px;
					color: #FFFFFF;
					letter-spacing: -0.72px;
				}
			}
				
		}
		.myai-main{
			width: 100%;
			position: absolute;
			top:222rpx;
			.myai-main-header{
				padding-left: 48rpx;
				box-sizing: border-box;
				font-weight: bold;
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #2C2C2C;
				letter-spacing: -0.39px;
				padding-bottom: 10rpx;
				box-sizing: border-box;
			}
			.myai-main-center{
				width: 100%;
				box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.05);
				border-radius: 14rpx;
				overflow: hidden;
				
				.myai-main-center-item{
					width: 714rpx;
					height: 128rpx;
					padding: 20rpx 28rpx 0rpx 30rpx;
					background: #FDDB3C;
					margin: 0 auto;
					
					&:first-child{
						border-top-right-radius: 16rpx;
						border-top-left-radius: 16rpx;
						box-sizing:border-box;
					}
					&:last-child{
						border-bottom-right-radius: 16rpx;
						border-bottom-left-radius: 16rpx;
						box-sizing:border-box;
						.myai-main-center-item-bottom{
							border-bottom: 0;
						}
					}
					.myai-main-center-item-top{
						display: flex;
						justify-content: space-between;
						.myai-main-center-item-top-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #000000;
							letter-spacing: -0.34px;
						}
						.myai-main-center-item-top-right{
							font-family: PingFangSC-Medium;
							font-size: 16px;
							color: #FC7FBA;
							letter-spacing: -0.39px;
						}
					}
					.myai-main-center-item-bottom{
						padding-top: 9rpx;
						box-sizing: border-box;
						text-align: right;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #000000;
						letter-spacing: -0.34px;
						border-bottom: 1rpx solid #FFFFFF;
						padding-bottom: 15rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>

<template>
	<view class="mymoney">
		<view class="myai-header-wrapper">
			<view class="myai-header">
				<view class="myai-header-left">
					<image src="../../static/image/index/2.png" mode=""></image>
					<view class="myai-header-left-text">我的天天奖钱包</view>
				</view>
				<view class="myai-header-right">{{myInfoMoney}}</view>
			</view>
		</view>
		<view class="myai-main">
			<view class="myai-main-header">钱包明细</view>
			<scroll-view scroll-y="true" style="height: calc(100vh - 300rpx);" @scrolltolower="lower">
				<view class="myai-main-center">
					<view class="myai-main-center-item" v-for="(item, index) in myMoney" :key = "index">
			<!-- 			<view class="myai-main-center-item-top">
							<view class="myai-main-center-item-top-left">
								
								{{myMoneyType[item.type]}}
							</view>
							<view class="myai-main-center-item-top-right">{{myStatus[item.status]}}{{item.num}}</view>
						</view>
						<view class="myai-main-center-item-bottom">{{item.createTime}}</view> -->
						
						<view class="mycard-jifen-item-top">
							<view class="mycard-jifen-item-top-left">{{item.content}}</view>
							<view class="mycard-jifen-item-top-right">{{myStatus[item.status]}}{{item.num}}</view>
						</view>
						<view class="mycard-jifen-item-bottom">
							<view class="mycard-jifen-item-bottom-left">{{myMoneyType[item.type]}}</view>
							<view class="mycard-jifen-item-bottom-right">{{item.createTime}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			console.log(options)
			this.myInfoMoney = options.myMoney
			this.initMyMoney()
		},
		data () {
			return {
				myInfoMoney: 0,
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				myMoney: [],
				myMoneyType: ['', '现金', 'JK', 'AI'],
				myStatus: ['', '-', '+']
			}
		},
		methods: {
			async initMyMoney() {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				console.log(this.pageNum)
				let res = await this.$fetch(this.$api.moneyList, {pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")
				console.log(res)
				this.myMoney = [...this.myMoney, ...res.rows]
				this.hasFlag = this.pageNum * 10 < res.total
			},
			lower () {
				if(this.hasFlag) {
					this.initMyMoney()
				}
			}
		}
	}
</script>

<style lang="less">
	.mymoney{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
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
				padding-bottom: 26rpx;
				box-sizing: border-box;
			}
			.myai-main-center{
				width: 100%;
				// box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.05);
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
						.mycard-jifen-item-bottom{
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
					
					.mycard-jifen-item-top, .mycard-jifen-item-bottom{
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					.mycard-jifen-item-top{
						.mycard-jifen-item-top-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #0F0F0F;
							letter-spacing: -0.34px;
						}
						.mycard-jifen-item-top-right{
							font-family: PingFangSC-Medium;
							font-size: 16px;
							color: #FC7FBA;
							font-weight: bold;
							letter-spacing: -0.39px;
						}
					}
					.mycard-jifen-item-bottom{
						padding-bottom: 15rpx;
						border-bottom: 1rpx solid #FFFFFF;
					}
				}
			}
		}
	}
</style>

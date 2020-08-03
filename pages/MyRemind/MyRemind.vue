<template>
	<view class="mycard" :style="{backgroundImage: bgFlag ? '' : 'url(../../static/image/index/5.png)'}">
		<view class="mycard-header">
			<view class="mycard-header-left" :class="{avtive: headerIndex == 0}" @click="handleTopIndex(0)">提醒记录</view>
			<view class="mycard-header-right" :class="{avtive: headerIndex == 1}" @click="handleTopIndex(1)">提醒积分</view>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh - 30rpx);" @scrolltolower="lower">
			<view class="mycard-main"  v-if="headerIndex == 0">
					<view class="mycard-main-item" v-for="(item, index) in remaindList" :key = "index">
						<view class="mycard-main-item-top">
							<view class="mycard-main-item-left">{{item.createTime}}</view>
							<view class="mycard-main-item-right">提醒</view>
						</view>
					</view>
			</view>
			
			<view class="mycard-jifen" v-if="headerIndex == 1">
				<view class="mycard-jifen-item" v-for="(item, index) in remaindList" :key = "index">
					<view class="mycard-jifen-item-top">
						<view class="mycard-jifen-item-top-left">获得JK值</view>
						<view class="mycard-jifen-item-top-right">+{{item.num}}</view>
					</view>
					<view class="mycard-jifen-item-bottom">
						<view class="mycard-jifen-item-bottom-left">提醒</view>
						<view class="mycard-jifen-item-bottom-right">{{item.createTime}}</view>
					</view>
				</view>
			</view>
			<view v-if = "showNoList">
				<u-empty mode="list" ></u-empty>
			</view>
		</scroll-view>

			

			
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initRemaindList()
		},
		data () {
			return {
				headerIndex: 0,
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				remaindList: [],
				showNoList: false,
				bgFlag: true
			}
		},
		methods: {
			// tab 切换
			handleTopIndex (index) {
				this.headerIndex = index
				this.pageNum = 0
				this.hasFlag = true
				this.remaindList = []
				this.initRemaindList()
			},
			// 获取数据
			async initRemaindList () {
				if(!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.remaindList,{pageNum: this.pageNum, pageSize: this.pageSize,signType: 2}, 'GET', 'FORM')
				console.log(res)
				if (res.total == 0) {
					this.showNoList = true
					this.bgFlag = true
				} else {
					this.showNoList = false
					this.bgFlag = false
				}
				this.remaindList = [...this.remaindList, ...res.rows]
				this.hasFlag = this.pageNum * 10 < res.total
			},
			lower () {
				if(this.hasFlag) {
					this.initRemaindList()
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>

	.mycard{
		width: 100%;
		// height: 100%;
		padding-bottom: 30rpx;
		overflow: hidden;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.mycard-header{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background: #FF9515;
			display: flex;
			position: fixed;
			top:0;
			z-index: 99;
			.mycard-header-left,.mycard-header-right{
				flex: 1;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 16px;
				color: #252525;
				letter-spacing: 0;
				position: relative;
				&::after{
					content: '';
					width: 0;
					height: 0;
					border-bottom: 8rpx solid #FDDB3C;
					border-radius: 5rpx;
					box-sizing: border-box;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 0;
					transition: .3s;
				}
				&.avtive{
					font-family: PingFangSC-Medium;
					font-weight: bold;
					font-size: 16px;
					color: #252525;
					letter-spacing: 0;
					&::after{
						width: 50%;
					}
				}
			}
		}
		.mycard-main{
			width: 710rpx;
			// background: #FDDB3C;
			border-radius: 16rpx;
			overflow: hidden;
			margin: 0 auto;
			margin-top: 14rpx;
			box-sizing: border-box;
			position: absolute;
			top: 114rpx;
			left: 50%;
			transform: translateX(-50%);
			// padding-bottom: 30rpx;
			box-sizing: border-box;
			.mycard-main-item{
				width: 100%;
				height: 100rpx;
				background: #FDDB3C;
				padding-left: 12rpx;
				padding-right: 10rpx;
				box-sizing: border-box;
				&:last-child{
					.mycard-main-item-top{
						border-bottom: 0;
					}
				}
				.mycard-main-item-top{
					height: 100%;
					display: flex;
					// justify-content: space-around;
					align-items: center;
					border-bottom: 1rpx solid #FFFFFF;
					
					.mycard-main-item-left{
						// flex: 1;
						padding-left: 24rpx;
						padding-right: 260rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #000000;
						letter-spacing: -0.34px;
					}
					.mycard-main-item-right{
						// flex: 1;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #161616;
						letter-spacing: -0.34px;
					}
				}
				.mycard-main-item-bottom{
					
				}
			}
		}
		.mycard-jifen{
			width: 710rpx;
			// padding-bottom: 30rpx;
			border-radius: 16rpx;
			overflow: hidden;
			margin: 0 auto;
			margin-top: 14rpx;
			box-sizing: border-box;
			position: absolute;
			top: 114rpx;
			left: 50%;
			transform: translateX(-50%);
			.mycard-jifen-item{
				// height: 168rpx;
				padding: 32rpx 10rpx 0rpx 22rpx;
				box-sizing: border-box;
				background: #FDDB3C;
				&:last-child{
					.mycard-jifen-item-bottom{
						border-bottom: 0;
					}
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
					padding-top: 28rpx;
					padding-bottom: 28rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #FFFFFF;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #0F0F0F;
					letter-spacing: -0.34px;
				}
			}
		}
	}
</style>

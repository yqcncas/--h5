<template>
	<view class="myinfluence" :style="{backgroundImage: bgFlag ? '' : 'url(../../static/image/index/5.png)'}">
		<view class="myinfluence-wrapper">
			<view class="myinfluence-wrapper-top">
				<view class="myinfluence-wrapper-top-left">关爱人</view>
				<view class="myinfluence-wrapper-top-right">关爱时间</view>
			</view>
			<scroll-view scroll-y="true" style="height: calc(100vh - 114rpx);" @scrolltolower="lower">
				<view class="myinfluence-wrapper-bottom">
					<view class="myinfluence-wrapper-bottom-item" v-for="(item, index) in initMyInFluenceInfo " :key = "index">
						<view class="xufeiButton" v-if="item.xufeiFlag" @click="xufeiFn">续费</view>
						<view class="myinfluence-wrapper-bottom-item-left" :class="{xifeiLeft: item.xufeiFlag}">{{item.user_name}}</view>
						<view class="myinfluence-wrapper-bottom-item-right">{{item.create_time}}</view>
						
					</view>
					
						
					
				</view>
				<view v-if = "showNoList">
					<u-empty mode="list" ></u-empty>
				</view>
			</scroll-view>
			
		</view>
		
		
		<u-popup v-model="payshow" mode="bottom">
			<view class="payshow-box">
				<view class="payshow-header">
					<view class="payshow-header-left">现在支付</view>
					<view class="payshow-header-right">¥<span>{{careCardPrice}}</span></view>
				</view>
				<view class="pay-way">
					<view class="pay-way-left">
						<image src="../../static/image/index/12.png" mode=""></image>
						<view class="wxpay">微信支付</view>
					</view>
					<view class="pay-way-right">
						<label class="radio"><radio value="r1" checked="true" /></label>
					</view>
				</view>
				<view class="pay-tip">我同意<span>购买守则</span>，我也同意支付以下所示的总金额（含服务费）。</view>
				<view class="pay" @click="payMoney">确认支付</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initMyInFluence()
			this.initCareInfo()
			this.nowDay = this.$dayjs().format("YYYY-MM-DD")
		},
		data () {
			return {
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				initMyInFluenceInfo: [],
				showNoList: false,
				bgFlag: true,
				bgUrl: '../../static/image/index/5.png',
				nowDay: '',
				payshow: false,
				careCardPrice: 0,
				productId: 0
			}
		},
		methods: {
			async initMyInFluence () {
				if (!this.hasFlag) return
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.myChild,{pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")
				console.log(res)
				
				if (res.total == 0) {
					this.showNoList = true
					this.bgFlag = true
				} else {
					this.showNoList = false
					this.bgFlag = false
				}
				this.initMyInFluenceInfo = [...this.initMyInFluenceInfo, ...res.rows]
				this.initMyInFluenceInfo.forEach((item) => {
					let date1 = this.$dayjs(item.care_time)
			
					item.xufeiFlag = date1.diff(this.nowDay, 'day') <= 5
				})
				
				this.hasFlag = this.pageNum * 10 < res.total
			},
			
			async initCareInfo () {
				let {data: res} = await this.$fetch(this.$api.careInfo, {}, 'GET', 'FORM')
				console.log(res)
				this.productId = res.productId
				this.careCardPrice = res.price	
			},
			xufeiFn () {
				this.payshow = true
			},
			lower () {
				if(this.hasFlag) {
					this.initMyInFluence()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		width: 100%;
		height: 100%;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.myinfluence{
		width: 100%;
		height: 100%;
		// overflow: hidden;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.myinfluence-wrapper{
			// background-image: url(../../static/image/index/5.png);
			// background-repeat: no-repeat;
			// background-size: 100% 100%;
			// padding-bottom: 30rpx;
			.myinfluence-wrapper-top{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				background: #FF9515;
				font-family: PingFangSC-Medium;
				font-size: 16px;
				font-weight: bold;
				color: #161616;
				letter-spacing: -0.39px;
				display: flex;
				.myinfluence-wrapper-top-left,.myinfluence-wrapper-top-right{
					flex: 1;
					text-align: center;
				}
			}
			.myinfluence-wrapper-bottom{
				width: 710rpx;
				background: #FDDB3C;
				border-radius: 8px;
				margin: 0 auto;
				margin-top: 14rpx;
				box-sizing: border-box;
				.myinfluence-wrapper-bottom-item{
					width: 100%;
					height: 96rpx;
					line-height: 96rpx;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #ECECEC;
					padding-left: 12rpx;
					padding-right: 10rpx;
					box-sizing: border-box;
					&:last-child{
						border-bottom: 0;
					}
					.xufeiButton{
						// width: 50rpx;
						height: 48rpx;
						text-align: center;
						line-height: 48rpx;
						padding: 2rpx;
						background-color: #f40;
						color: #FFFFFF;
						border-radius: 8rpx;
						font-size: 14px;
					}
					.myinfluence-wrapper-bottom-item-left{
						width: 350rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #161616;
						letter-spacing: -0.34px;
						// padding-left: 50rpx;
						padding-left: 112rpx;
						// padding-right: 174rpx;
						box-sizing: border-box;
						&.xifeiLeft{
							padding-left: 50rpx;
						}
					}
					.myinfluence-wrapper-bottom-item-right{
						flex: 1;
						text-align: right;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #000000;
						letter-spacing: -0.34px;
						padding-right: 10rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.payshow-box{
			width: 100%;
			// height: 652rpx;
			box-sizing: border-box;
			.payshow-header{
				padding-top: 26rpx;
				padding-left: 36rpx;
				padding-right: 41rpx;
				box-sizing: border-box;
				background:#FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 24rpx 24rpx 0 0;
				overflow: hidden;
				.payshow-header-left{
					opacity: 0.9;
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #000000;
					font-weight: bold;
				}
				.payshow-header-right{
					opacity: 0.9;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #EB4F81;
					span{
						font-size: 18px;
					}
				}
			}
			.pay-way{
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #fff;
				padding-left: 42rpx;
				padding-bottom: 46rpx;
				box-sizing: border-box;
				.pay-way-left{
					padding-top: 54rpx;
					box-sizing: border-box;
					display: flex;
					align-content: center;
					image{
						width: 74rpx;
						height: 82rpx;
					}
					.wxpay{
						line-height: 82rpx;
						padding-left: 21rpx;
						font-family: PingFangSC-Regular;
						font-size: 17px;
						color: #000000;
						box-sizing: border-box;
					}
				}
				.pay-way-right{
					padding-top: 54rpx;
					box-sizing: border-box;
					display: flex;
					align-content: center;
				}
			}
			.pay-tip{
				padding-left: 38rpx;
				padding-right: 34rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #000000;
				line-height: 20px;
				background-color: #fff;
				padding-bottom: 12rpx;
				box-sizing: border-box;
				span{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #56b4ff;
					line-height: 20px;
				}
			}
			.pay{
				width: 100%;
				height: 116rpx;
				line-height: 116rpx;
				text-align: center;
				opacity: 0.9;
				font-family: PingFangSC-Medium;
				font-size: 17px;
				color: #FFFFFF;
				background: #FCCA17;
			}
		}
	}
</style>

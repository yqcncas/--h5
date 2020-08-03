<template>
	<view class="mycarecard" :style="{backgroundImage: bgFlag ? '' : 'url(../../static/image/index/5.png)'}">
		<scroll-view scroll-y="true" style="height: calc(100vh - 30rpx);" @scrolltolower="lower">
		<view class="mycarecard-box">
			
				<view class="mycarecard-box-item" v-for="(item, index) in careInfo" :key = "index" @click="showQrCode(item.careUser, item.carePic)">
					<view class="mycarecard-box-left">
						<view class="mycarecard-box-left-avatar">
							<image src="../../static/image/index/6.png" mode=""></image>
						</view>
						<view class="mycarecard-box-left-right">
							<view class="mycarecard-box-left-right-top">{{item.productName}}</view>
							<view class="mycarecard-box-left-right-bottom">购买时间：{{item.createTime}}</view>
						</view>
					</view>
					<view class="mycarecard-box-right " :class="{active: item.careUser}" >{{item.careUser ? '已关爱': '未关爱'}}</view>
				</view>
		</view>
		<view v-if = "showNoList">
			<u-empty mode="list" ></u-empty>
		</view>
		</scroll-view>
		<u-popup v-model="QrcodeBox" mode = "center" border-radius="14" >
				<view class="qrbox">
					<image :src="qrcode" mode="aspectFill"></image>
				</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initMyCareCardInfo()
		},
		data () {
			return {
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				careInfo: [],
				QrcodeBox: false,
				showNoList: false,
				bgFlag: true,
				qrcode: ''
				
			}
		},
		methods: {
			async initMyCareCardInfo () {
				if (!this.hasFlag) return 
				this.pageNum = ++this.pageNum
				let res  = await this.$fetch(this.$api.careList, {pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")
				console.log(res)
				if (res.total == 0) {
					this.showNoList = true
					this.bgFlag = true
				} else {
					this.showNoList = false
					this.bgFlag = false
				}
				this.careInfo = [...this.careInfo, ...res.rows]
				this.hasFlag = this.pageNum * 10 < res.total
			},
			lower () {
				if (this.hasFlag) {
					this.initMyCareCardInfo()
				}
			},
			//　展示二维码
			showQrCode (careUser, qrcode) {
				if(!careUser) {
					this.QrcodeBox = true
				}
				this.qrcode = qrcode
			}
		}
	}
</script>

<style lang="less">
	.mycarecard{
		width: 100%;
		// height: 100%;
		padding-bottom: 30rpx;
		overflow: hidden;
		// background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.mycarecard-box{
			width: 714rpx;
			background: #FDDB3C;
			border-radius: 8px;
			overflow: hidden;
			margin: 0 auto;
			margin-top: 16rpx;
			.mycarecard-box-item{
				height: 178rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #000;
				border-color: rgba(0,0,0,0.10);;
				.mycarecard-box-left{
					display: flex;
					align-items: center;
					.mycarecard-box-left-avatar{
						image{
							width: 122rpx;
							height: 124rpx;
						}
					}
					.mycarecard-box-left-right{
						padding-left: 32rpx;
						box-sizing: border-box;
						.mycarecard-box-left-right-top{
							font-size: 16px;
							font-weight: bold;
							color: #000000;
							padding-bottom: 16rpx;
							box-sizing: border-box;
						}
						.mycarecard-box-left-right-bottom{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #5D5D5D;
							letter-spacing: -0.34px;
						}
					}
				}
				.mycarecard-box-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: -0.34px;
					padding-right: 26rpx;
					box-sizing: border-box;
					&.active{
						color: #FC7FBA;
					}
				}
			}
			
		}
		.qrbox{
			width: 652rpx;
			height: 798rpx;
			background: #FCCA17;
			text-align: center;
			padding-top: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 440rpx;
				height: 440rpx;
			}
			
		}
	}
</style>

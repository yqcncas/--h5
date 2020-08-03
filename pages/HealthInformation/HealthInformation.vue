<template>
	<view class="HealthInformation">
		<view class="HealthInformation-box">
			<scroll-view scroll-y="true"  style="height: calc(100vh - 30rpx);">
				<view class="HealthInformation-item" v-for="(item, index) in HealthTextArr" :key = "index" @click="goToRichText(item.content, item.title)">
					<view class="HealthInformation-item-text">{{item.title}}</view>
				</view>
			</scroll-view>
			
				
			
		</view>
	</view>
</template>

<script>
	export default {
		onLoad () {
			this.initHealthText()
		},
		data () {
			return {
				HealthTextArr: []
			}
		},
		methods: {
			async initHealthText () {
				let res = await this.$fetch(this.$api.book, {}, 'GET')
				 console.log(res)
				 this.HealthTextArr = res.rows
			},
			goToRichText (content, title) {
				uni.navigateTo({
					url: '../RichText/RichText?content=' + content + '&title=' + title
				})
			}
		}
	}
</script>

<style lang="less">
	.HealthInformation{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.HealthInformation-box{
			width: 714rpx;
			// background: #FF9515;
			border-radius: 16rpx;
			overflow: hidden;
			font-family: PingFangSC-Regular;
			font-size: 16px;
			color: rgba(255,255,255,0.90);
			letter-spacing: 0;
			margin: 0 auto;
			margin-top: 16rpx;
			.HealthInformation-item{
				width: 100%;
				height: 110rpx;
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				background: #FF9515;
				&:last-child{
					border-bottom-left-radius: 16rpx;
					border-bottom-right-radius: 16rpx;
					overflow: hidden;
					.HealthInformation-item-text{
						border-bottom: 0
						
					}
				}
				.HealthInformation-item-text{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: flex-end;
					padding-bottom: 34rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #FFFFFF;
				}
				
			}
		}
	}
</style>

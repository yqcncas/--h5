<template>
	<view class="feedback">
		<textarea maxlength="200" v-model="textAreaInfo" placeholder="请填写问题描述" placeholder-style="opacity: 0.5;font-family: PingFangSC-Regular;font-size: 14px;color: #000000;letter-spacing: 0;"/>
		
		</textarea>
		<view class="text-number">
			<text>{{textAreaInfo.length}}</text>
			<text>/</text>
			<text>200</text>
		</view>
		<view class="submit-button" @click="submitFeed">确认</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				textAreaInfo: ''
			}
		},
		methods: {
			async submitFeed () {
				let res = await this.$fetch(this.$api.addIssue, {content: this.textAreaInfo}, "POST", "FORM")
				console.log(res)
				if (res.code == 0) {
					uni.showToast({
						icon: 'success',
						title: res.msg
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.feedback{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		textarea{
			width: 714rpx;
			height: 540rpx;
			background: #FDDB3C;
			border-radius: 8px;
			margin: 0 auto;
			margin-top: 16rpx;
			padding: 22rpx 26rpx;
			box-sizing: border-box;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			background: #FDDB3C;
			border-radius: 8px;
			position: relative;
		}
		.text-number{
			position: absolute;
			top: 500rpx;
			right: 40rpx;
			opacity: 0.5;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #000000;
			
		}
		.submit-button{
			width: 576rpx;
			height: 84rpx;
			line-height: 84rpx;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			background: #FF9515;
			border-radius: 42rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			box-sizing: border-box;
			
		}
	}
</style>

<template>
	<view class="changepwd">
		<view class="changepwd-box">
			<view class="changepwd-box-item">
				<view class="changepwd-box-item-lineBox">
					<view class="changepwd-box-item-lineBox-left">旧密码</view>
					<input type="password" placeholder="请输入旧密码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #5D5D5D;" />
				</view>
			</view>
			<view class="changepwd-box-item">
				<view class="changepwd-box-item-lineBox">
					<view class="changepwd-box-item-lineBox-left">新密码</view>
					<input type="password" placeholder="请输入新密码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #5D5D5D;" />
				</view>
			</view>
			<view class="changepwd-box-item">
				<view class="changepwd-box-item-lineBox">
					<view class="changepwd-box-item-lineBox-left querennew">确认新密码</view>
					<input type="password" placeholder="请再次输入新密码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #5D5D5D;" />
				</view>
			</view>
		</view>
		<view class="submit-button">确认修改</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.changepwd{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.changepwd-box{
			width: 714rpx;
			height: 296rpx;
			background: #FDDB3C;
			border-radius: 16rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			box-sizing: border-box;
			.changepwd-box-item{
				width: 100%;
				height: 96rpx;
				padding: 0 26rpx;
				box-sizing: border-box;
				&:last-child{
					.changepwd-box-item-lineBox{
						border-bottom: 0;
					}
				}
				.changepwd-box-item-lineBox{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #ECECEC;
					.changepwd-box-item-lineBox-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #161616;
						letter-spacing: -0.34px;
						padding-right: 104rpx;
						box-sizing: border-box;
						&.querennew{
							padding-right: 48rpx;
							box-sizing: border-box;
						}
					}
					input{
						flex: 1;
						font-family: PingFangSC-Regular;
						font-size: 14px;
					}
				}
			}
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

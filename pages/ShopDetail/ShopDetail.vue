<template>
	<view class="shopdetail">
		<scroll-view scroll-y="true" style="height: 100%;">
	
		
		<view class="shopdetail-header">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 750rpx;">
				<swiper-item class="swiper-item-box" v-for="(item, index) in shopDetailInfo.pic" :key = "index">
					<view class="swiper-item shopdetail-header-swiper-item" >
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			
			</swiper>
		</view>
		<view class="shop-info">
			<view class="shop-info-header">{{shopDetailInfo.productName}}</view>
			<view class="shop-info-center">
				<view class="shop-info-center-left">
					<view style="text-align: left;">库存: {{shopDetailInfo.stock}}</view>
					<view v-if="shopDetailInfo.stock == 0">等待上货，后期按订单支付顺序发货。</view>
				</view>
				<view class="shop-info-center-right">市场价：¥{{shopDetailInfo.price}}</view>
			</view>
			<view class="shop-info-footer">{{shopDetailInfo.jkPrice}}JK</view>
		</view>
		<view class="detail-line"></view>
		<view class="rich-wrapper">
			<jyf-parser :html="richText" ref="article"></jyf-parser>
		</view>
	
		</scroll-view>
		<view class="submit-button" @click="goToShopBuy">领取或购买</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		onLoad (options) {
			console.log(options)
			this.productId = options.productId
			this.initShopDetailInfo()
		},
		components: {
		    jyfParser
		},
		data () {
			return {
				richText: '信息填写的过程中有一些需要注意的问题，在这里友情提醒大家。如注册邮箱不得为qq邮箱，建议使用163邮箱或公司邮箱，密码的设置要求为包含中文和数字，长度为8位数以上。3个密码保护问题和答案建议保存在本地，以免以后找回密码使用。著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。商业转载请联系作者获得授权，非商业转载请注明出处。著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。商业转载请联系作者获得授权，非商业转载请注明出处。著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。商业转载请联系作者获得授权，非商业转载请注明出处。',
				productId: 0,
				shopDetailInfo: {}
			}
		},
		methods: {
			// 点击购买
			goToShopBuy () {
				uni.navigateTo({
					url: '../ShopBuy/ShopBuy?shopInfo=' + JSON.stringify(this.shopDetailInfo)
				})
			},
			// 数据
			async initShopDetailInfo () {
				let res = await this.$fetch(this.$api.goodsInfo, {productId: this.productId}, "GET", "FORM")
				console.log(res)
				res.data.pic = res.data.pic.split(',')
				this.shopDetailInfo = res.data
				console.log(this.shopDetailInfo)
				this.richText = this.shopDetailInfo.content
			}
		}
	}
</script>

<style lang="less">
	.shopdetail{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url(../../static/image/index/5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.shopdetail-header{
			.swiper-item-box{
				width: 100%;
				height: 750rpx;
				.shopdetail-header-swiper-item{
					width: 100%;
					height: 750rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.shop-info{
			padding-left: 28rpx;
			padding-right: 38rpx;
			padding-bottom: 23rpx;
			box-sizing: border-box;
			.shop-info-header{
				font-weight: bold;
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #202020;
				letter-spacing: 0;
				padding-top: 8rpx;
				box-sizing: border-box;
				display: -webkit-box;    
				-webkit-box-orient: vertical;    
				-webkit-line-clamp: 2;    //控制行数
				overflow: hidden;
			}
			.shop-info-center{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #6E6E6E;
				text-align: right;
				padding-top: 14rpx;
				padding-bottom: 8rpx;
				box-sizing: border-box;
				.shop-info-center-left{
					font-size: 12px;
				}
			}
			.shop-info-footer{
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #63C3D1;
				text-align: right;
			}
		}
		.detail-line{
			margin-left: 27rpx;
			margin-right: 29rpx;
			
			border: 1rpx solid #C4C4C4;
		}
		.rich-wrapper{
			padding-top: 11rpx;
			padding-bottom: 160rpx;
			padding-left: 19rpx;
			padding-right: 19rpx;
			box-sizing: border-box;
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
			box-sizing: border-box;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 30rpx;
			z-index: 999;
		}
	}
</style>

<template>
	<view class="bigmarket">
		<scroll-view scroll-y="true" :style="{height: screenHeight + 'rpx'}">
		<view class="bigmarket-wrapper">
			<view class="bigmarket-header">
				<view class="bigmarket-header-title">{{bigCity['category1'][0].categoryName}}</view>
				<scroll-view scroll-x="true" >
					<view class="bigmarket-header-main">
						<view class="bigmarket-header-main-item" @click="goToShopDetail(anchoring.productId)" v-for = "(anchoring, index) in bigCity['category1']" :key = "index">
							<view class="bigmarket-header-main-top">
								<view class="bigmarket-header-main-text" :class="{active: anchoring.url != ''}">{{anchoring.url == '' ? '实物' : '课程'}}</view>
								<view class="img-box">
									<image :src="anchoring.pic[0]" mode="aspectFill"></image>
								</view>
							</view>
							<view class="bigmarket-header-main-bottom">
								<view class="bigmarket-header-main-bottom-top">{{anchoring.productName}}</view>
								<view class="bigmarket-header-main-bottom-footer">
									<view class="bigmarket-header-main-bottom-footer-left">市场价：¥{{anchoring.price}}</view>
									<view class="bigmarket-header-main-bottom-footer-right">{{anchoring.jkPrice}}JK</view>
								</view>
							</view>
						</view>
					

					</view>
				</scroll-view>
			</view>
			
			<view class="bigmarket-header">
				<view class="bigmarket-header-title">{{bigCity['category2'][0].categoryName}}</view>
				<scroll-view scroll-x="true" >
					<view class="bigmarket-header-main">
						<view class="bigmarket-header-main-item" @click="goToShopDetail(anchoring.productId)" v-for = "(anchoring, index) in bigCity['category2']" :key = "index">
							<view class="bigmarket-header-main-top">
								<view class="bigmarket-header-main-text" :class="{active: anchoring.url != ''}">{{anchoring.url == '' ? '实物' : '课程'}}</view>
								<view class="img-box">
									<image :src="anchoring.pic[0]" mode="aspectFill"></image>
								</view>
							</view>
							<view class="bigmarket-header-main-bottom">
								<view class="bigmarket-header-main-bottom-top">{{anchoring.productName}}</view>
								<view class="bigmarket-header-main-bottom-footer">
									<view class="bigmarket-header-main-bottom-footer-left">市场价：¥{{anchoring.price}}</view>
									<view class="bigmarket-header-main-bottom-footer-right">{{anchoring.jkPrice}}JK</view>
								</view>
							</view>
						</view>
					
				
					</view>
				</scroll-view>
				<scroll-view scroll-x="true" v-if = "firstGetArr.length">
					<view class="bigmarket-header-main">
						<view class="bigmarket-header-main-item" @click="goToShopDetail(fitstGet.productId)" v-for = "(fitstGet, index) in firstGetArr" :key = "index">
							<view class="bigmarket-header-main-top">
								<view class="bigmarket-header-main-text" :class="{active: fitstGet.url != ''}">{{fitstGet.url == '' ? '实物' : '课程'}}</view>
								<view class="img-box">
									<image :src="fitstGet.pic[0]" mode="aspectFill"></image>
								</view>
							</view>
							<view class="bigmarket-header-main-bottom">
								<view class="bigmarket-header-main-bottom-top">{{fitstGet.productName}}</view>
								<view class="bigmarket-header-main-bottom-footer">
									<view class="bigmarket-header-main-bottom-footer-left">市场价：¥{{fitstGet.price}}</view>
									<view class="bigmarket-header-main-bottom-footer-right">{{fitstGet.jkPrice}}JK</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
						
			</view>
			
			<view class="bigmarket-header">
				<view class="bigmarket-header-title">{{bigCity['category3'][0].categoryName}}</view>
				<scroll-view scroll-x="true">
					<view class="bigmarket-header-main">
						<view class="bigmarket-header-main-item" @click="goToShopDetail(freeGet.productId)" v-for = "(freeGet, index) in bigCity['category3']" :key = "index">
							<view class="bigmarket-header-main-top">
								<view class="bigmarket-header-main-text" :class="{active: freeGet.url != ''}">{{freeGet.url == '' ? '实物' : '课程'}}</view>
								<view class="img-box">
									<image :src="freeGet.pic[0]" mode="aspectFill"></image>
								</view>
							</view>
							<view class="bigmarket-header-main-bottom">
								<view class="bigmarket-header-main-bottom-top">{{freeGet.productName}}</view>
								<view class="bigmarket-header-main-bottom-footer">
									<view class="bigmarket-header-main-bottom-footer-left">市场价：¥{{freeGet.price}}</view>
									<view class="bigmarket-header-main-bottom-footer-right">{{freeGet.jkPrice}}JK</view>
								</view>
							</view>
						</view>
					
					</view>
				</scroll-view>
			<scroll-view scroll-x="true" v-if="freeGetArr.length">
				<view class="bigmarket-header-main">
					<view class="bigmarket-header-main-item"  @click="goToShopDetail(freeGetTwo.productId)" v-for = "(freeGetTwo, index) in freeGetArr" :key = "index">
						<view class="bigmarket-header-main-top">
							<view class="bigmarket-header-main-text" :class="{active: freeGetTwo.url != ''}">{{freeGetTwo.url == '' ? '实物' : '课程'}}</view>
							<view class="img-box">
								<image :src="freeGetTwo.pic[0]" mode="aspectFill"></image>
							</view>
						</view>
						<view class="bigmarket-header-main-bottom">
							<view class="bigmarket-header-main-bottom-top">{{freeGetTwo.productName}}</view>
							<view class="bigmarket-header-main-bottom-footer">
								<view class="bigmarket-header-main-bottom-footer-left">市场价：¥{{freeGetTwo.price}}</view>
								<view class="bigmarket-header-main-bottom-footer-right">{{freeGetTwo.jkPrice}}JK</view>
							</view>
						</view>
					</view>
				
				</view>
			</scroll-view>
						
			</view>
		</view>
		</scroll-view>
		
		
		
		
		<Tabbar :pagePath = "pagePath"></Tabbar>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.GetPhoneInfo()
			this.initGoodsList()
			if (uni.getStorageSync('showTip')) {
				uni.showModal({
				    title: '特别提示',
				    content: '请在24小时内选择关爱产品，过时无效。',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				uni.removeStorageSync('showTip')
			}
		},
		onShow() {
			this.pagePath = this.$route.fullPath
			console.log(this.pagePath)
		},
		data () {
			return {
				pagePath: '',
				bigCity: [],
				firstGetArr: [], // 首次领取第二行数据
				freeGetArr: [], // 自由选购第二行数据
				screenHeight: 0
			}
		},
		methods: {
			goToShopDetail (index) {
				uni.navigateTo({
					url: '../ShopDetail/ShopDetail?productId=' + index
				})
			},
			// 获取数据
			async initGoodsList () {
				let res = await this.$fetch(this.$api.goodsList, {}, "GET", "FORM")
				console.log(res)
				res.data["category1"].forEach((item) => {
					item.pic = item.pic.split(',')
				})
				res.data["category2"].forEach((item) => {
					item.pic = item.pic.split(',')
				})
				res.data["category3"].forEach((item) => {
					item.pic = item.pic.split(',')
				})
				
				this.bigCity = res.data
				console.log(this.bigCity.category1)
				if (this.bigCity["category2"].length > 10) {
					this.firstGetArr = res.data['category2'].splice(-(this.bigCity["category2"].length - 10))
				}
				if (this.bigCity["category3"].length > 10) {
					this.freeGetArr = res.data['category3'].splice(-(this.bigCity["category3"].length - 10))
				}
			},
			GetPhoneInfo () {
				uni.getSystemInfo({
				    success:  (res) => {
						this.screenHeight = res.screenHeight * 2 - 116
				    }
				});
			}
		}
	}
</script>

<style lang="less">
	page{
		// width: 100%;
		// height: 100%;
		// background-image: url(../../static/image/index/3.png);
		// background-repeat: no-repeat;
		// background-size: 100% 100%;
	}
	.bigmarket{
		width: 100%;
		// height: 100%;
		padding-bottom: 160rpx;
		overflow: hidden;
		background-image: url(../../static/image/index/3.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.bigmarket-wrapper{
			.bigmarket-header{
				padding-top: 36rpx;
				// padding-left: 20rpx;
				box-sizing: border-box;
				&:nth-child(1){
					.bigmarket-header-title{
						// width: 400rpx;
						span{
							font-size: 14px;
						}
					}
				}
				&:nth-child(2){
					.bigmarket-header-title{
						// width: 246rpx;
					}
				}
				&:nth-child(3){
					.bigmarket-header-title{
						// width: 246rpx;
					}
				}
				.bigmarket-header-title{
					display: inline-block;
					padding: 0 30rpx;
					// width: 204rpx;
					height: 44rpx;
					line-height: 44rpx;
					margin-left: 20rpx;
					text-align: center;
					background: #FF9515;
					border-radius: 22rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: #FFFFFF;
					letter-spacing: 0;
				}
				.bigmarket-header-main{
					width: 318rpx;
					// height: 226rpx;
					padding-top: 22rpx;
					box-sizing: border-box;	
					display: flex;
					
					.bigmarket-header-main-item{
						padding-left: 20rpx;
						box-sizing: border-box;
						&:last-child{
							padding-right: 20rpx;
							box-sizing: border-box;
						}
					}
					.bigmarket-header-main-top{
						position: relative;
						.bigmarket-header-main-text{
							width: 52rpx;
							height: 28rpx;
							line-height: 24rpx;
							text-align: center;
							background: #63C3D1;
							border-radius: 1px;
							overflow: hidden;
							font-family: PingFangSC-Medium;
							font-size: 8px;
							color: #FFFFFF;
							position: absolute;
							left: 12rpx;
							top:6rpx;
							z-index: 99;
							// padding: 4rpx;
							box-sizing: border-box;
							&.active{
								background: #FF6697;
								
							}
						}
						.img-box{
							width: 318rpx;
							height: 156rpx;
							border-top-left-radius: 12rpx;
							border-top-right-radius: 12rpx;
							overflow: hidden;
							image{
								width: 318rpx;
								height: 156rpx;
							}
						}
					}
					.bigmarket-header-main-bottom{
						background: #FCCA17;
						border-radius: 10rpx;
						box-sizing: border-box;
						padding: 0 8rpx;
						.bigmarket-header-main-bottom-top{
							font-family: PingFangSC-Medium;
							font-size: 10px;
							color: #202020;
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 1;    //控制行数
							overflow: hidden;
						}
						.bigmarket-header-main-bottom-footer{
							
							display: flex;
							justify-content: space-between;
							padding-bottom: 10rpx;
							box-sizing: border-box;
							.bigmarket-header-main-bottom-footer-left{
								font-family: PingFangSC-Medium;
								font-size: 9px;
								color: #FFFFFF;
							}
							.bigmarket-header-main-bottom-footer-right{
								font-family: PingFangSC-Medium;
								font-size: 11px;
								color: #FF5415;
							}
						}
					}
				}
			}
		}
		
	}
</style>
<style>
	::-webkit-scrollbar {
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    color: transparent;
	    background: transparent;  
	}
</style>

<template>
	<view class="index">
		<view class="index-header " :class="{on: indexCareHeaderShow}" @click="getCareCard(MsgHeaderInfoName.msgId)" v-if="indexCareHeaderShow">
			<view class="index-header-left"  >
				<image src="../../static/image/index/2.png" mode=""></image>
				<view class="index-header-left-text">
					<text>{{MsgHeaderInfoName.content}}</text>
					<!-- 给您赠送了关爱卡！ -->
				</view>
			</view>
			<view class="index-header-right"  v-if="indexCareHeaderShow">
				立即领取
			</view>
		</view>
		<view class="nomsg-banner" v-if="!indexCareHeaderShow"></view>
		<view class="index-main" :class="{nomsgHeader: !indexCareHeaderShow}">
			<view class="index-main-top">
				<view class="index-main-top-item">
					<view class="index-main-top-item-left">
						<image :class="{circle: userInfo.avatar}" :src="userInfo.avatar ? userInfo.avatar : '../../static/image/index/2.png'" mode=""></image>
					</view>
					<view class="index-main-top-item-right">
						<view class="index-main-top-item-right-top">
							<view class="index-main-top-item-right-top-left">{{userInfo.name}}</view>
							<view class="index-main-top-item-right-top-right">{{bbLeavel[userInfo.level]}}</view>
						</view>
						<view class="index-main-top-item-right-bottom">
							<view class="index-main-top-item-right-bottom-item">
								<view class="index-main-top-item-right-bottom-item-top">{{userInfo.canJk}}</view>
								<view class="index-main-top-item-right-bottom-item-bottom">本月可收JK</view>
							</view>
							<view class="index-main-top-item-right-bottom-item">
								<view class="index-main-top-item-right-bottom-item-top">{{userInfo.monthJk}}</view>
								<view class="index-main-top-item-right-bottom-item-bottom">本月已收JK</view>
							</view>
							<view class="index-main-top-item-right-bottom-item">
								<view class="index-main-top-item-right-bottom-item-top">{{userInfo.allJk}}</view>
								<view class="index-main-top-item-right-bottom-item-bottom">天天奖钱包</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="index-main-center">
				<view class="index-main-center-top">
					<view class="index-main-center-top-left" :class="{disabledSign: signCard}" @click="sign(1)">日常打卡</view>
					<view class="index-main-center-top-right" :class="{disabledSign: signTip}" @click="sign(2)">日常提醒</view>
				</view>
				<view class="index-main-center-bottom">
					<image src="../../static/image/index/1.png" mode=""></image>
				</view>
				<view class="index-main-center-footer-main">只要人人都献出一点爱，世界将变成美好的人间！</view>
				<view class="juzi " :class="'item' + index" v-for="(count, index) in cardDay" :key = "index" v-if="count">
					<image src="../../static/image/index/15.png" mode=""></image>
				</view>
				<view class="model-fix" v-if="modelfixFlag">
					<view class="motaikuang">
						<view class="motaikuang-title">天天奖钱包</view>
						<view class="motaikuang-title-number">
							<u-count-to :start-val="0" :end-val="userInfo.allJk" :decimals="2" color = '#fff'></u-count-to>	
						</view>
					
					</view>
				</view>
				
			</view>
			<view class="index-main-footer">
				<view class="index-main-footer-header">
					<view class="index-main-footer-header-top">
						<view class="index-main-footer-header-top-left">
							<view class="index-main-footer-header-top-left-top">{{userInfo.allAi}}</view>
							<view class="index-main-footer-header-top-left-bottom">爱心AI累计量</view>
						</view>
						<view class="index-main-footer-header-top-right">
							<view class="index-main-footer-header-top-left-top">{{userInfo.monthAi}}</view>
							<view class="index-main-footer-header-top-left-bottom">本月AI增量</view>
						</view>
					</view>
					<view class="index-main-footer-header-bottom">
						<view class="index-main-footer-header-bottom-top">
							<view class="index-main-footer-header-bottom-top-item">
								<view class="index-main-footer-header-bottom-top-t">{{indenMainInfo.monthJk}}</view>
								<view class="index-main-footer-header-bottom-top-b">今日产出健康金币</view>
							</view>
							<view class="index-main-footer-header-bottom-top-item">
								<view class="index-main-footer-header-bottom-top-t">{{indenMainInfo.surplusJk}}</view>
								<view class="index-main-footer-header-bottom-top-b">剩余健康金币</view>
							</view>
							<view class="index-main-footer-header-bottom-top-item">
								<view class="index-main-footer-header-bottom-top-t">{{indenMainInfo.fullJk}}</view>
								<view class="index-main-footer-header-bottom-top-b">健康金币总量</view>
							</view>
						</view>
						<view class="index-main-footer-header-bottom-bottom">
							<view class="index-main-footer-header-bottom-bottom-left">
								<view class="index-main-footer-header-bottom-bottom-left-top">{{indenMainInfo.monthAi}}</view>
								<view class="index-main-footer-header-bottom-bottom-left-bottom">本月AI印章产出</view>
							</view>
							<view class="index-main-footer-header-bottom-bottom-right">
								<view class="index-main-footer-header-bottom-bottom-left-top">{{indenMainInfo.allAi}}</view>
								<view class="index-main-footer-header-bottom-bottom-left-bottom">AI印章总量</view>
							</view>
						</view>
					</view>
				
				</view>
				<view class="swiper-box">
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 100%;">
						<swiper-item v-for="(swierItem, index) in swiperImage" :key = "index">
							<view class="swiper-box-item">
								<image :src="swierItem" mode=""></image>
							</view>
						</swiper-item>
					<!-- 	<swiper-item>
							<view class="swiper-box-item">
								<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1650808851,593598514&fm=26&gp=0.jpg" mode=""></image>
							</view>
						</swiper-item> -->
					</swiper>
				</view>
				<view class="video-box">
					<video id="myVideo" class="video-box-video" :src="indenMainInfo.movieUrl"
					 controls ></video>
				</view>
				<view class="article">
					<view class="article-top">精选文章</view>
					<view class="article-line"></view>
					<view class="rich-box" @click="goToRichText(richContent, richTitle)">
						<jyf-parser :html="richText" ref="article"></jyf-parser>
					</view>
					
					
				</view>
			
			</view>
	
		</view>
		
		
		<Tabbar :pagePath = "'/'" ></Tabbar>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import baseURL from '../../config/index.js'
	export default {
		onLoad() {
			this.initMaxMoney()
			this.initIndexInfo()
			this.initCareMsg()
		},
		onShow() {
			this.pagePath = this.$route.fullPath
			// 今天是否已打卡提醒
			this.initMyInfo()
			this.signFlag()
			this.signRecord()
			this.getOpenId()
		},
		data() {
			return {
				show: true,
				pagePath: '',
				richText: '我是富文本',
				juziCount: 21,
				cardDay: [],
				signCard: false ,// 是否禁止打卡
				signTip: false, // 是否禁止提醒
				richTitle: '', // 富文本标题
				rightContent: '',
				bbLeavel: ['幸福宝宝', '幸福宝宝', '健康宝宝', '富贵宝宝'], // 等级
				userInfo: {
					name: '',
					level: 1,
					allAi: 0,
					allJk: 0,
					monthAi: 0,
					monthJk: 0,
					avatar: '',
					address: '',
					provinceString: '',
					canJk: 0
				},
				indenMainInfo: {}, // 首页数据
				swiperImage: [], // 轮播图数据
				pageNum: 1,
				pageSize: 10000,
				indexCareHeaderShow: false,
				modelfixFlag: false,
				openid: '',
				code: ''
			}
		},
		components: {
		    jyfParser
		},
		methods: {
			async getOpenId () {
				var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					if (!uni.getStorageSync('openId') && uni.getStorageSync('token')) {
						if(!this.getWechatCode()) {
							 window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$api.appid}&redirect_uri=${this.$api.redirect_url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
						} else {
							this.code = this.getWechatCode()
							// console.log(this.code)
							let msg = await this.$fetch(this.$api.getOpenIdFn, {js_code: this.code}, 'GET', 'FORM')
							console.log(msg)
							this.openid = msg.data.openid
							uni.setStorageSync('openId', this.openid)
						}
					}
				}
				
			},
			//截取Code
			getWechatCode () {
				 function parse_url (url) {
				// 定义函数
				var pattern = /(\w+)=(\w+)/gi // 定义正则表达式
				var parames = {} // 定义数组
				url.replace(pattern, function (a, b, c) {
				  parames[b] = c
				})
				return parames // 返回这个数组.
				 }
				 // 获取当前url   取到code
				 let url = window.location.href
				 let params = parse_url(url)
				 return params.code
			},
			// 收益最多富文本
			async initMaxMoney () {
				let res = await this.$fetch(this.$api.maxMoney, {}, 'GET', 'FORM')
				
				this.richText = res.data.title + res.data.content
				this.richTitle = res.data.title
				this.richContent = res.data.content
			},
			// 个人信息
			async initMyInfo () {
				let res = await this.$fetch(this.$api.userInfo, {}, 'GET')
				
				if (res.code == 0) {
					this.userInfo.name = res.data.userName
					this.userInfo.level = res.data.level
					this.userInfo.allAi = res.data.allAi
					this.userInfo.allJk = res.data.allJk
					this.userInfo.avatar = res.data.avatar
					this.userInfo.address = res.data.address
					this.userInfo.provinceString = res.data.provinceString
					this.userInfo.monthAi = res.data.monthAi
					this.userInfo.monthJk = res.data.monthJk
					this.userInfo.canJk = res.data.canJk
					
				}
			},
			
			// 打卡 提醒
			sign (index) {
				if (index === 1 && !this.signCard) {
					uni.showModal({
					    title: '日常打卡',
					    content: '请确认是否打卡',
					    success: async (res) => {
					        if (res.confirm) {
							   let msg = await this.$fetch(this.$api.sign, {signType: 1}, "POST", "FORM")
							  
							   if (msg.code == 0) {
								   this.initMyInfo()
								   uni.showToast({
								   	icon: 'success',
									title: '打卡成功'
								   })
								   this.signRecord()
								   this.initIndexInfo()
								   this.signCard = true
								   this.modelfixFlag = true
								   const innerAudioContext = uni.createInnerAudioContext();
								   innerAudioContext.autoplay = true;
								   innerAudioContext.src = '../../static/image/123.mp3';
								   innerAudioContext.onPlay(() => {
								     console.log('开始播放');
								   });
								   setTimeout(() => {
									   this.modelfixFlag = false
								   }, 2800)
							   } else {
								   uni.showToast({
										icon: 'none',
										title: '今日已签到,请勿重复操作'
								   })
							   }
					        } else if (res.cancel) {
					           
					        }
					    }
					});
				} else {
					if(index == 1) {
						uni.showToast({
							icon: 'none',
							title: '今日已签到,请勿重复操作'
						})
					}
				}
				
				if (index === 2 && !this.signTip) {
					uni.showModal({
					    title: '日常提醒',
					    content: '请确认是否提醒',
					    success: async (res) => {
					        if (res.confirm) {
					          let msg = await this.$fetch(this.$api.sign, {signType: 2}, "POST", "FORM")
								
							   if (msg.code == 0) {
								   this.initMyInfo()
								   uni.showToast({
								   	icon: 'success',
									title: '提醒成功'
								   })
								   this.signTip = true
								   this.signRecord()
								   this.initIndexInfo()
								   this.modelfixFlag = true
								   const innerAudioContext = uni.createInnerAudioContext();
								   innerAudioContext.autoplay = true;
								   innerAudioContext.src = '../../static/image/123.mp3';
								   innerAudioContext.onPlay(() => {
								     console.log('开始播放');
								   });
								   setTimeout(() => {
									   this.modelfixFlag = false
								   }, 2800)
								   
							   } else {
								   uni.showToast({
										icon: 'none',
										title: '今日已提醒或未赠送关爱卡'
								   })
							   }
					        } else if (res.cancel) {
					           
					        }
					    }
					});
				} else {
					if(index == 2) {
						uni.showToast({
							icon: 'none',
							title: '今日已提醒或未赠送关爱卡'
						})
					}
					
				}
			},
			// 打卡记录
			async signRecord (index) {
				let signRecord = await this.$fetch(this.$api.signList, {}, "GET", "FORM")
				
				this.cardDay = signRecord.data
			},
			// 检测是否已打卡和提醒
			async signFlag () {
				let res = await this.$fetch(this.$api.signFlag, {signType: 1}, "GET")
				if (res.code == 500) {
					this.signCard = true
				}
				let msg = await this.$fetch(this.$api.signFlag, {signType: 2}, "GET")
				if (msg.code == 500) {
					this.signTip = true
				}
			},
			// 首页数据
			async initIndexInfo () {
				let res = await this.$fetch(this.$api.indexInfo, {}, "GET", "FORM")
				console.log(res)
				this.indenMainInfo = res.data.baseData
			
				let swiperInfo = res.data.picasa
				let baseurl = res.data.prefix
				this.indenMainInfo.movieUrl = baseurl + res.data.baseData.movieUrl
				swiperInfo.forEach((item) => {
					this.swiperImage.push(baseurl+ item.image)
					console.log(this.swiperImage)
				})
			},
			// 去富文本
			goToRichText (content, title) {
				uni.navigateTo({
					url: '../RichText/RichText?content=' + content + '&title=' + title
				})
			},
			// 获取关爱卡提示消息
			async initCareMsg () {
				let res = await this.$fetch(this.$api.msg, {pageNum: this.pageNum, pageSize: this.pageSize}, "GET", "FORM")
				console.log(res)
				this.MsgHeaderInfo = res.rows
				this.MsgHeaderInfoName = this.MsgHeaderInfo[ this.MsgHeaderInfo.length - 1 ]
				console.log(this.MsgHeaderInfoName.msgId)
				this.indexCareHeaderShow = res.total
				
			},
			// 领取关爱卡
			getCareCard (msgId) {
				uni.showModal({
				    title: '领取关爱卡',
				    content: '确定领取关爱卡么',
				    success: async (res) => {
				        if (res.confirm) {
				           let res = await this.$fetch(this.$api.readMsg, {msgId: msgId}, "GET", 'FORM') 
						   console.log(res)
						   uni.setStorageSync('showTip', true)
						   if (res.code == 0) {
							   uni.showToast({
							   	 icon: 'success',
								 title: res.msg
							   })
							   uni.reLaunch({
									url: '../BigMarket/BigMarket'
							   })
						   } else {
							   uni.showToast({
							   	 icon: 'none',
							   	 title: res.msg
							   })
						   }
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="less">
	.index{
		width: 100%;
		padding-bottom: 116rpx;
		box-sizing: border-box;
		.index-header{
			width: 100%;
			height: 122rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 50rpx;
			padding-right: 26rpx;
			box-sizing: border-box;
			
			background: #5cc2cf;
			position: fixed;
			top: 0;
			z-index: 99999;
			&.on{
				background: #B6E82C;
			}
			.index-header-left{
				display: flex;
				align-items: center;
				
				image{
					width: 70rpx;
					height: 70rpx;
				}
				.index-header-left-text{
					font-family: PingFangSC-Regular;
					font-size: 13px;
					color: #000000;
					letter-spacing: 0;
					margin-left: 25rpx;
					box-sizing: border-box;
					text{
						font-family: PingFangSC-Medium;
						font-size: 13px;
						font-weight: bold;
						color: #292929;
					}
				}
			}
			.index-header-right{
				width: 162rpx;
				height: 52rpx;
				background: #FCA818;
				border-radius: 13px;
				box-sizing: border-box ;
				font-family: PingFangSC-Medium;
				font-size: 13px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				line-height: 52rpx;
			}
		}
		.nomsg-banner{
			width: 100%;
			height: 122rpx;
			background: #5cc2cf;
		}
		.index-main{
			width: 100%;
			position: absolute;
			top: 122rpx;
			&.nomsgHeader{
				top: 60rpx;
			}
			.index-main-top{
				width: 100%;
				height: 208rpx;
				background: #5cc2cf;
				display: flex;
				align-items: center;
				.index-main-top-item{
					width: 714rpx;
					height: 170rpx;
					background: #FCCA17;
					border-radius: 8px;
					box-sizing: border-box;
					margin: 0 auto;
					display: flex;
					align-items: center;
					.index-main-top-item-left{
						margin-left: 38rpx;
						margin-right: 46rpx;
						box-sizing: border-box;
						image{
							width: 134rpx;
							height: 128rpx;
							&.circle{
								border-radius: 50%;
							}
						}
					}
					.index-main-top-item-right{
						flex: 1;
						.index-main-top-item-right-top{
							display: flex;
							align-items: center;
							padding-bottom: 12rpx;
							box-sizing: border-box;
							.index-main-top-item-right-top-left{
								font-family: STYuanti-SC-Regular;
								font-size: 17px;
								color: #2E2E2E;
								letter-spacing: 0;
								margin-right: 16rpx;
								box-sizing: border-box;
							}
							.index-main-top-item-right-top-right{
								width: 110rpx;
								height: 34rpx;
								line-height: 34rpx;
								background-image: linear-gradient(136deg, #FE99AF 0%, #FE71B0 100%);
								border-radius: 17rpx;
								box-sizing: border-box;
								font-family: PingFangSC-Medium;
								font-size: 10px;
								color: #FFFFFF;
								letter-spacing: 0;
								text-align: center;
							}
						}
						.index-main-top-item-right-bottom{
							
							display: flex;
							.index-main-top-item-right-bottom-item{
								margin-right: 44rpx;
								box-sizing: border-box;
								display: flex;
								flex-direction: column;
								&:last-child{
									margin-right: 0;
								}
								.index-main-top-item-right-bottom-item-top{
									font-family: PingFangSC-Medium;
									font-size: 14px;
									color: #F9F9F9;
									letter-spacing: 0;
									text-align: center;
								}
								.index-main-top-item-right-bottom-item-bottom{
									font-family: PingFangSC-Medium;
									font-size: 12px;
									font-weight: bold;
									color: #121212;
									letter-spacing: 0;
									text-align: center;
								}
							}
						}
					}
				}
			}
			.index-main-center{
				width: 100%;
				height: 1000rpx;
				margin-top: -6rpx;
				margin-bottom: -6rpx;
				background-image: url(../../static/image/index/4.png);
				background-repeat: no-repeat;
				background-size: cover;
				position: relative;
				.index-main-center-top{
					width: 100%;
					display: flex;
					justify-content: space-around;
					.index-main-center-top-left, .index-main-center-top-right{
						width: 280rpx;
						height: 60rpx;
						line-height: 60rpx;
						background: #FCA718;
						border-radius: 30rpx;
						font-family: STYuanti-SC-Regular;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: 0;
						text-align: center;
						&.disabledSign{
							background: #c8c9cc;
						}
					}
				}
				.index-main-center-bottom{
					position: absolute;
					bottom: 160rpx;
					left: 38rpx;
					image{
						width: 322rpx;
						height: 252rpx;
					}
				}
				.index-main-center-footer-main{
					width: 84%;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 94rpx;
					// width: 352rpx;
					height: 52rpx;
					line-height: 52rpx;
					background: #FCA718;
					border-radius: 26rpx;
					box-sizing: border-box;
					font-family: STYuanti-SC-Regular;
					font-size: 12px;
					color: #FFFFFF;
					letter-spacing: 0;
					text-align: center;
				}
				.juzi{
					width: 48rpx;
					height: 60rpx;
					position: absolute;
					left: 0;
					top:0;
					z-index: 10;
					display: none;
					image{
						width: 48rpx;
						height: 60rpx;
					}
					&.item0{
						display: block;
						left: 14.4%;
						top: 53%;
					}
					&.item1{
						display: block;
						left: 31%;
						top: 51%;
					}
					&.item2{
						display: block;
						left: 22%;
						top: 47%;
					}
					&.item3{
						display: block;
						left: 14%;
						top: 41%;
					}
					&.item4{
						display: block;
						left: 23%;
						top: 37%;
					}
					&.item5{
						display: block;
						left: 34%;
						top: 37%;
					}
					&.item6{
						display: block;
						left: 21%;
						top: 30%;
					}
					&.item7{
						display: block;
						left: 33%;
						top: 28%;
					}
					&.item8{
						display: block;
						left: 42%;
						top: 33%;
					}
					&.item9{
						display: block;
						left: 48%;
						top: 38%;
					}
					&.item10{
						display: block;
						left: 55%;
						top: 42%;
					}
					&.item11{
						display: block;
						left: 64%;
						top: 44%;
					}
					&.item12{
						display: block;
						left: 59%;
						top: 50%;
					}
					&.item13{
						display: block;
						left: 72%;
						top: 46%;
					}
					&.item14{
						display: block;
						left: 68%;
						top: 55%;
					}
					&.item15{
						display: block;
						left: 80%;
						top: 53%;
					}
					&.item16{
						display: block;
						left: 85%;
						top: 44%;
					}
					&.item17{
						display: block;
						left: 73%;
						top: 40%;
					}
					&.item18{
						display: block;
						left: 65%;
						top: 35%;
					}
					&.item19{
						display: block;
						left: 57%;
						top: 32%;
					}
					&.item20{
						display: block;
						left: 48%;
						top: 25%;
					}
					
				}
				.model-fix{
					position: fixed;
					left: 0;
					top:0;
					bottom: 0;
					right: 0;
					background-color: rgba(0,0,0,0.5);
					z-index: 99999;
				}
				.motaikuang{
					width: 350rpx;
					height: 350rpx;
					text-align: center;
					// line-height: 300rpx;
					
					background: #FCCA17;
					border-radius: 16rpx;
					overflow: hidden;
					color: #FFFFFF;
					position: absolute;
					left: 50%;
					top: 50%;
					
					// transform: translate(-50%, -50%);
					z-index: 999;
					transform: scale(1) translate(-50%, -50%);

					animation: showMotai .7s linear 2s 1 normal;
					.motaikuang-title{
						font-size: 16px;
						color: #000000;
						font-weight: bold;
						padding-top: 50rpx;
						padding-bottom: 60rpx;
						box-sizing: border-box;
					}
				}
			}
			.index-main-footer{
				width: 100%;
				height: 1562rpx;
				background-image: url(../../static/image/index/3.png);
				background-repeat: no-repeat;
				background-size: cover;	
				.index-main-footer-header{
					width: 714rpx;
					// height: 118rpx;
					// background: #FF9515;
					
					margin: 0 auto;
					
					.index-main-footer-header-top{
						width: 100%;
						height: 118rpx;
						background: #FF9515;
						display: flex;
						justify-content: space-around;
						align-items: center;
						box-shadow: 0 2px 4px 0 rgba(21,45,27,0.50);
						border-radius: 8px;
						box-sizing: border-box;
						.index-main-footer-header-top-left,.index-main-footer-header-top-right{
							.index-main-footer-header-top-left-top{
								font-family: PingFangSC-Medium;
								font-size: 14px;
								color: #FFFFFF;
								letter-spacing: 0;
								text-align: center;
							}
							.index-main-footer-header-top-left-bottom{
								font-family: STYuanti-SC-Regular;
								font-size: 12px;
								color: #FAFF25;
								letter-spacing: 0;
								text-align: center;
							}
						}
					}
					.index-main-footer-header-bottom{
						width: 714rpx;
						height: 200rpx;
						background: #FF9515;
						box-shadow: 0 2px 4px 0 rgba(21,45,27,0.50);
						border-radius: 8px;
						margin-top: 20rpx;
						box-sizing: border-box;
						.index-main-footer-header-bottom-top{
							width: 100%;
							padding-top: 16rpx;
							box-sizing: border-box;
							display: flex;
							.index-main-footer-header-bottom-top-item{
								flex: 1;
								text-align: center;
								.index-main-footer-header-bottom-top-t{
									font-family: PingFangSC-Medium;
									font-size: 14px;
									color: #FFFFFF;
									letter-spacing: 0;
								}
								.index-main-footer-header-bottom-top-b{
									font-family: STYuanti-SC-Regular;
									font-size: 11px;
									color: #FAFF25;
									letter-spacing: 0;
								}
							}
						}
						.index-main-footer-header-bottom-bottom{
							display: flex;
							padding-top: 28rpx;
							box-sizing: border-box;
							.index-main-footer-header-bottom-bottom-left, .index-main-footer-header-bottom-bottom-right{
								flex: 1;
								.index-main-footer-header-bottom-bottom-left-top{
									font-family: PingFangSC-Medium;
									font-size: 14px;
									color: #FFFFFF;
									letter-spacing: 0;
									text-align: center;
								}
								.index-main-footer-header-bottom-bottom-left-bottom{
									font-family: STYuanti-SC-Regular;
									font-size: 11px;
									color: #FAFF25;
									letter-spacing: 0;
									text-align: center;
								}
							}
						}
					}
					
				}
				.swiper-box{
					padding-top: 38rpx;
					width: 100%;
					height: 400rpx;
					box-sizing: border-box;
					.uni-swiper-wrapper{
						width: 100%;
						height: 100%;
					}
					.swiper-box-item{
						width: 100%;
						height: 400rpx;
						image{
							width: 100%;
							// height: 100%;
							height: 400rpx;
						}
					}
				}
				.video-box{
					padding-top: 18rpx;
					padding-bottom: 20rpx;
					box-sizing: border-box;
					width: 100%;
					height: 434rpx;
					.video-box-video{
						width: 100%;
						height: 100%;
					}
				}
				.article{
					width: 714rpx;
					height: 226rpx;
					overflow-y: auto;
					padding: 18rpx 20rpx 26rpx 22rpx;
					margin: 0 auto;
					background: #FF9515;
					border-radius: 8px;
					box-sizing: border-box;
					.article-top{
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #FFD336;
						letter-spacing: 0;
						padding-bottom: 10rpx;
						box-sizing: border-box;
					}
					.article-line{
						width: 100%;
						height: 4rpx;
						border: 2rpx solid #FFFFFF;
						opacity: .7;
					}
					.rich-box{
						padding-top: 10rpx;
						opacity: 0.9;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FFFFFF;
					}
				}
			}
		}
		@keyframes showMotai {
			from {
				left: 50%;
				// top: 40%;
				// width: -150rpx;
				// height: -150rpx;
				// transform: scale(1);
			}
			to {
				// transform: scale(0);
				left: 70%;
				top: 5%;
				// width: -150rpx;
				// height: -150rpx;
				transform: scale(0);
				
			}
		}
	}

</style>

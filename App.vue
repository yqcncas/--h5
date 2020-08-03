<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// uni.reLaunch({
			// 	url: 'pages/index/index'
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page{
		width: 100%;
		height: 100%;
		
	}
	swiper .wx-swiper-dot,
	swiper .a-swiper-dot,
	swiper .uni-swiper-dot {
		background-color: #7A7A7A;
		width: 12rpx;
		height: 12rpx;
		border: 50%;
		margin: 0 8upx !important;
	}
	//选中状态
	swiper .wx-swiper-dot.wx-swiper-dot-active,
	swiper .a-swiper-dot.a-swiper-dot-active,
	swiper .uni-swiper-dot.uni-swiper-dot-active {
		background-color: #FFFFFF;
	}
	
	::-webkit-scrollbar {
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    color: transparent;
	    background: transparent;  
	}
	
</style>

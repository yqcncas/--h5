<template>
	<view class="richtext">
		<jyf-parser :html="html" ref="article"></jyf-parser>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			jyfParser
		  },
		onLoad(options) {
			console.log(options)
			if (options.content) {
				this.html = options.content
			}
			if (options.title) {
				this.title = options.title
				uni.setNavigationBarTitle({ title: this.title })
			}
			if (options.aboutMy) {
				console.log('123131313')
				this.initAboutMyRichText()
			}
			
		},
		data() {
		    return {
		       html: '',
			   title: ''
		    }
		},
		methods: {
			async initAboutMyRichText () {
				let res = await this.$fetch(this.$api.aboutUs, {}, 'GET', 'FORM')
				console.log(res)
				this.title = res.data.title
				uni.setNavigationBarTitle({ title: this.title })
				this.html = res.data.content
			}
		}
	}
</script>

<style>
</style>

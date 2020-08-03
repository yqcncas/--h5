<template>
	<web-view :src="webUrl"></web-view>	
</template>

<script>
	export default {
		onLoad (options) {
			this.webUrl = options.webUrl
		},
		data () {
			return {
				webUrl: ''
			}
		}
	}
</script>

<style>
</style>

<template>
	<view class="adstyle" v-if="openad==0 && !$u.test.isEmpty(id)">
		<ad :unit-id="id" ad-type="video" ad-theme="white"></ad>
	</view>
</template>

<script>
	export default {
		name: "advideo",
		data() {
			return {
				id: "",
				openad: ""
			}
		},
		mounted(){
			this.id=uni.getStorageSync("videoid")
			this.openad=uni.getStorageSync("openad")
		},

	}
</script>

<style lang="less">
	.adstyle {
		width: 100%;
		border-radius: 15px;
		overflow: hidden;
		background: #fff;
	}
</style>
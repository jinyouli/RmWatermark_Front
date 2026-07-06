<template>
	<view>
		<view class="adstyle" v-if="openad==0&&id!=''">
			<ad :unit-id="id"></ad>
		</view>
	</view>
</template>

<script>
	export default {
		name: "adbanner",
		data() {
			return {
				id: uni.getStorageSync('bannerid'),
				openad: uni.getStorageSync('openad')
			};
		}
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
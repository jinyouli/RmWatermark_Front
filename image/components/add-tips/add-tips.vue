<template>
	<view>
		<view class="uni-add-tips-box u-flex u-row-between u-m-l-30 u-m-r-30 u-m-b-30 u-font-26" v-if="showTip">
			<view class="u-main-color u-flex">
				<text class="u-p-r-10">保护隐私，点</text>
				<image class="tips-icon" src="../../static/miniprogram-more.png"></image>
				<text class="u-p-l-10">添加到小程序</text>
			</view>
			<view class="u-flex u-p-r-10" @tap='hideTip'>
				<image class="close-icon" src="../../static/close.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const SHOW_TIP = "SHOW_TIP"
	export default {
		name:"add-tips",
		data() {
			return {
				showTip: false,
			}
		},
		mounted() {
			this.showTip = !uni.getStorageInfoSync().keys.includes(SHOW_TIP)
		},
		props: {
		},
		methods: {
			hideTip() {
				uni.setStorageSync(SHOW_TIP, true)
				this.showTip = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	$themeColor:#ffffff; //主题色

	.uni-add-tips-box {
		opacity: 0.8;
		animation: opacityC 1s linear infinite;
		border-radius: 12rpx;
		background-color: $themeColor;
		box-shadow: 0 8rpx 8rpx 0 rgba(0,0,0,0.08), 0 2rpx 6rpx 0 rgba(0,0,0,0.02);
		padding: 16rpx 20rpx;
		animation: opacityC 4s linear infinite;
	}
	.tips-icon{
		width: 32rpx;
		height: 32rpx;
	}
	.close-icon{
		width: 16rpx;
		height: 16rpx;
	}

	@keyframes opacityC {
		0% {
			opacity: 0.6;
		}

		33% {
			opacity: 1;
		}
		
		100% {
			opacity: 0.6;
		}
	}
</style>

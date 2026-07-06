<template>
	<view class="content">
		
		<u-gap :height="15" bgColor="#f7f8fa"></u-gap>
		<view class="u-flex-col">
			<add-tips duration="300" />
			<view class="u-p-l-30 u-p-r-30 u-flex u-row-between u-flex-wrap">
				<view @click="tools.goPage('../full-mark/full-mark')"
					class="main-btn-box u-main-bg u-m-r-30 u-p-b-24 u-m-b-30 u-flex-1 u-text-center">
					<image src="/image/static/main-btn-idcard.jpg"></image>
					<view class="u-main-color u-font-28">
						全屏水印
					</view>
					<view class="u-type-info u-font-24">
						全文覆盖，完全保护
					</view>
				</view>

				<view @click="tools.goPage('../invisible-mark/invisible-mark')"
					class="main-btn-box u-main-bg u-p-b-24 u-m-b-30 u-flex-1 u-text-center">
					<image src="/image/static/main-btn-invisible.jpg"></image>
					<view class="u-main-color u-font-28">
						隐形水印
					</view>
					<view class="u-type-info u-font-24">
						肉眼不可见，隐形保护
					</view>
				</view>

				<view @click="tools.goPage('../banner-mark/banner-mark')"
					class="main-btn-box u-main-bg u-m-r-30 u-m-b-30 u-p-b-24 u-flex-1 u-text-center">
					<image src="/image/static/main-btn-banner.jpg"></image>
					<view class="u-main-color u-font-28">
						超级横幅
					</view>
					<view class="u-type-info u-font-24">
						更多用于宣传
					</view>
				</view>

				<view @click="tools.goPage('../nickname-mark/nickname-mark')"
					class="main-btn-box u-main-bg u-p-b-24 u-m-b-30 u-flex-1 u-text-center">
					<image src="/image/static/main-btn-namecard.jpg"></image>
					<view class="u-main-color u-font-28">
						专属水印
					</view>
					<view class="u-type-info u-font-24">
						头像+昵称就能制作水印
					</view>
				</view>

			</view>
			<view class="" style="padding: 15px;">
				<adVideo></adVideo>
			</view>
		</view>
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	import addTips from "../../components/add-tips/add-tips.vue"
	import {
		os
	} from "@/util/os"
	
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()
	export default {
		components:{addTips,
			adVideo},
		data() {
			return {

			}
		},
		onLoad() {
			ad.create()
		},
		
		onShow() {
			os()
			ad.show()
		},
		methods: {

		},
		onShareAppMessage() {
			return {
				title: '隐私水印 - 全屏水印、隐形水印',
				path: '/pages/index/index'
			}
		},
	}
</script>

<style lang="scss">
	.content {
		min-height: 100vh;
		box-sizing: border-box;
	}
	.nav-title {
		.share-icon{
			width: 32rpx;
			height: 32rpx;
		}
		.subTitle {
			opacity: .7;
			display: inline-block;
		}
	}
	.main-btn-box {
		min-width: 40%;
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 8rpx 0 rgba(0, 0, 0, 0.08), 0 2rpx 6rpx 0 rgba(0, 0, 0, 0.02);
		line-height: 1.6;
		background-color: #ffffff;

		image {
			width: 100%;
			height: 140rpx;
		}
	}

	.main-bottom-box {
		border-radius: 24rpx;
	}
</style>

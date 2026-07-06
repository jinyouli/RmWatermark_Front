<template>
	<view class="page">
		<view class="main">
			<view class="title">
				提醒
			</view>
			<view class="txt1">
				您的设备不支持使用当前小程序哦
			</view>
			<u-gap :height="5" bgColor="#fff"></u-gap>
			<view class="txt2">
				如需使用，请用手机微信扫下方小程序码
			</view>
			<u-gap :height="20" bgColor="#fff"></u-gap>
			<u-image src="/static/img/code.jpg" width="150px"  height="150px" radius="15px"></u-image>
			<u-gap :height="20" bgColor="#fff"></u-gap>
			<u--text type="info" align="center" size="14px" bold text="抱歉！给您带来不便."></u--text>
			<u-gap :height="5" bgColor="#fff"></u-gap>
			<u--text type="info" openType="contact"  bold size="14px" text="若有疑问,可点我联系在线客服"></u--text>
			<u-gap :height="5" bgColor="#fff"></u-gap>
			<u--text type="info" openType="contact"  size="14px" bold :text="'当前设备:'+platform"></u--text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform:""
			}
		},
		onLoad() {
			uni.hideHomeButton()
			this.platform=uni.getStorageSync('platform')
		},
		methods: {

		}
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
	}

	.page {
		background: #f7f8fa;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		display: grid;
		place-items: center;
	}
	.main{
		background: #fff;
		border-radius: 15px;
		padding: 20px;
		box-sizing: border-box;
		width: 85%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		.title{
			font-size: 18px;
			font-weight: bold;
			color: #333;
			padding-bottom: 20px;
		}
		.txt1{
			color: #FF5733;
			font-size: 14px;
			font-weight: bold;
		}
		.txt2{
			color: #444;
			font-size: 14px;
			font-weight: bold;
		}
		
	}
</style>
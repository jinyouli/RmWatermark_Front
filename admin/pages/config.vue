<template>
	<view class="page">
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="是否允许PC访问(0开启/1关闭)"></u--text>
		<u-input placeholder="输入0或1" v-model="config.ispc"></u-input>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="是否开启广告(0开启/1关闭)"></u--text>
		<u-input placeholder="输入0或1" v-model="config.openad"></u-input>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="视频广告ID"></u--text>
		<u-input placeholder="输入频广告ID" v-model="config.videoid"></u-input>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="Banner广告ID"></u--text>
		<u-input placeholder="输入Banner广告ID" v-model="config.bannerid"></u-input>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="插屏广告ID"></u--text>
		<u-input placeholder="输入插屏广告ID" v-model="config.chapinid"></u-input>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="激励广告ID"></u--text>
		<u-input placeholder="输入激励广告ID" v-model="config.jiliid"></u-input>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<u--text type="info"   text="公告"></u--text>
		<u--textarea v-model="config.notice" height="80" :showConfirmBar="false" placeholder="输入公告"></u--textarea>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<u-button type="warning" @click="adminSaveConfig()">保存</u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		adminSaveConfig,
		getConfig
	} from '@/common/api'
	export default {
		data() {
			return {
				config:""
			}
		},
		onShareAppMessage(res) {
			return {
				title: '免费、多平台去水印、拿文案',
				path: '/pages/index?ptoken=' + uni.getStorageSync('token'),
				imageUrl: '/static/img/share.png'
			}
		},
		onPullDownRefresh() {
			this.config = ""
			this.getConfig()
		},
		mounted() {
			this.getConfig()
		},
		methods: {
			
			adminSaveConfig() {
				
				let that = this
				uni.showLoading({
					mask: true,
					title: "操作中..."
				})
				adminSaveConfig({
					atoken: uni.getStorageSync("atoken"),
					data: this.config
				}).then(res => {
					if (res.code == 0) {
						that.$refs.uToast.show({
							type: "success",
							message: res.msg,
							duration: 2000
						})
						that.jifenshow = false
						uni.startPullDownRefresh()
						that.getConfig()
					} else {
						that.$refs.uToast.show({
							type: "warning",
							message: res.msg,
							duration: 2000
						})
					}
					uni.hideLoading()
				})
			},
			getConfig() {
				
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				getConfig().then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.config=res.data
					}
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		width: 100%;
	}

	.page {
		background: #f7f8fa;
		width: 100%;
		min-height: 100%;
		padding: 0 15px;
		box-sizing: border-box;
	}

</style>
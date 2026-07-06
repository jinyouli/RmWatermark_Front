<script>
	import Vue from 'vue'
	import {
		XcxFun
	} from './common/xcxfun'
	// 引入配置
	import config from '@/common/config'
	let xcx = new XcxFun()
	export default {
		onLaunch() {
//wx98a874dd58b3a95d
//wx9c7ff2585339ef96  客户
		},
		onShow() {
			this.getConfig()
			uni.getSystemInfo({
				success: function(res) {
					console.log("系统信息", res)
					uni.setStorageSync("platform", res.platform)

				}
			});
			this.updateMPWX()
			console.log("验证登录")
			xcx.verify_login()

		},
		onHide() {

		},
		methods: {
			//获取配置信息
			getConfig() {
				let that=this
				uni.request({
					url: config.baseUrl + "getConfig",
					method: 'GET',
					success(res) {
						console.log("配置信息", res)
						let data = res.data.data
						uni.setStorageSync("bannerid", data.bannerid)
						uni.setStorageSync("chapinid", data.chapinid)
						uni.setStorageSync("jiliid", data.jiliid)
						uni.setStorageSync("videoid", data.videoid)
						uni.setStorageSync("ispc", data.ispc)
						uni.setStorageSync("openad", data.openad)
						uni.setStorageSync("notice", data.notice)
					},
					fail(err) {

					}
				})
			},
			//更新提示
			updateMPWX() {
				const updateManager = uni.getUpdateManager();

				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log(res.hasUpdate);
				});

				updateManager.onUpdateReady(function(res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});

				});

				updateManager.onUpdateFailed(function(res) {
					// 新的版本下载失败
					uni.showModal({
						title: '下载提示',
						content: '新版本下载失败，请重启应用？',
						success(res) {
							if (res.confirm) {
								updateManager.applyUpdate();
							}
						}
					});
				});
			},
		}
	}
</script>

<style lang="scss">
	:not(not) {
		box-sizing: border-box
	}

	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "image/utils/common.scss" ;
	@import "common/demo.scss";
</style>
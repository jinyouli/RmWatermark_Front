<template>
	<view class="page">
		<view class="contcopy">
			<view class="ttitle">
				<text>文案/标题</text>
				<view class="cbtn" @click="copyText(info.desc)">
					复制
				</view>
			</view>
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<u--text :lines="2" type="info" size="13px" :text="info.desc"></u--text>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<adVideo aid="adunit-9e18ed5bebc475cd"></adVideo>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="uvideo">
			<view class="imgvid">
				<view class="item">
					<video muted :controls="true" show-mute-btn :src="info.video" class="videoBox"
						:poster="info.cover"></video>
				</view>
			</view>

			<view class="btn">
				<view class="zhantie" @click="copyText(info.video)">
					复制视频链接
				</view>
				<view class="qushuiyin" @click="Video()">
					保存视频
				</view>
			</view>
			<view class="btn">
				<view class="zhantie" @click="copyText(info.cover)">
					复制封面链接
				</view>
				<view class="qushuiyin" @click="image()">
					保存封面
				</view>
			</view>
		</view>

		<u--text @click="$u.route('view/pages/help')" type="warning" align="center" size="13"
			text="以上内容有效期较短,尽快保存,请知悉!"></u--text>
		<u--text @click="$u.route('view/pages/help')" type="warning" align="center" size="13"
			text="保存失败？点我查看常见问题"></u--text>

		<u-gap height="20" bgColor="#f7f8fa"></u-gap>


	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue';
	import {
		os
	} from "@/util/os"
	import {
		remberUlr
	} from '@/common/api';
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()
	export default {
		components: {
			adVideo
		},
		data() {
			return {
				info: {
					desc: "",
					video: "",
					cover: ""
				}
			};
		},
		onLoad(opt) {
			ad.create("adunit-3632a2224c116b2b")
			console.log("接受", uni.getStorageSync("jiexi"))
			this.info = uni.getStorageSync("jiexi")
		},
		onShow() {
			os()
			ad.show()
		},
		methods: {
			//复制内容
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					},
					fail() {
						uni.showToast({
							icon: "error",
							title: '复制失败了'
						});
					}
				});
			},
			//保存视频到相册
			Video() {
				uni.showLoading({
					mask: true,
					title: '下载中...'
				})
				let that = this
				// 1 将远程文件下载到小程序的内存中
	
				const downloadTask = uni.downloadFile({
					url: this.info.video.replace('http://', 'https://'),
					success: (res) => {

						uni.hideLoading()
						// 2 成功下载后而且状态码为200时将视频保存到本地系统
						if (res.statusCode === 200) {
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success() {
									uni.showToast({
										title: "下载成功",
										icon: "success",
										duration: 2000
									});
								},
								fail(err) {

									if (err.errMsg === "saveVideoToPhotosAlbum:fail:auth denied" || err
										.errMsg === "saveVideoToPhotosAlbum:fail auth deny" || err
										.errMsg === "saveVideoToPhotosAlbum:fail authorize no response"
									) {
										// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
										uni.showModal({
											title: '提示',
											content: '需要您授权保存相册',
											showCancel: false,
											success: modalSuccess => {
												uni.openSetting({
													success(settingdata) {
														console.log("settingdata",
															settingdata)
														if (settingdata
															.authSetting[
																'scope.writePhotosAlbum'
															]) {
															uni.showModal({
																title: '提示',
																content: '获取权限成功,再次操作即可保存到相册',
																showCancel: false,
															})
														} else {
															uni.showModal({
																title: '提示',
																content: '获取权限失败，将无法保存到相册哦~',
																showCancel: false,
															})
														}
													},
													fail(failData) {
														console.log("failData",
															failData)
													},
													complete(finishData) {
														console.log("finishData",
															finishData)
													}
												})
											}
										})
									} else {
										uni.hideLoading();
										uni.showToast({
											title: "失败！" + (err.errMsg || JSON.stringify(err)),
											icon: "error",
											duration: 2000
										});
									}
								}

							})
						} else {
							uni.showToast({
								title: "资源格式错误，请联系管理员",
								icon: "error",
								duration: 4000
							});
						}

					},
					fail: (err) => {
						// 下载失败提醒
						if (err.errMsg.includes("fail url not in domain list")) {
							const encodedUrl = encodeURIComponent(that.info.video);
							remberUlr({
								url: that.info.video
							}).then(r => {
								uni.hideLoading();
								if (r.code == 0) {
									uni.showToast({
										title: "正在使用服务器中转下载",
										icon: "none",
									});

									that.zVideo(r.data + encodedUrl)
								} else {
									uni.showToast({
										title: "中转下载失败！",
										icon: "error",
										duration: 2000
									});
								}
							})
							// uni.showModal({
							// 	title: '提示',
							// 	content: '视频域名不合法或未备案,请复制解析后的链接到浏览器打开下载，同时将链接反馈给客服',
							// 	showCancel: false,
							// })
						} else {
							uni.hideLoading();
							uni.showToast({
								title: "失败！" + (err.errMsg || JSON.stringify(err)),
								icon: "error",
								duration: 2000
							});
						}

					}
				})
				downloadTask.onProgressUpdate(res => {
					that.onProgress(res.progress)
				});
			},
			//使用服务器中转保存视频到相册
			zVideo(url) {
				uni.showLoading({
					mask: true,
					title: '中转下载中...'
				})
				let that = this
				// 1 将远程文件下载到小程序的内存中
				const downloadTask = uni.downloadFile({
					url: url,
					success: (res) => {

						uni.hideLoading()
						// 2 成功下载后而且状态码为200时将视频保存到本地系统
						if (res.statusCode === 200) {
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success() {
									uni.showToast({
										title: "下载成功",
										icon: "success",
										duration: 2000
									});
								},
								fail(err) {

									if (err.errMsg === "saveVideoToPhotosAlbum:fail:auth denied" || err
										.errMsg === "saveVideoToPhotosAlbum:fail auth deny" || err
										.errMsg === "saveVideoToPhotosAlbum:fail authorize no response"
									) {
										// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
										uni.showModal({
											title: '提示',
											content: '需要您授权保存相册',
											showCancel: false,
											success: modalSuccess => {
												uni.openSetting({
													success(settingdata) {
														console.log("settingdata",
															settingdata)
														if (settingdata
															.authSetting[
																'scope.writePhotosAlbum'
															]) {
															uni.showModal({
																title: '提示',
																content: '获取权限成功,再次操作即可保存到相册',
																showCancel: false,
															})
														} else {
															uni.showModal({
																title: '提示',
																content: '获取权限失败，将无法保存到相册哦~',
																showCancel: false,
															})
														}
													},
													fail(failData) {
														console.log("failData",
															failData)
													},
													complete(finishData) {
														console.log("finishData",
															finishData)
													}
												})
											}
										})
									} else {
										uni.showToast({
											title: "失败！" + (err.errMsg || JSON.stringify(err)),
											icon: "error",
											duration: 2000
										});
									}
								}

							})
						} else {
							uni.showToast({
								title: "资源格式错误，请联系管理员",
								icon: "error",
								duration: 4000
							});
						}

					},
					fail: (err) => {
						// 下载失败提醒
						uni.hideLoading();
						uni.showToast({
							title: "中转失败" + (err.errMsg || JSON.stringify(err)),
							icon: "error",
							duration: 2000
						});

					}
				})
				downloadTask.onProgressUpdate(res => {
					that.onProgress(res.progress)
				});
			},
			//保存图片到相册
			image() {
				uni.showLoading({
					mask: true,
					title: '下载中...'
				})
				let that = this
		
				uni.downloadFile({
					url: this.info.cover, //图片地址
					success: (res) => {
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.hideLoading()
								uni.showToast({
									title: "已保存到相册",
									icon: "success",
									duration: 3000
								})
							},
							fail: function(err) {
								uni.hideLoading();
								if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err
									.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err
									.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
								) {
									// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
									uni.showModal({
										title: '提示',
										content: '需要您授权保存相册',
										showCancel: false,
										success: modalSuccess => {
											uni.openSetting({
												success(settingdata) {
													console.log("settingdata",
														settingdata)
													if (settingdata
														.authSetting[
															'scope.writePhotosAlbum'
														]) {
														uni.showModal({
															title: '提示',
															content: '获取权限成功,再次操作即可保存到相册',
															showCancel: false,
														})
													} else {
														uni.showModal({
															title: '提示',
															content: '获取权限失败，将无法保存到相册哦~',
															showCancel: false,
														})
													}
												},
												fail(failData) {
													console.log("failData",
														failData)
												},
												complete(finishData) {
													console.log("finishData",
														finishData)
												}
											})
										}
									})
								} else {
									uni.showToast({
										title: "失败！" + (err.errMsg || JSON.stringify(err)),
										icon: "error",
										duration: 2000
									});
								}
							}
						})
					},
					fail: (err) => {

						// 下载失败提醒
						uni.hideLoading();

						if (err.errMsg.includes("fail url not in domain list")) {
							const encodedUrl = encodeURIComponent(that.info.cover);
							remberUlr({
								url: that.info.cover
							}).then(r => {
								if (r.code == 0) {
									uni.showToast({
										title: "正在使用服务器中转下载",
										icon: "none",
									});
									that.zimage(r.data + encodedUrl)
								} else {
									uni.showToast({
										title: "中转下载失败！",
										icon: "error",
										duration: 2000
									});
								}
							})
							// uni.showModal({
							// 	title: '提示',
							// 	content: '域名不合法或未备案,请复制解析后的链接到浏览器打开下载，同时将链接反馈给客服',
							// 	showCancel: false,
							// })
						} else {
							uni.showToast({
								title: "中转失败！" + (err.errMsg || JSON.stringify(err)),
								icon: "error",
								duration: 2000
							});
						}

					}
				})
			},
			//中转保存图片到相册
			zimage(url) {
				uni.showLoading({
					mask: true,
					title: '中转下载中...'
				})
				uni.downloadFile({
					url: url, //图片地址
					success: (res) => {
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.hideLoading()
								uni.showToast({
									title: "已保存到相册",
									icon: "success",
									duration: 3000
								})
							},
							fail: function(err) {
								uni.hideLoading();
								if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err
									.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err
									.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
								) {
									// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
									uni.showModal({
										title: '提示',
										content: '需要您授权保存相册',
										showCancel: false,
										success: modalSuccess => {
											uni.openSetting({
												success(settingdata) {
													console.log("settingdata",
														settingdata)
													if (settingdata
														.authSetting[
															'scope.writePhotosAlbum'
														]) {
														uni.showModal({
															title: '提示',
															content: '获取权限成功,再次操作即可保存到相册',
															showCancel: false,
														})
													} else {
														uni.showModal({
															title: '提示',
															content: '获取权限失败，将无法保存到相册哦~',
															showCancel: false,
														})
													}
												},
												fail(failData) {
													console.log("failData",
														failData)
												},
												complete(finishData) {
													console.log("finishData",
														finishData)
												}
											})
										}
									})
								} else {
									uni.hideLoading();
									uni.showToast({
										title: "下载失败err :" + (err.errMsg || JSON.stringify(err)),
										icon: "error",
										duration: 2000
									});
								}

							}
						})
					},
					fail: (err) => {
						// 下载失败提醒
						uni.hideLoading();
						uni.showToast({
							title: "中转下载失败：" + (err.errMsg || JSON.stringify(err)),
							icon: "error",
							duration: 2000
						});

					}
				})
			},

			// 提示下载进度
			onProgress(res) {
				uni.showLoading({
					mask: true,
					title: res ? '下载中' + res + "%" : '下载中...'
				})
			}

		}
	};
</script>
<style lang="less">
	page {
		height: 100%;
		width: 100%;
	}

	.uvideo {
		width: 100%;

		.imgvid {
			display: flex;
			width: 100%;

			.item {
				flex: 1;

				.videoBox {
					width: 100%;
					height: 180px;
					border-radius: 15px;
					overflow: hidden;
				}
			}

		}

	}

	.page {
		background: #f7f8fa;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		padding: 15px;
	}

	.contcopy {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		background: #fff;
		border-radius: 15px;

		.ttitle {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 15px;
			font-weight: bold;
			color: #FF5733;

			.cbtn {
				width: 50px;
				height: 20px;
				border-radius: 5px;
				border: 1px solid #d7d8dd;
				cursor: pointer;
				text-align: center;
				line-height: 20px;
				color: #555;
				font-size: 12px;
				font-weight: 500;
			}
		}
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
		font-weight: bold;
		font-size: 14px;

		.zhantie,
		.qushuiyin {
			flex: 1;
			margin-right: 5px;
			border-radius: 10px;
			height: 45px;
			color: #333;
			background: #fff;
			text-align: center;
			line-height: 45px;
			border: 1px solid #d7d8dd;
			cursor: pointer;
		}

		.qushuiyin {
			margin-left: 5px;
			margin-right: 0px;
			background: #FF5733;
			color: #fff;
			border: none;
		}
	}
</style>
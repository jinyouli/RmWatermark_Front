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
		<u-sticky offset-top="0" zIndex="99999">
			<view class="xiding">
				<view class="btn">
					<view class="qushuiyin" @click="download()">
						保存所有图片
					</view>
				</view>
				<u--text @click="$u.route('view/pages/help')" type="warning" align="center" size="13"
					text="以下内容有效期较短,尽快保存,请知悉!"></u--text>
				<u--text @click="$u.route('view/pages/help')" type="warning" align="center" size="13"
					text="保存失败？点我查看常见问题"></u--text>
			</view>
		</u-sticky>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<adVideo aid="adunit-e163c6f7395e297a"></adVideo>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="imgs">
			<view class="img" v-for="(item,i) in info.imgs" :key="i">
				<u-image radius="10px" :src="item" width="100%" height="auto" @click="previewImage(i)"
					mode="widthFix"></u-image>
				<view class="imgbtn">
					<view class="ibtn icopybtn" @click="copyText(item)">
						复制
					</view>
					<view class="ibtn" @click="downone(item)">
						保存
					</view>

				</view>
			</view>

		</view>



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
					imgs: "",
					cover: ""
				},
				image: 1
			};
		},
		onLoad(opt) {
			console.log("接受", opt)
			ad.create("adunit-004f785ae0f5bc48")
			this.info = uni.getStorageSync("jiexi")
		},
		onShow() {
			os()
			ad.show()
		},
		watch: {
			image(newVal, oldVal) {
				if (newVal - 1 < this.info.imgs.length) {
					this.download()
				} else {
					uni.hideLoading()
					uni.showToast({
						title: "已全部保存",
						icon: "success",
						duration: 2000
					})
				}
			}

		},
		methods: {
			//预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.info.imgs, // 图片列表
					current: index, // 当前显示图片的索引
					indicator: 'default' // 图片指示器样式，默认为圆点
				})
			},
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
			//下载单张
			downone(url) {
				uni.showLoading({
					mask: true,
					title: "下载中..."
				})
				let that=this
				uni.downloadFile({
					url: url, //图片地址
					success: (res) => {
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.hideLoading()
								uni.showToast({
									icon: "success",
									title: '保存成功'
								});
							},
							fail: function(err) {
								uni.hideLoading()
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
								}
							}
						})
					},
					fail(err) {
						console.log("准备中转下载")
						// 下载失败提醒
						if (err.errMsg.includes("fail url not in domain list")) {
							remberUlr({
								url: url
							}).then(r => {
								uni.hideLoading();
								if (r.code == 0) {
									uni.showToast({
										title: "正在使用服务器中转下载",
										icon: "none",
									});
									that.zdownone(r.data + url)
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
							// 	content: '图片域名不合法或未备案,请复制解析后的链接到浏览器打开下载，同时将链接反馈给客服',
							// 	showCancel: false,
							// })
						} else {
							uni.hideLoading();
							uni.showToast({
								title: "下载失败！",
								icon: "error",
								duration: 2000
							});
						}
					}

				})
			},
			//中转下载
			zdownone(url) {
				console.log("开始中转下载")
				uni.showLoading({
					mask: true,
					title: "中转下载中..."
				})
				let that=this
				uni.downloadFile({
					url: url, //图片地址
					success: (res) => {
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.hideLoading()
								uni.showToast({
									icon: "success",
									title: '保存成功'
								});
							},
							fail: function(err) {
								uni.hideLoading()
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
								}
							}
						})
					},
					fail(err) {
						// 下载失败提醒
						uni.hideLoading();
						uni.showToast({
							title: "中转下载失败！",
							icon: "error",
							duration: 2000
						});
					}

				})
			},
			//图片下载
			download() {
				uni.showLoading({
					mask: true,
					title: "下载第" + this.image + "/" + this.info.imgs.length + "张"
				})
				let that = this
				uni.downloadFile({
					url: this.info.imgs[this.image - 1], //图片地址
					success: (res) => {
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.image = this.image + 1
							},
							fail: function(err) {
								uni.hideLoading()
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
								}
							}
						})
					},
					fail(err) {
						// 下载失败提醒
						console.log("准备中转下载")
						if (err.errMsg.includes("fail url not in domain list")) {
							remberUlr({
								url: that.info.imgs[that.image - 1]
							}).then(r => {
								uni.hideLoading();
								if (r.code == 0) {
									uni.showToast({
										title: "正在使用服务器中转下载",
										icon: "none",
									});
									that.zdownload(r.data + that.info.imgs[that.image - 1])
								} else {
									uni.showToast({
										title: "下载失败！",
										icon: "error",
										duration: 2000
									});
								}
							})
						} else {
							uni.hideLoading();
							uni.showToast({
								title: "下载失败！",
								icon: "error",
								duration: 2000
							});
						}
					}
				})
			},
			//中转下载
			zdownload(url) {
				console.log("开始中转下载")
				let that = this
				uni.downloadFile({
					url: url, //图片地址
					success: (res) => {
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.image = this.image + 1
							},
							fail: function(err) {
								uni.hideLoading()
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
								}
							}
						})
					},
					fail(err) {
						// 下载失败提醒
						uni.hideLoading();
						uni.showToast({
							title: "中转下载失败！",
							icon: "error",
							duration: 2000
						});
					}
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

	.imgs {
		width: 100%;
		background: #fff;
		border-radius: 15px;
		padding: 15px;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* 定义了三个相等宽度的列 */
		grid-gap: 15px;
		/* 设置行间距和列间距为20px */

		// align-items: center;
		// justify-content: center;
		// flex-wrap: wrap;
		.img {
			flex: 1;

			.imgbtn {
				width: 100%;
				padding-top: 5px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.ibtn {
					width: 45%;
					height: 20px;
					border-radius: 5px;
					color: #fff;
					font-size: 10px;
					background: #FF5733;
					display: grid;
					place-items: center;
				}

				.icopybtn {
					background: #e3e4e5 !important;
					color: #909399 !important;
				}
			}
		}
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
		}
	}

	.cbtn {
		width: 50px;
		min-width: 50px;
		height: 20px;
		border-radius: 5px;
		border: 1px solid #d7d8dd;
		cursor: pointer;
		text-align: center;
		line-height: 20px;
		color: #555;
		font-size: 12px;
		font-weight: 500;
		white-space: nowrap;

	}

	.xiding {
		width: 100%;
		background: #fff;
		padding: 15px;
		border-radius: 15px;
		box-sizing: border-box;
		// background: linear-gradient(#ffffff, rgba(255, 255, 255, 0.8));
		// backdrop-filter: saturate(5) blur(20px);

	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		font-weight: bold;
		font-size: 14px;

		.qushuiyin {
			flex: 1;
			border-radius: 10px;
			height: 45px;
			background: #FF5733;
			color: #fff;
			text-align: center;
			line-height: 45px;
			cursor: pointer;
		}
	}
</style>
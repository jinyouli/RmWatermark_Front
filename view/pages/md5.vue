<template>
	<view class="page">
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="mdcont">
			<view class="selectv">
				<view class="selectbtn" v-if="xiugaistate == 1" @click="addVideo()">
					<u-icon size="35" color="#fff" name="plus-circle-fill"></u-icon>
					<u-gap height="10" bgColor="#FF5733"></u-gap>
					<text>添加需要修改MD5的视频</text>
				</view>
				<view class="selectvideo" v-if="xiugaistate == 2">
					<video :src="urldata" muted :controls="true" show-mute-btn v-if="xiugaistate == 2"
						style="width: 100%;height: 150px;"></video>
				</view>
			</view>
			<u-gap height="20" bgColor="#f7f8fa"></u-gap>
			<view class="qiandao" v-if="xiugaistate==2">
				<text class="title">
					视频信息
				</text>
				<u-gap height="15" bgColor="#ffffff"></u-gap>
				<view class="iitem">
					<text>视频时间</text>
					<text>{{durationtime}}</text>
				</view>
				<view class="iitem">
					<text>视频大小</text>
					<text>{{videosize}}</text>
				</view>
				<view class="iitem">
					<text>修改前MD5</text>
					<text>{{oldmd5}}</text>
				</view>
				<view class="iitem">
					<text>修改后MD5</text>
					<text>{{newmd5}}</text>
				</view>

			</view>
			<view class="btn" v-if="xiugaistate==2">
				<view class="zhantie" @click="resetvideo()">
					清空内容
				</view>
				<view class="qushuiyin" @click="savevideo()">
					保存视频
				</view>
			</view>
		</view>
		<adVideo aid="adunit-fccb76290233d356"></adVideo>
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	import {
		os
	} from "@/util/os"
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()
	
	export default {
		components:{
			adVideo
		},
		data() {
			return {
				xiugaistate: 1,
				urldata: '',
				oldmd5: "",
				newmd5: "",
				durationtime: "",
				videosize: "",
			}
		},
		onLoad() {
			ad.create("adunit-3be8cf81effeda71")
		},
		onShow() {
			os()
			ad.show()
		},
		mounted() {},
		methods: {
			duration(r) {
				var t = 0,
					e = 0;
				(r = Math.ceil(r)) > 60 && (t = parseInt(r / 60), r = parseInt(r % 60), t > 60 && (e = parseInt(t / 60),
					t = parseInt(t % 60)));
				var n = "";
				return n += parseInt(r) + "秒", 0 != t && (n = parseInt(t) + "分" + n), e > 0 && (n = parseInt(e) + "小时" +
						n),
					n;
			},
			kb(r) {
				if (r / 1024 >= 1024) return (t = (r - r % 1024) / 1024 / 1024).toFixed(2) + "M";
				var t = (r - r % 1024) / 1024;
				return t.toFixed(2) + "KB";
			},
			// 添加视频
			addVideo() {
				// #ifndef MP-WEIXIN
				return;
				// #endif
				var t = this;
				uni.chooseVideo({
					sourceType: ["album"],
					success: function(res) {
						var n = t.duration(res.duration),
							s = t.kb(res.size),
							o = uni.getFileSystemManager();
						uni.getFileInfo({
								filePath: res.tempFilePath,
								success: function(e) {
									t.oldmd5 = e.digest
									t.durationtime = n
									t.videosize = s
								}
							}),
							o.saveFile({
								tempFilePath: res.tempFilePath,
								filePath: wx.env.USER_DATA_PATH + "/test.mp4",
								success: function(e) {
									console.log(e);
									o.appendFile({
										filePath: wx.env.USER_DATA_PATH + "/test.mp4",
										data: "01",
										success: function(e) {
											uni.getFileInfo({
												filePath: wx.env.USER_DATA_PATH +
													"/test.mp4",
												success: function(e) {
													if (e.errMsg ==
														"getFileInfo:ok") {
														t.newmd5 = e.digest
														t.urldata = wx.env
															.USER_DATA_PATH +
															"/test.mp4"
														t.xiugaistate = 2
													}

												}
											});
										}
									});
								}
							});
					}
				});
			},
			// 清空视频
			resetvideo() {
				// #ifndef MP-WEIXIN
				return;
				// #endif
				var e = this;
				uni.getFileSystemManager().unlink({
					filePath: wx.env.USER_DATA_PATH + "/test.mp4",
					success: function(t) {
						if ("unlink:ok" == t.errMsg) {
							e.xiugaistate = 1
						}

					}
				});
			},
			// 保存视频
			savevideo() {
				// #ifndef MP-WEIXIN
				return;
				// #endif
				var e = this,
					t = wx.getFileSystemManager();
				wx.saveVideoToPhotosAlbum({
					filePath: wx.env.USER_DATA_PATH + "/test.mp4",
					success: function(i) {
						"saveVideoToPhotosAlbum:ok" == i.errMsg && t.unlink({
							filePath: wx.env.USER_DATA_PATH + "/test.mp4",
							success: function(t) {
								if ("unlink:ok" == t.errMsg) {
									e.xiugaistate = 1
									uni.showToast({
										icon: 'none',
										title: '视频保存成功，请到手机相册中查看'
									})
								}
							}
						});
					},
					fail: function(t) {
						if ("saveVideoToPhotosAlbum:fail auth deny" == t.errMsg) {
							wx.showModal({
								title: "保存失败",
								content: "你需要设置授权保存到相册",
								cancelText: "不设置",
								confirmText: "去设置",
								success: function(e) {
									e.confirm ? wx.openSetting({
										success: function(e) {}
									}) : e.cancel;
								}
							})
						}

						if ("saveVideoToPhotosAlbum:fail invalid video" == t.errMsg) {
							uni.showToast({
								icon: 'none',
								title: '视频保存失败，联系客服修复'
							})
						}

					}
				});
			},

		}
	}
</script>

<style lang="less">
	.qiandao {
		width: 100%;
		background: #fff;
		border-radius: 15px;
		padding: 15px;
		box-sizing: border-box;

		.title {
			font-size: 17px;
			font-weight: bold;
			color: #444;
		}

		.iitem {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #97989c;
			font-size: 12px;
			font-weight: 500;
			margin: 5px 0;
		}
	}

	.mdcont {
		width: 100%;

		.selectv {
			width: 100%;
			min-height: 120px;
			border-radius: 15px;

			.selectbtn {
				width: 100%;
				min-height: 120px;
				background: #FF5733;
				border-radius: 15px;
				display: flex;
				flex-flow: column;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 18px;
				font-weight: bold;
			}

			.selectvideo {
				width: 100%;
				height: 150px;
				border-radius: 15px;
				overflow: hidden;
			}
		}
	}

	page {
		height: 100%;
		width: 100%;
	}

	.page {
		background: #f7f8fa;
		padding: 0 15px;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
	}

	.tabar {
		width: 100%;
		background: linear-gradient(to top, #FF5733, #ff8447);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.navbar {
			display: flex;
			align-items: center;
			padding-left: 10px;
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
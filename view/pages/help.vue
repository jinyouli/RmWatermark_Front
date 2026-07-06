<template>
	<view class="page">
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="help">
			<view class="title">常见问题</view>
			<u-collapse :border="false" accordion>
				<u-collapse-item :border="false" v-for="(item,i) in problemBox" :key="i" :title="item.problemTitle"
					name="Docs guide">
					<text v-for="(t,b) in item.problemList" :key="b" class="u-collapse-content cont">{{t.title}}</text>
				</u-collapse-item>
			</u-collapse>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<adVideo aid="adunit-de0cad0f327f8fa6"></adVideo>
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue';
	import {
		chaPing
	} from '@/common/ad'
	import {
		os
	} from "@/util/os"
	let ad = new chaPing()

	export default {
		components: {
			adVideo
		},
		data() {
			return {
				problemBox: [{
						problemTitle: '1、无法下载视频？',
						problemList: [{
								title: '请先授权保存到手机相册的权限。',
							}, {
								title: '由于手机系统及微信的安全机制，视频大小不能超过10M左右，所以超过这个大小的视频，需要解析成功后，复制无水印链接到浏览器下载'
							}

						]
					},
					{
						problemTitle: '2、为什么下载视频那么慢？',
						problemList: [{
								title: '有些视频比较长，或者多人同时下载，会导致下载速度缓慢，可以点击旁边的【复制链接】按钮到手机浏览器上打开即可使用手机上的网速下载',
							}

						]
					},
					{
						problemTitle: '3、提示域名不合法等无法下载视频？',
						problemList: [{
								title: '可以在解析成功后点击下载按钮旁边的【复制链接】按钮，粘贴到手机浏览器打开即可下载',
							}

						]
					}, {
						problemTitle: '4、为什么视频成功解析了还有水印？',
						problemList: [{
							title: '视频自带的无法去除哦，如果这个视频在该平台APP直接播放是没有水印的，解析后却有水印请联系管理员',
						}]
					}
				]
			}
		},
		onLoad() {
			ad.create("adunit-c5f2e1cd92553b8d")
		},
		onShow() {
			os()
			ad.show()
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.cont {
		padding: 5px 0;
		color: #97989c;
	}

	.help {
		width: 100%;
		border-radius: 15px;
		padding: 15px 0;
		box-sizing: border-box;
		background: #fff;

		.title {
			font-size: 20px;
			font-weight: bold;
			color: #FF5733;
			padding: 0 15px 10px;
			box-sizing: border-box;
		}
	}

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
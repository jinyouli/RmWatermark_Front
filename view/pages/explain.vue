<template>
	<view class="page">
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				使用教程
			</text>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<text class="title2">第一步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">打开短视频平台，找到需要去水印的视频，点击【转发】图标，如下图</view>
					<u--image src="/static/img/help/1.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第二步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">点击【复制链接】按钮，如下图</view>
					<u--image src="/static/img/help/2.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第三步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">打开Fine解析小助手小程序，在输入框输入链接或点击【粘贴内容】按钮，然后点击【免费去水印】按钮，如下图</view>
					<u--image src="/static/img/help/3.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第四步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">点击【保存视频】按钮，到这一步后，无水印的视频就保存到你的手机相册里拉，如下图</view>
					<u--image src="/static/img/help/4.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>

		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<adBanner></adBanner>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				注意事项
			</text>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="cont">
				<view class="sitem">
					由于手机系统以及微信安全机制，视频大小不能超过50M,所以超过这个大小的视频，需要解析成功后，复制无水印视频链接到浏览器下载
				</view>
				<view class="sitem">
					如果你是安卓手机，直接复制无水印链接到任意浏览器打开即可下载视频
				</view>
				<view class="sitem" style="color: #FF5733;font-weight: bold;">
					如果你是苹果手机，需要下载documents by readdle才能在浏览器中进行下载视频(请看下方教程)
				</view>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				你是苹果用户？
			</text>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<text class="title2">第一步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">打开苹果应用商店搜索documents by readdle（免费的），如下图</view>
					<u--image src="/static/img/help/5.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第二步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">如果弹出收费的试用提醒，直接点击左上角的【x】关闭按钮</view>
					<u--image src="/static/img/help/6.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第三步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">点击底部菜单的【浏览器】菜单，如下图</view>
					<u--image src="/static/img/help/7.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第四步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">点击复制解析后的无水印视频链接，如下图</view>
					<u--image src="/static/img/help/8.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第五步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">把链接粘贴到浏览器的搜索框里点击搜索，如下图</view>
					<u--image src="/static/img/help/9.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
			<text class="title2">第六步</text>
			<view class="cont">
				<view class="sitem">
					<view class="stxt">搜索后会跳转保存页面，点击【完成】即可，如下图</view>
					<u--image src="/static/img/help/10.png" height="auto" radius="15" mode="widthFix"></u--image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import adBanner from '@/components/adbanner.vue'
	import {
		os
	} from "@/util/os"
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()
	export default {
		components:{
			adBanner
		},
		data() {
			return {

			}
		},
		onLoad() {
			ad.create("adunit-362c813cd8374dc7")
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
	.qiandao {
		width: 100%;
		background: #fff;
		border-radius: 15px;
		padding: 15px;
		box-sizing: border-box;

		.title {
			font-size: 17px;
			font-weight: bold;
			color: #FF5733;
		}

		.title2 {
			font-size: 14px;
			font-weight: bold;
			color: #444;
		}

		.cont {
			font-size: 13px;
			color: #97989c;
			letter-spacing: 0.75px;

			.sitem {
				padding-bottom: 10px;
				box-sizing: border-box;

				.stxt {
					padding: 10px 0;
				}
			}
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
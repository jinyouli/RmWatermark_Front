<template>
	<!-- 
	作者：技术宅妞、哆哆、希速云
	QQ：522605223 
	-->
	<view class="page">
		<TabarTop img="/static/img/logotxt.png"></TabarTop>
		<view class="guide-main" v-if="adtips">
		    <view class="text"> 点击添加到我的小程序，下次访问更便捷 </view>
		    <view class="close">
				<u-icon color="#fff" name="close-circle-fill" @click="adtips=false"></u-icon>
		        <!-- <uni-icons bind:__l="__l" uI="547341d0-1" uP="{{c}}" wx:if="{{c}}"></uni-icons> -->
		    </view>
		</view>
		<u--image src="/static/img/banner.png" @click="toPage('qsy')" width="100%" height="auto" radius="15"
			mode="widthFix"></u--image>
		<u-gap :height="15" v-if="!$u.test.isEmpty(notice)" bgColor="#f7f8fa"></u-gap>
		<view class="notice" v-if="!$u.test.isEmpty(notice)">
			<u-notice-bar :text="notice" direction="column" mode="link" @click="shownoticefun"></u-notice-bar>
		</view>
		<u-gap :height="15" bgColor="#f7f8fa"></u-gap>
		<view class="menublock">
			<view class="mitem" @click="toPage('qsy')">
				<text class="mtitle">去水印</text>
				<view class="mtips">多平台去水印</view>
				<view class="micon">
					<u--image src="/static/img/qushuiyin.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</view>
			<view class="mitem" @click="toPage('tools')">
				<text class="mtitle">工具箱</text>
				<view class="mtips">发圈防止折叠</view>
				<view class="micon">
					<u--image src="/static/img/md5.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</view>

			<view class="mitem" @click="toPage('lq')">
				<text class="mtitle">领积分</text>
				<view class="mtips">每日签到领取</view>
				<view class="micon">
					<u--image src="/static/img/jifen.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</view>
			<view class="mitem" @click="toPage('yq')">
				<text class="mtitle">爱分享</text>
				<view class="mtips">分享获取积分</view>
				<view class="micon">
					<u--image src="/static/img/fenxiang.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</view>

			<view class="mitem" @click="toPage('help')">
				<text class="mtitle">有问题</text>
				<view class="mtips">常见问题解答</view>
				<view class="micon">
					<u--image src="/static/img/help.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</view>
			<u-button class="mitem" open-type="contact" :customStyle="{'height':'80px'}">
				<text class="mtitle">找客服</text>
				<view class="mtips">快来找我聊聊</view>
				<view class="micon">
					<u--image src="/static/img/kefu.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</u-button>
			<!-- <view class="mitem" @click="toPage('gzh')">
				<text class="mtitle">公众号</text>
				<view class="mtips">关注公众号吧</view>
				<view class="micon">
					<u--image src="/static/img/kefu.png" width="36" height="36" mode="widthFix"></u--image>
				</view>
			</view> -->
		</view>
		<u-gap :height="15" bgColor="#f7f8fa"></u-gap>
		<adVideo></adVideo>
		<u-popup :show="shownotice" mode="center" closeable round="15px" :customStyle="popupstyle"
			:safeAreaInsetBottom="false" @close="shownotice=false">
			<view class="ntitle">
				公告详情
			</view>
			<scroll-view scroll-y="true" style="height: calc(100% - 50px);width: 100%;">
				<view class="noticetxt" v-html="notice[0]"></view>
			</scroll-view>
		</u-popup>
		<!-- <u-popup :show="showgzh" mode="center" closeable round="15px" :customStyle="popupstyle"
			:safeAreaInsetBottom="false" @close="showgzh=false">
			<view class="ntitle">
				关注公众号
			</view>
			<u-image :src="host+'static/gzh.jpg?t='+new Date().getTime()" width="100%" height="auto"
				mode="widthFix" radius="15"></u-image>
		</u-popup> -->
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	import TabarTop from '@/components/tabartop.vue'
	import {
		os
	} from "@/util/os"

	import {
		chaPing
	} from '@/common/ad'
	import { baseUrl } from '../common/config'
	let ad = new chaPing()
	export default {
		components: {
			TabarTop,
			adVideo

		},
		data() {
			return {
				host:baseUrl,
				openad: "0",
				notice: [],
				shownotice: false,
				showgzh: false,
				popupstyle: {
					width: "70%",
					padding: "15px"
				},
				adtips:true
			}
		},
		onLoad(e) {

			ad.create()
			if (e.ptoken) {
				uni.setStorageSync("ptoken", e.ptoken)
			}
		},
		onReady() {
			let notice = uni.getStorageSync("notice")
			if (notice)
				this.notice = [notice]
			else
				this.notice = []
		},
		onShow() {
			os()
			uni.$u.mpShare = {
				title: '免费、多平台去水印、拿文案', // 默认为小程序名称
				path: '/pages/index?ptoken=' + uni.getStorageSync('token'), // 默认为当前页面路径
				imageUrl: '/static/img/share.png' // 默认为当前页面的截图  
			}
			ad.show()

		},
		methods: {
			shownoticefun() {
				this.shownotice = true
			},
			toPage(p) {
				switch (p) {
					case "qsy":
						this.$u.route({
							type: "tab",
							url: "pages/qsy"
						})
						break;
					case "lq":
						this.$u.route({
							type: "to",
							url: "view/pages/lingqu"
						})
						break;
					case "yq":
						this.$u.route({
							type: "to",
							url: "view/pages/yaoqing"
						})
						break;
					case "tools":
						this.$u.route({
							type: "tab",
							url: "pages/tools"
						})
						break;
					case "help":
						this.$u.route({
							type: "to",
							url: "view/pages/help"
						})
						break;
					case "gzh":
						this.showgzh = true
						break;
				}

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
		padding: 0 15px;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
	}

	.notice {
		border-radius: 8px;
		overflow: hidden;
	}

	.ntitle {
		font-size: 16px;
		color: #FF5733;
		font-weight: bold;
		height: 50px;
		display: grid;
		place-items: center;
	}

	.noticetxt {
		font-size: 14px;
		color: #444;
		letter-spacing: 1px;
	}

	.menublock {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 15px;

		.mitem {
			width: 100% !important;
			display: block !important;
			background: #fff !important;
			padding: 15px !important;
			box-sizing: border-box !important;
			position: relative !important;
			border-radius: 15px !important;
			height: 80px !important;
			border: none !important;
			margin: 0 !important;
			text-align: left;

			.mtitle {
				font-size: 15px;
				font-weight: bold;
				color: #444;
			}

			.mtips {
				font-size: 12px;
				color: #b8b9be;
				font-weight: 500;
				padding-top: 5px;
			}

			.micon {
				width: 37px;
				height: 37px;
				position: absolute;
				right: 15px;
				bottom: 15px;
			}
		}
	}
.guide-main {
	align-items: center;
	background-color: #232323e6;
	border-radius: 10rpx;
	display: -webkit-flex;
	display: flex;
	padding-left: 25rpx;
	position: fixed;
	right: 30rpx;
	top: calc(140rpx + var(--status-bar-height));
	z-index: 999
}

.guide-main .text {
	border-right: 1rpx solid #f1f1f1;
	color: #fff;
	font-size: 24rpx;
	line-height: 1;
	padding-right: 20rpx
}

.guide-main::before {
	border: 16rpx solid transparent;
	border-bottom-color: #232323e6;
	content: "";
	height: 0;
	position: absolute;
	right: 90rpx;
	top: -32rpx;
	width: 0
}

.guide-main .close {
	align-items: center;
	display: -webkit-flex;
	display: flex;
	height: 60rpx;
	justify-content: center;
	width: 60rpx
}
</style>
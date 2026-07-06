<template>
	<!--
	作者：技术宅妞、哆哆、希速云
	QQ：522605223 
	-->
	<view class="page">
		<TabarTop img="/static/img/tooltop.png"></TabarTop>
		<adVideo aid="adunit-af1b10061df11f3c"></adVideo>
		<u-gap :height="20" bgColor="#f7f8fa"></u-gap>
		<view class="tlist">
			<view class="titem" @click="$u.route('view/pages/pengyou')">
				<view class="tlogo">
					<u-image src="/static/img/pengyouquan.png" radius="50px" width="100%" height="100%"
						mode="widthFix"></u-image>
				</view>
				<view class="tinfo">
					<u--text :lines="1" color="#333" align="right" margin="0 0 5px 0" bold text="发圈防折叠"></u--text>
					<u--text :lines="1" size="12px" align="right" color="#97989c" text="一键解决文案折叠"></u--text>
				</view>
			</view>
			<view class="titem" @click="$u.route('view/pages/md5')">
				<view class="tlogo">
					<u-image src="/static/img/md5icon.png" radius="50px" width="100%" height="100%"
						mode="widthFix"></u-image>
				</view>
				<view class="tinfo">
					<u--text :lines="1" align="right" margin="0 0 5px 0" color="#333" bold text="改视频MD5"></u--text>
					<u--text :lines="1" align="right" size="12px" color="#97989c" text="一键修改MD5参数"></u--text>
				</view>
			</view>
			<view class="titem" @click="$u.route('image/pages/index/index')">
				<view class="tlogo">
					<u-image src="/static/img/jsy.png" radius="50px" width="100%" height="100%"
						mode="widthFix"></u-image>
				</view>
				<view class="tinfo">
					<u--text :lines="1" align="right" margin="0 0 5px 0" color="#333" bold text="图片加水印"></u--text>
					<u--text :lines="1" align="right" size="12px" color="#97989c" text="全屏 隐私 横幅等"></u--text>
				</view>
			</view>
			<view class="titem" @click="toMiniProgram(item)" v-for="(item,i) in linkapp" :key="i">
				<view class="yltxt">
					友链
				</view>
				<view class="tlogo">
					<u-image :src="item.logo?item.logo:'/static/img/logo.png'" radius="50px" width="40px" height="40px"
						mode="widthFix">
						<u-image slot="error" src="/static/img/logo.png" radius="50px" width="40px" height="40px"
							mode="widthFix"></u-image>
					</u-image>

				</view>
				<view class="tinfo">
					<u--text :lines="1" align="right" margin="0 0 5px 0" color="#333" bold :text="item.yname"></u--text>
					<u--text :lines="1" align="right" size="12px" color="#97989c" :text="item.ydesc"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabarTop from '@/components/tabartop.vue'
	import adVideo from '@/components/advideo.vue'
	import {
		os
	} from "@/util/os"
	import {
		getLinkApp,
		setLinkAppNum
	} from '@/common/api'
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()

	export default {
		components: {
			TabarTop,
			adVideo
		},
		data() {
			return {
				linkapp: [],
			}
		},
		onLoad() {
			ad.create()
		},
		onShow() {
			os()
			ad.show()
		},
		mounted() {

			this.getApp()
		},
		methods: {
			getApp() {

				getLinkApp().then(res => {
					console.log("友情小程序", res)
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.linkapp = res.data
					} else {
						this.linkapp = []
					}
				})
			},
			//跳转小程序
			toMiniProgram(opt) {
				uni.navigateToMiniProgram({
					appId: opt.appid,
					path: opt.path, //要打开B小程序的页面，这里是index
					envVersion: 'release', //打开的对应小程序环境： develop（开发版），trial（体验版），release（正式版
					success(res) {
						console.log('打开成功', res)
						//更新点击量
						setLinkAppNum({
							yid: opt.yid
						})
					}
				})
			}

		}
	}
</script>

<style lang="less">
	.tlist {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 15px;

		.titem {
			flex: 1;
			background: #fff;
			border-radius: 15px;
			padding: 15px 10px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.yltxt {
				position: absolute;
				top: 0;
				left: 0;
				font-size: 8px;
				font-weight: bold;
				padding: 2px 10px;
				border-radius: 15px 0 15px 0;
				background: #FF5733;
				color: #fff;
			}

			.tlogo {
				min-width: 40px;
				min-height: 40px;
				width: 40px;
				height: 40px;
				border-radius: 20px;
				border: 1px solid #f7f8fa;
				overflow: hidden;

			}

			.tinfo {
				flex: 1;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				text-align: right;
				padding-left: 5px;
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
</style>
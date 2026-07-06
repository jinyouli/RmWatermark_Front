<template>
	<!--
	作者：技术宅妞、哆哆、希速云
	QQ：522605223 
	-->
	<view class="page">
		<TabarTop img="/static/img/text.png"></TabarTop>
		<adVideo aid="adunit-af1b10061df11f3c"></adVideo>
		<u-gap :height="20" bgColor="#f7f8fa"></u-gap>
		<u-empty v-if="linkapp.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		<view class="tlist">

			<view class="titem" v-for="(item,i) in linkapp" :key="i" @click="toAi(item)">
				<view class="titop">
					<u--text :lines="2" color="#333" bold :text="item.title"></u--text>
					<view class="tlogo">
						<u-image :src="item.icon?item.icon:'/static/img/logo.png'" radius="10px" width="27px"
							height="27px" mode="widthFix">
							<u-image slot="error" src="/static/img/logo.png" radius="10px" width="27px" height="27px"
								mode="widthFix"></u-image>
						</u-image>
					</view>
				</view>

				<view class="tinfo">
					<u--text :lines="2" style="font-weight: 500;" size="12px" color="#97989c"
						:text="item.desc"></u--text>
				</view>
			</view>
		</view>
		<u-gap :height="20" bgColor="#f7f8fa"></u-gap>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import TabarTop from '@/components/tabartop.vue'
	import adVideo from '@/components/advideo.vue'
	import {
		os
	} from "@/util/os"
	import {
		getAiTools
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
				checktoken: null
			}
		},
		onLoad(e) {
			ad.create()
			if (e.ptoken) {
				uni.setStorageSync("ptoken", e.ptoken)
			}

		},
		onShow() {
			os()
			uni.$u.mpShare = {
				title: '爆款文案，短视频脚本，文案改写等，轻松拿捏',
				path: 'pages/text?ptoken=' + uni.getStorageSync('token'),
				imageUrl: '/static/img/textshare.png'
			}
			uni.removeStorageSync("toolinfo")
			ad.show()
		},
		onPullDownRefresh() {
			this.getAiToolslist()
		},
		mounted() {
			let that = this
			this.checktoken = setInterval(() => {
				let token = uni.getStorageSync("token")
				if (token != "") {
					that.getAiToolslist()
				}
			}, 10)
		},
		methods: {
			toAi(e) {
				uni.setStorageSync("toolinfo", e)
				this.$u.route("view/pages/ai")
			},
			getAiToolslist() {
				clearInterval(this.checktoken);
				getAiTools().then(res => {
					console.log("工具列表", res)
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.linkapp = res.data
					} else {
						this.linkapp = []
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

			.titop {
				width: 100%;
				display: flex;
				align-items: center;

				.tlogo {
					width: 27px;
					height: 27px;
					min-width: 27px;
					border-radius: 20px;
					border: 1px solid #f7f8fa;
				}
			}


			.tinfo {
				flex: 1;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				padding-top: 7px;
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
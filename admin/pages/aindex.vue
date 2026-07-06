<template>
	<view class="page">
		<TabarTop img="/static/img/logotxt.png" page="2" gap="20">
			<view class="topinfo">
				<u-avatar size="50" :src="randomStr(headimg)" shape="circle"></u-avatar>
				<view class="name">
					<text>{{randomStr(ci)}}</text>
					<view>
						<text class="uid">欢迎回来~</text>

					</view>
				</view>
			</view>
			<view class="mybody">
				<view class="tongji">

					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0"
							:endVal="tjinfo.zsuser"></u-count-to>
						<view class="title">
							总用户量
						</view>
					</view>
					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0"
							:endVal="tjinfo.hyuser"></u-count-to>
						<view class="title">
							今日活跃
						</view>
					</view>
					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0"
							:endVal="tjinfo.zjuser"></u-count-to>
						<view class="title">
							今日新增
						</view>
					</view>
					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0"
							:endVal="tjinfo.jx"></u-count-to>
						<view class="title">
							今日解析
						</view>
					</view>
				</view>
			</view>
		</TabarTop>

		<view class="menublock">
			<view class="mitem" @click="toPage('auser')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">用户管理</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('alink')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">友情管理</text>
				<text class="tips" v-if="tjinfo.link>0">{{tjinfo.link}}个</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('wen')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">文案工具</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('config')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">配置/公告管理</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('ajiexi')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">解析列表</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('ajifen')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">积分列表</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('adomin')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">域名列表</text>
				<text class="tips" v-if="tjinfo.domin>0">{{tjinfo.domin}}个</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<u-text type="error" align="center" @click="loginout" text="退出后台"></u-text>


		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	import TabarTop from '@/components/tabartop.vue'
	import {
		adminGetTongJi,
		adminLogOut
	} from '@/common/api.js'
	export default {
		components: {
			TabarTop
		},
		data() {
			return {
				ci: ["如若小城，依兮。", "撕不毁的,年华。", "懂生活,爱自由!", "奋斗成就辉煌。", "凝往昔，浮生尽。", "枫林丹,一世安。", "不怕慢只怕站。", "心要走，人难留。",
					"时光,浓淡相宜。", "不颓废，不消极。", "抓捕、遗失、甜蜜。", "执着、给予、坚强。", "青春、染指、年华。", "青春，染指流年。", "流年，淡漠红尘。"
				],
				headimg: [
					"/static/img/headimg/1.jpg",
					"/static/img/headimg/2.jpg",
					"/static/img/headimg/3.jpg",
					"/static/img/headimg/4.jpg",
					"/static/img/headimg/5.jpg",
					"/static/img/headimg/6.jpg",
					"/static/img/headimg/7.jpg",
					"/static/img/headimg/8.jpg",
					"/static/img/headimg/9.jpg",
					"/static/img/headimg/10.jpg",
					"/static/img/headimg/11.jpg",
					"/static/img/headimg/12.jpg",
					"/static/img/headimg/13.jpg",
					"/static/img/headimg/14.jpg",
					"/static/img/headimg/15.jpg",
					"/static/img/headimg/16.jpg",
					"/static/img/headimg/17.jpg",
					"/static/img/headimg/18.jpg",
					"/static/img/headimg/19.jpg",
					"/static/img/headimg/20.jpg",
					"/static/img/headimg/21.jpg"
				],
				tjinfo: {
					'zsuser': 0,
					'zjuser': 0,
					'hyuser': 0,
					'jx': 0,
					"domin": 0,
					"link": 0
				}
			}
		},
		onShow() {
			if (this.$u.test.isEmpty(uni.getStorageSync("atoken"))) {
				this.$refs.uToast.show({
					type: "warning",
					message: "请先登录",
					duration: 2000
				})
				this.$u.route('admin/pages/alogin')
				return
			}
			this.getTongJi()
		},
		onPullDownRefresh() {
			this.getTongJi()
		},
		onShareAppMessage(res) {
			return {
				title: '免费、多平台去水印、拿文案',
				path: '/pages/index?ptoken=' + uni.getStorageSync('token'),
				imageUrl: '/static/img/share.png'
			}
		},
		methods: {
			loginout() {
				adminLogOut({
					atoken: uni.getStorageSync("atoken")
				}).then(res => {
					if (res.code == 0) {
						uni.removeStorageSync("atoken")
						this.$refs.uToast.show({
							type: "success",
							message: res.msg,
							duration: 2000
						})
						this.$u.route({
							type: "tab",
							url: '/pages/index'
						})
					} else {
						this.$refs.uToast.show({
							type: "warning",
							message: res.msg,
							duration: 2000
						})
					}
				})
			},
			getTongJi() {
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				adminGetTongJi({
					atoken: uni.getStorageSync("atoken")
				}).then(res => {
					console.log("统计信息", res)
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.tjinfo = res.data
					} else {
						this.tjinfo = {
							'zsuser': 0,
							'zjuser': 0,
							'hyuser': 0,
							'jx': 0,
							"domin": 0,
							"link": 0
						}
						if (res.code == 2) {
							this.$refs.uToast.show({
								type: "warning",
								message: res.msg,
								duration: 2000
							})
							uni.removeStorageSync("atoken")
							this.$u.route({
								type: "redirect",
								url: "admin/pages/alogin"
							})
						}
					}
					uni.hideLoading()
				})
			},
			randomStr(arr) {
				if (!Array.isArray(arr) || arr.length === 0) return undefined;
				const randomIndex = Math.floor(Math.random() * arr.length);
				return arr[randomIndex];
			},
			toPage(p) {
				switch (p) {
					case "auser":
						this.$u.route("admin/pages/auser")
						break;
					case "alink":
						this.$u.route("admin/pages/alink")
						break;
					case "ajiexi":
						this.$u.route("admin/pages/ajiexi")
						break;

					case "ajifen":
						this.$u.route("admin/pages/ajifen")
						break;
					case "adomin":
						this.$u.route("admin/pages/adomin")
						break;
					case "wen":
						this.$u.route("admin/pages/wtools")
						break;
					case "config":
						this.$u.route("admin/pages/config")
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

	.menublock {
		width: calc(100% - 30px);
		margin: 0 auto;
		background: #fff;
		border-radius: 15px;
		padding: 10px 15px;
		box-sizing: border-box;

		.mitem {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 10px 0;
			box-sizing: border-box;

			.mtxt {
				font-size: 15px;
				color: #333;
				flex: 1;
				padding-left: 8px;
			}

			.tips {
				background: rgba(255, 87, 51, .1);
				border: 1px solid #FF5733;
				color: #FF5733;
				font-size: 10px;
				margin-right: 5px;
				font-weight: bold;
				padding: 1px 5px;
				box-sizing: border-box;
				border-radius: 20px;
			}
		}
	}

	.topinfo {
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.name {
			font-size: 15px;
			font-weight: bold;
			color: #fff;
			margin-left: 10px;

			.uid {
				font-size: 10px;
				padding: 3px 8px;
				background: rgba(255, 255, 255, .5);
				color: #FF5733;
				font-weight: bold;
				border-radius: 20px;
			}
		}

	}

	.mybody {
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;

		.tongji {
			width: 100%;
			padding: 20px 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;



			.tjitem {
				text-align: center;
				color: #fff;
				font-weight: bold;
				font-size: 20px;

				.title {
					font-size: 12px;
					font-weight: 500;
					color: #fff;
				}
			}
		}
	}

	.topbg {
		width: 100%;
		min-height: 100px;
		background: #FF5733;
	}

	.page {
		background: #f7f8fa;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
	}

	.tabar {
		width: 100%;
		background: linear-gradient(to top, #FF5733, #ff8447);


		.navbar {
			display: flex;
			align-items: center;
			padding-left: 10px;
		}
	}
</style>
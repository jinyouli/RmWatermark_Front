<template>
	<view class="page">
		<TabarTop img="/static/img/qsytop.png" page="2" gap="20">
			<view class="topinfo">
				<u-avatar size="50" :src="randomStr(headimg)" shape="circle"></u-avatar>
				<view class="name">
					<text>{{randomStr(ci)}}</text>
					<view>
						<text class="uid">UID：{{user.uid}}</text>

					</view>
				</view>
			</view>
			<view class="mybody">
				<view class="tongji">

					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0" :endVal="user.jf"></u-count-to>
						<view class="title">
							剩余积分
						</view>
					</view>
					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0" :endVal="user.jx"></u-count-to>
						<view class="title">
							成功解析
						</view>
					</view>
					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0" :endVal="user.yq"></u-count-to>
						<view class="title">
							累计邀请
						</view>
					</view>
					<view class="tjitem">
						<u-count-to color="#ffffff" font-size="20px" bold :startVal="0"
							:endVal="user.jryq"></u-count-to>
						<view class="title">
							今日邀请
						</view>
					</view>
				</view>
			</view>
		</TabarTop>
		<view class="menublock">
			<view class="mitem" @click="toPage('lq')">
				<u-icon size="25" color="#FF5733" name="integral-fill"></u-icon>
				<text class="mtxt">签到领积分</text>
				<text class="tips">每天最高+25分</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('yaoqing')">
				<u-icon size="25" color="#FF5733" name="chrome-circle-fill"></u-icon>
				<text class="mtxt">邀请好友得积分</text>
				<text class="tips">每个最高+40分</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="jilishow=true">
				<u-icon size="25" color="#FF5733" name="play-right-fill"></u-icon>
				<text class="mtxt">看激励视频得积分</text>
				<text class="tips">每个看完+30分</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap :height="5" bgColor="#f7f8fa"></u-gap>
		<view class="menublock" style="padding: 0;">
			<adBanner></adBanner>
		</view>
		<u-gap height="5" bgColor="#f7f8fa"></u-gap>
		<view class="menublock">
			<view class="mitem" @click="toPage('jf')">
				<u-icon size="25" color="#FF5733" name="star-fill"></u-icon>
				<text class="mtxt">积分明细</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('jx')">
				<u-icon size="25" color="#FF5733" name="bookmark-fill"></u-icon>
				<text class="mtxt">解析记录</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
			<view class="mitem" @click="toPage('yq')">
				<u-icon size="25" color="#FF5733" name="plus-people-fill"></u-icon>
				<text class="mtxt">邀请记录</text>
				<u-icon color="#97989c" name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<u-text type="info" align="center" :text="version_number" @click="clickSprink()" @touchstart="touchstart"
			@touchend="touchend"></u-text>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>

		<u-toast ref="uToast"></u-toast>
		<u-modal :show="jilishow" @confirm="jilivideo()" title="观看激励视频" content='观看激励视频后即可获得30积分!' showCancelButton
			closeOnClickOverlay @close="jilishow=false" @cancel="jilishow=false"></u-modal>


	</view>
</template>

<script>
	import TabarTop from '@/components/tabartop.vue'
	import adBanner from '@/components/adbanner.vue'
	import {
		os
	} from "@/util/os"
	import {
		getUserInfo,
		jiLi
	} from '@/common/api.js'
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()
	let videoAd = null
	export default {
		components: {
			TabarTop,
			adBanner
		},
		data() {
			return {
				version_number: "1.0.0",
				jilishow: false,
				Interval: "",
				backtime: 0,
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
				user: {
					'uid': 0,
					'jf': 0,
					'jx': 0,
					'yq': 0,
					'jryq': 0
				},
				islongPress: false,
				timer: "",
				jiliid:""
			}
		},
		onPullDownRefresh() {
			this.getuser()
		},
		onLoad() {
			ad.create()
			let that = this
			let jiliid = uni.getStorageSync("jiliid")
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd&&jiliid) {
				videoAd = wx.createRewardedVideoAd({
					adUnitId: jiliid
				})
				videoAd.onLoad(() => {})
				videoAd.onError((err) => {
					console.error('激励视频光告加载失败', err)
					that.$refs.uToast.show({
						type: "error",
						message: "激励视频光告加载失败",
						duration: 3000
					})
				})
				videoAd.onClose((res) => {
					// 用户点击了【关闭广告】按钮
					if (res && res.isEnded) {
						// 正常播放结束，可以下发游戏奖励
						this.jiLi()
					} else {
						clearInterval(that.Interval)
						this.backtime = 0
						// 播放中途退出，不下发游戏奖励
						that.$refs.uToast.show({
							type: "error",
							message: "中途关闭广告，积分领取失败哦！",
							duration: 3000
						})
					}
				})
			}
		},
		onShow() {
			os()
			let openad = uni.getStorageSync("openad")
			if (openad == 0) {
				ad.show()
			}
			// 条件编辑只在微信小程序显示,仅支持正式环境
			// #ifdef MP-WEIXIN
			const accountInfo = wx.getAccountInfoSync();
			this.version_number = accountInfo.miniProgram.version ? accountInfo.miniProgram.version : "1.0.0" // 小程序 版本号
			console.log(accountInfo.miniProgram.version, '小程序版本号')
			// #endif
			this.getuser()
		},
		methods: {
			//长按事件
			longpress() {
				this.islongPress = true;
				console.log("长按事件");
			},
			//点击事件
			clickSprink() {
				// 非长按
				if (this.islongPress == false) {
					console.log("点击事件");
				} else if (this.islongPress == true) {
					console.log("长按事件");
					this.$u.route('admin/pages/alogin')
				}
			},
			//手指触摸动作开始
			touchstart() {
				this.timer = setTimeout(() => {
					this.longpress();
				}, 2000)
			},
			//手指触摸动作结束
			touchend() {
				//延时执行为了防止 click() 还未判断 islongPress 的值就被置为 fasle
				clearTimeout(this.timer);
				setTimeout(() => {
					this.islongPress = false
				}, 200)
			},

			jilivideo() {
				let that = this
				this.Interval = setInterval(() => {
					that.backtime += 1
					if (that.backtime > 10) {
						clearInterval(that.Interval)

					}
				}, 1000)
				this.jilishow = false
				// 用户触发广告后，显示激励视频广告
				videoAd.show().catch(() => {
					// 失败重试
					videoAd.load()
						.then(() => videoAd.show())
						.catch(err => {
							console.error('激励视频 广告显示失败', err)
							that.$refs.uToast.show({
								type: "error",
								message: "激励视频 广告显示失败",
								duration: 3000
							})
						})
				})
			},
			jiLi() {
				clearInterval(this.Interval)
				if (this.backtime < 10) {
					this.$refs.uToast.show({
						type: "error",
						message: "中途关闭广告，积分领取失败哦",
						duration: 2000
					})
					return
				}
				this.backtime = 0
				uni.showLoading({
					mask: true,
					title: "领取中..."
				})
				let that = this
				jiLi().then(res => {
					console.log("解析信息", res)
					uni.hideLoading()
					if (res.code == 0) {
						that.$refs.uToast.show({
							type: "success",
							message: res.msg,
							duration: 2000
						})
					} else {
						that.$refs.uToast.show({
							type: "error",
							message: res.msg,
							duration: 3000
						})
					}
				})
			},

			getuser() {

				getUserInfo().then(res => {
					console.log("用户信息", res)
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.user = res.data
					} else {
						this.user = {
							'uid': 0,
							'jf': 0,
							'jx': 0,
							'yq': 0,
							'jryq': 0
						}
					}
				})
			},
			randomStr(arr) {
				if (!Array.isArray(arr) || arr.length === 0) return undefined;
				const randomIndex = Math.floor(Math.random() * arr.length);
				return arr[randomIndex];
			},
			toPage(p) {
				switch (p) {
					case "jx":
						this.$u.route({
							type: "to",
							url: "view/pages/jxlist"
						})
						break;
					case "jf":
						this.$u.route({
							type: "to",
							url: "view/pages/jflist"
						})
						break;
					case "yq":
						this.$u.route({
							type: "to",
							url: "view/pages/yqlist"
						})
						break;

					case "yaoqing":
						this.$u.route({
							type: "to",
							url: "view/pages/yaoqing"
						})
						break;
					case "lq":
						this.$u.route({
							type: "to",
							url: "view/pages/lingqu"
						})
						break;
					case "gy":
						this.$u.route({
							type: "to",
							url: "view/pages/about"
						})
						break;
					case "qun":
						this.$u.route({
							type: "to",
							url: "view/pages/qun"
						})
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
<template>
	<view class="page">
		<view class="topinfo">
			<view class="left">
				<view class="tjf">
					<u-icon size="25" color="#fff" name="integral-fill"></u-icon>
					<text>我的积分：</text>
				</view>
				<view class="">
					<u-count-to color="#ffffff" font-size="15px" bold :startVal="0" :endVal="lqinfo.count"></u-count-to>
				</view>
			</view>
			<view class="btn" @click="$u.route({url:'view/pages/yaoqing',type:'redirectTo'})">
				<text>邀请领取</text>
			</view>
		</view>
		<u-gap height="15" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				签到领积分
			</text>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="qlist">
				<view class="qitem" v-for="(item,i) in 7" :key="i">
					<text class="jf"
						:style="{color:checkstatus(i)?'#97989c':'#FF5733'}">+{{i==6?lqinfo.jf*5:lqinfo.jf}}</text>
					<u-icon size="25" :color="checkstatus(i)?'#97989c':'#FF5733'" name="star-fill"></u-icon>
					<text class="jf" :style="{color:checkstatus(i)?'#97989c':'#FF5733'}">第{{i+1}}天</text>
				</view>
			</view>
			<u-gap height="20" bgColor="#ffffff"></u-gap>
			<view class="qbtn" :style="{background:click?'#FF5733':'#97989c'}" @click="claimPoints()">
				{{click?"立即签到":"已签到"}}
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				签到说明
			</text>
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<view class="slist">
				<view class="sitem">1、每天可以签到一次，签到成功即可获取对应的积分</view>
				<view class="sitem">2、累计签到六天，第七天开始且不断签，每天可获得第一日对应积分的5倍</view>
				<view class="sitem">3、积分数额也会不定期浮动</view>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<adVideo aid="adunit-223ae0cb01b97b30"></adVideo>
		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	import {
		os
	} from "@/util/os"
	import {
		getQY,
		claimPoints
	} from '@/common/api'
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
				lqinfo: {
					"jf": 2,
					"count": 0,
					'list': []
				},
				click: true
			}
		},
		onPullDownRefresh() {
			this.getqiandao()
		},
		onLoad() {
			ad.create("adunit-db21879bd0192744")
		},
		onShow() {
			os()
			ad.show()
		},
		mounted() {
			this.getqiandao()
		},
		methods: {
			checkstatus(i) {
				return this.$u.test.isEmpty(this.lqinfo.list[i])
			},
			getqiandao() {
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				getQY({
					type: 4,
				}).then(res => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					console.log("info", res)
					if (res.code == 0) {
						this.lqinfo = res.data
					}
				})
			},
			claimPoints() {
				if (!this.click) return
				uni.showLoading({
					mask: true,
					title: "签到中..."
				})
				let ptoken = uni.getStorageSync("ptoken")
				let params = {}
				if (ptoken) {
					params = {
						ptoken: ptoken
					}
				}

				claimPoints(params).then(res => {
					uni.hideLoading()
					if (res.code == 0) {
						uni.removeStorageSync("ptoken")
						this.click = false
						this.$refs.uToast.show({
							type: "success",
							message: "签到成功"
						})
						this.getqiandao()
					} else {
						this.click = true
						this.$refs.uToast.show({
							type: "error",
							message: res.msg,
							duration: 3000
						})
					}
				})
			}
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

		.slist {
			font-size: 13px;
			color: #97989c;
			letter-spacing: 0.75px;

			.sitem {
				padding: 5px 0;
				box-sizing: border-box;
			}
		}

		.qlist {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.qitem {
				display: flex;
				flex-flow: column;
				align-items: center;

				.jf {
					color: #97989c;
					font-size: 12px;
					font-weight: bold;
					margin: 2px 0;
				}
			}
		}

		.qbtn {
			width: 100%;
			height: 45px;
			line-height: 45px;
			border-radius: 30px;
			text-align: center;
			color: #fff;
			background: #FF5733;
			font-size: 14px;
			font-weight: bold;
		}
	}

	page {
		height: 100%;
		width: 100%;
	}

	.page {
		background: #f7f8fa;
		width: 100%;
		padding: 20px 15px;
		min-height: 100%;
		box-sizing: border-box;
	}


	.topinfo {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		background: #FF5733;
		border-radius: 15px;
		box-sizing: border-box;

		.left {
			flex: 1;
			display: flex;
			align-items: center;

			.tjf {
				display: flex;
				align-items: center;
				font-size: 15px;
				color: #fff;
				font-weight: bold;
			}
		}

		.btn {
			background: #fff;
			color: #FF5733;
			height: 25px;
			padding: 0 10px;
			border-radius: 15px;
			font-size: 12px;
			font-weight: bold;
			line-height: 25px;
		}
	}
</style>
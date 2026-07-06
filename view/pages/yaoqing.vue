<template>
	<view class="page">
		<view class="topinfo">
			<view class="left">
				<view class="tjf">
					<u-icon size="25" color="#fff" name="plus-people-fill"></u-icon>
					<text>累计邀请：</text>
				</view>
				<view class="">
					<u-count-to color="#ffffff" font-size="15px" bold :startVal="0" :endVal="yqinfo.count"></u-count-to>
				</view>
			</view>
			<view class="btn" @click="$u.route({url:'view/pages/lingqu',type:'redirectTo'})">
				<text>签到领取</text>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				邀请领积分
			</text>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<view class="qlist">
				<view class="qitem" v-for="(item,i) in 7" :key="i">
					<text class="jf"
						:style="{color:checkstatus(i)?'#97989c':'#FF5733'}">+{{i==6?yqinfo.jf*5:yqinfo.jf}}</text>
					<u-icon size="25" :color="checkstatus(i)?'#97989c':'#FF5733'" name="account-fill"></u-icon>
					<text class="jf" :style="{color:checkstatus(i)?'#97989c':'#FF5733'}">第{{i+1}}个</text>
				</view>
			</view>
			<u-gap height="15" bgColor="#ffffff"></u-gap>
			<u-button class="qbtn" open-type="share">
				立即邀请
			</u-button>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="qiandao">
			<text class="title">
				邀请说明
			</text>
			<u-gap height="10" bgColor="#ffffff"></u-gap>
			<view class="slist">
				<view class="sitem">1、邀请个数不限，邀请成功即可获取对应的积分</view>
				<view class="sitem">2、七天内累计邀请六个后，第七个开始往后且每天都有至少一个有效邀请，每天可获得第一个邀请对应积分的5倍</view>
				<view class="sitem">3、积分数额也会不定期浮动</view>
				<view class="sitem" style="color: #FF5733;font-weight: bold;">重点：被邀请人(<text
						style="color: #00aaff;">未被其他人邀请</text>)通过你的分享进入小程序需要及时签到，否则不计入成功邀请人数，但可再次邀请(<text
						style="color: #00aaff;">记得提醒被邀用户及时签到</text>)</view>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<adBanner></adBanner>

		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	import adBanner from '@/components/adbanner.vue'
	import {
		os
	} from "@/util/os"
	import {
		getQY
	} from '@/common/api'
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
				yqinfo: {
					"jf": 5,
					"count": 0,
					'list': []
				}
			}
		},
		onPullDownRefresh() {
			this.getyaoqing()
		},
		onLoad() {
			ad.create("adunit-3ca881a318c2d9c2")
		},
		onShow() {
			os()
			ad.show()
		},
		mounted() {
			this.getyaoqing()
		},
		methods: {
			checkstatus(i) {
				return this.$u.test.isEmpty(this.yqinfo.list[i])
			},
			getyaoqing() {
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				getQY({
					type: 5,
				}).then(res => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					console.log("info", res)
					if (res.code == 0) {
						this.yqinfo = res.data
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
			width: 100% !important;
			height: 45px !important;
			line-height: 45px !important;
			border-radius: 30px !important;
			text-align: center !important;
			color: #fff !important;
			background: #FF5733 !important;
			font-size: 14px !important;
			font-weight: bold !important;
			border: none !important;
			margin: 0 !important;
			padding: 0 !important;
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
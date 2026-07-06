<template>
	<view class="page">
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="head">
			<view class="item">
				<u-count-to color="#FF5733" font-size="20px" bold :startVal="0" :endVal="tj[0]"></u-count-to>
				<view class="txt">
					解析成功
				</view>
			</view>
			<view class="item">
				<u-count-to color="#FF5733" font-size="20px" bold :startVal="0" :endVal="tj[1]"></u-count-to>
				<view class="txt">
					解析失败
				</view>
			</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="list">
			<u-empty v-if="list.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			<block v-else>
				<view class="item" v-for="(item,i) in list" :key="i">
					<view class="info" @click="copyText(item.url)">
						<u--text :lines="1" :text="item.url"></u--text>
						<view class="time">
							{{item.addtime}}
						</view>
					</view>
					<u-icon size="25" :color="item.status==0? '#FF5733':'#97989c'"
						name="checkmark-circle-fill"></u-icon>
				</view>
			</block>


		</view>
		<u-loadmore v-if="list.length>0" :status="load.status" :loading-text="load.loadingText"
			:loadmore-text="load.loadmoreText" :nomore-text="load.nomoreText" @click="getJieXiList()" />

	</view>
</template>

<script>
	import {
		getJieXiList
	} from '@/common/api'
	import {
		os
	} from "@/util/os"
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()

	export default {
		data() {
			return {
				isload: true,
				load: {
					status: 'loadmore',
					loadingText: '火速加载中...',
					loadmoreText: '轻轻上拉,加载更多',
					nomoreText: '已经到底了呢'
				},
				page: 0,
				list: [],
				tj: [0, 0]

			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.isload = true
			this.list = []
			this.tj = [0, 0]
			this.getJieXiList()
		},
		onReachBottom() {
			this.getJieXiList()
		},
		onLoad() {
			ad.create("adunit-7e8b36ee3693210f")
		},
		onShow() {
			os()
			ad.show()
		},
		mounted() {
			this.getJieXiList()
		},
		methods: {
			//复制内容
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					},
					fail() {
						uni.showToast({
							icon: "error",
							title: '复制失败了'
						});
					}
				});
			},
			getJieXiList() {
				if (!this.isload) {
					uni.stopPullDownRefresh()
					return
				}
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				this.load.status = "loading"
				this.page += 1
				getJieXiList({
					page: this.page
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						res.data.list.map(res => {
							this.list.push(res)
						})
						this.tj = res.data.sum
						if (res.data.list.length < 20) {
							this.load.status = "nomore"
							this.isload = false
						} else {
							this.load.status = "loadmore"
							this.isload = true
						}
					}
					uni.hideLoading()
				})
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
		width: 100%;
		min-height: 100%;
		padding: 0 15px;
		box-sizing: border-box;
	}

	.list {
		width: 100%;

		.item {
			width: 100%;
			border-radius: 15px;
			background: #fff;
			padding: 15px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 15px;

			.info {
				font-size: 15px;
				color: #333;
				padding-right: 10px;
				box-sizing: border-box;

				.time {
					font-size: 12px;
					color: #97989c;
					font-weight: 500;
					padding-top: 5px;
				}

			}

			.num {
				font-size: 20px;
				color: #FF5733;
			}

			.jnum {
				font-size: 20px;
				color: #97989c;
			}
		}
	}

	.head {
		width: 100%;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;

		.item {
			text-align: center;
			flex: 1;

			.txt {
				margin-top: 5px;
				font-size: 12px;
				font-weight: 500;
				color: #FF5733;
			}
		}
	}
</style>
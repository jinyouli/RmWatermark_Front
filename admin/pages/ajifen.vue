<template>
	<view class="page">
		
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="list">
			<u-empty v-if="list.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			<block v-else>
				<view class="item" v-for="(item,i) in list" :key="i">
					<view class="info">
						<text v-if="item.type==1">激励领取</text>
						<text v-if="item.type==2">管理操作</text>
						<text v-if="item.type==3">解析扣减</text>
						<text v-if="item.type==4">签到领取</text>
						<text v-if="item.type==5">邀请领取</text>
						<view class="time">
							{{item.addtime}} UID:{{item.uid}}
						</view>
					</view>
					<text :class="item.type==3?'jnum':'num'">{{item.type==3?'-':'+'}}{{item.num}}</text>
				</view>
			</block>

		</view>
		<u-loadmore v-if="list.length>0" :status="load.status" :loading-text="load.loadingText"
			:loadmore-text="load.loadmoreText" :nomore-text="load.nomoreText" @click="adminGetList()" />

	</view>
</template>

<script>
	import {
		adminGetList
	} from '@/common/api.js'
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
				jftj: {
					1: 0,
					3: 0,
					4: 0,
					5: 0
				}
			}
		},
		onShareAppMessage(res) {
			return {
				title: '免费、多平台去水印、拿文案',
				path: '/pages/index?ptoken=' + uni.getStorageSync('token'),
				imageUrl: '/static/img/share.png'
			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.isload = true
			this.list = []
			this.adminGetList()
		},
		onReachBottom() {
			this.adminGetList()
		},
		mounted() {
			this.adminGetList()
		},
		methods: {
			adminGetList() {
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
				adminGetList({
					atoken: uni.getStorageSync("atoken"),
					dbname: "integral",
					page: this.page
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						res.data.map(res => {
							this.list.push(res)
						})
						this.jftj = res.data.sum
						if (res.data.length < 20) {
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
				font-weight: bold;

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
		justify-content: space-between;

		.item {
			text-align: center;

			.txt {
				margin-top: 5px;
				font-size: 12px;
				font-weight: 500;
				color: #FF5733;
			}
		}
	}
</style>
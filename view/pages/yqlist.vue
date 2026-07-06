<template>
	<view class="page">

		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="list">
			<u-empty v-if="list.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			<block v-else>
				<view class="item" v-for="(item,i) in list" :key="i">
					<u--text :lines="1" :text="'用户id：'+item.uid"></u--text>
					<view class="time">
						{{item.addtime}}
					</view>
				</view>
			</block>
		</view>
		<u-loadmore v-if="list.length>0" :status="load.status" :loading-text="load.loadingText"
			:loadmore-text="load.loadmoreText" :nomore-text="load.nomoreText" @click="getYaoQingList()" />
	</view>
</template>

<script>
	import {
		os
	} from "@/util/os"
	import {
		getYaoQingList
	} from '@/common/api'
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
			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.isload = true
			this.list = []
			this.getYaoQingList()
		},
		onReachBottom() {
			this.getYaoQingList()
		},
		onLoad() {
			ad.create("adunit-e29cba5f2d652587")
		},
		onShow() {
			os()
			ad.show()
		},
		mounted() {
			this.getYaoQingList()
		},
		methods: {
			getYaoQingList() {
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
				getYaoQingList({
					page: this.page
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						res.data.list.map(res => {
							this.list.push(res)
						})
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
			font-size: 15px;

			.time {
				padding-left: 10px;
				font-size: 12px;
				box-sizing: border-box;
				color: #97989c;
				font-weight: 500;
			}


		}
	}
</style>
<template>
	<view class="page">

		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="search">
			<u-input class="uinput" placeholder="输入uid" v-model="search"></u-input>
			<view class="searchbtn" @click="searchfun()">搜索</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="list">
			<u-empty v-if="list.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			<block v-else>
				<view class="item" v-for="(item,i) in list" :key="i" @click="setjifen(item)">
					<u--text :lines="1"  :text="item.uid"></u--text>
					<u--text :lines="1"  :text="item.integral+'分'"></u--text>
					<view class="time">
						{{item.addtime}}
					</view>
				</view>
			</block>
		</view>
		<u-loadmore v-if="list.length>0" :status="load.status" :loading-text="load.loadingText"
			:loadmore-text="load.loadmoreText" :nomore-text="load.nomoreText" @click="adminGetList()" />
		<u-popup :show="jifenshow" :round="10" mode="center" @close="jifenshow=false" :customStyle="{width:'80%'}" :safeAreaInsetBottom="false">
			<view class="cont">
				<view class="utitle">
					修改积分(uid:{{uid}})
				</view>
				<u-gap height="20" bgColor="#fff"></u-gap>
				<u-input placeholder="输入积分" v-model="jifen"></u-input>
				<u-gap height="20" bgColor="#fff"></u-gap>
				<u-button type="warning" @click="adminSetFen()">修改积分</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	import {
		adminGetList,
		adminSetFen
	} from '@/common/api'
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
				search: "",
				uid: "",
				jifen: 0,
				jifenshow: false
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
			this.uid = ""
			this.jifen = 0
			this.adminGetList()
		},
		onReachBottom() {
			this.adminGetList()
		},
		mounted() {
			this.adminGetList()
		},
		methods: {
			setjifen(e) {
				this.jifenshow = true
				this.uid = e.uid
				this.jifen = e.integral
			},
			searchfun(){
				this.uid=this.search
				this.page = 0
				this.isload = true
				this.list = []
				this.adminGetList()
			},
			adminSetFen() {
				let that=this
				uni.showLoading({
					mask: true,
					title: "修改中..."
				})
				adminSetFen({
					atoken: uni.getStorageSync("atoken"),
					uid: this.uid,
					jifen: this.jifen
				}).then(res => {
					if (res.code == 0) {
						that.$refs.uToast.show({
							type: "success",
							message: res.msg,
							duration: 2000
						})
						that.jifenshow = false
						uni.startPullDownRefresh()
					} else {
						that.$refs.uToast.show({
							type: "warning",
							message: res.msg,
							duration: 2000
						})
					}
					uni.hideLoading()
				})
			},
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
					dbname: "user",
					page: this.page,
					where: this.uid
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						res.data.map(res => {
							this.list.push(res)
						})
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
	.search{
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 15px;
		.uinput{
			border: none !important;
			background: #f7f8fa;
			border-radius: 8px;
			height: 40px;
			padding: 0 10px !important;
		}
		.searchbtn{
			width: 70px;
			border-radius: 8px;
			background: #FF5733;
			color: #fff;
			display: grid;
			place-items: center;
			margin-left: 10px;
			height: 40px;
			font-size: 14px;
		}
	}
	.cont{
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		.utitle{
			font-size: 15px;
			font-weight: bold;
			color: #FF5733;
		}
	}
</style>
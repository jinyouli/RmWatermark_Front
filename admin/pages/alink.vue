<template>
	<view class="page">
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="search">
			<u-input class="uinput" placeholder="输入小程序名称" v-model="search"></u-input>
			<view class="searchbtn" @click="searchfun()">搜索</view>
			<view class="searchbtn" @click="setlink()">新增</view>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="list">
			<u-empty v-if="list.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			<block v-else>
				<view class="item" v-for="(item,i) in list" :key="i" @click="setlink(item)">
					<u--text :lines="1" :text="item.yname"></u--text>
					<view class="time">
						{{item.addtime}}
					</view>
				</view>
			</block>
		</view>
		<u-loadmore v-if="list.length>0" :status="load.status" :loading-text="load.loadingText"
			:loadmore-text="load.loadmoreText" :nomore-text="load.nomoreText" @click="adminGetList()" />
		<u-popup :show="jifenshow" :round="10" mode="center" @close="jifenshow=false" :customStyle="{width:'80%'}"
			:safeAreaInsetBottom="false">
			<view class="cont">
				<view class="utitle">
					{{type==1?'新增':'修改'}}友情
				</view>
				<u-gap height="20" bgColor="#fff"></u-gap>
				<scroll-view scroll-y="true" style="height: 300px;">
					<view class="">
						<u--text type="info"   text="名称"></u--text>
						<u-input placeholder="输入名称" v-model="link.yname"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="简介"></u--text>
						<u-input placeholder="输入简介" v-model="link.ydesc"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="logo链接"></u--text>
						<u-input placeholder="输入logo链接" v-model="link.logo"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="Appid"></u--text>
						<u-input placeholder="输入Appid" v-model="link.appid"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="跳转路径"></u--text>
						<u-input placeholder="输入跳转路径" v-model="link.path"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="排序"></u--text>
						<u-input placeholder="输入排序" v-model="link.sort"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="访问量"></u--text>
						<u-input placeholder="输入访问量" v-model="link.num"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="状态"></u--text>
						<u-input placeholder="输入状态" v-model="link.status"></u-input>
						<u-gap height="10" bgColor="#fff" v-if="type==2" ></u-gap>
						<u--text type="info"   text="更新时间" v-if="type==2" ></u--text>
						<u-input placeholder="输入更新时间" v-if="type==2" v-model="link.uptime"></u-input>
						<u-gap height="10" bgColor="#fff" v-if="type==2" ></u-gap>
						<u--text type="info"   text="添加时间" v-if="type==2" ></u--text>
						<u-input placeholder="输入添加时间" v-if="type==2" v-model="link.addtime"></u-input>
					</view>
				</scroll-view>
				
				<u-gap height="20" bgColor="#fff"></u-gap>
				<u-button type="warning" @click="adminSaveLink()">{{type==1?'新增':'修改'}}友情</u-button>
				<u-toast ref="uToast"></u-toast>
			</view>
		</u-popup>
		<u-toast ref="cToast"></u-toast>
	</view>
</template>

<script>
	import {
		adminGetList,
		adminSaveLink
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
				yname: "",
				link: "",
				jifenshow: false,
				search: "",
				type: ""
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
			setlink(e) {
				let data = {
					addtime: "",
					appid: "",
					logo: "",
					num: "0",
					path: "",
					sort: "0",
					status: "0",
					uptime: "",
					ydesc: "",
					yid: "",
					yname: ""
				}
				this.jifenshow = true
				this.link = data
				if (e) {
					this.link = e
					this.type = 2

				} else {
					this.type = 1
				}
			},
			searchfun() {
				this.yname = this.search
				this.page = 0
				this.isload = true
				this.list = []
				this.adminGetList()
			},
			adminSaveLink() {
				
				if (this.$u.test.isEmpty(this.link.yname)) {
					console.log("小程序名称不能为空")
					this.$refs.uToast.show({
						type: "warning",
						message: "小程序名称不能为空",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.link.ydesc)) {
					console.log("小程序简介不能为空")
					this.$refs.uToast.show({
						type: "warning",
						message: "小程序简介不能为空",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.link.appid)) {
					console.log("不能为空")
					this.$refs.uToast.show({
						type: "warning",
						message: "小程序appid不能为空",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.link.logo)) {
					console.log("不能为空")
					this.$refs.uToast.show({
						type: "warning",
						message: "小程序logo不能为空",
						duration: 2000
					})
					return
				}
				let that = this
				uni.showLoading({
					mask: true,
					title: "操作中..."
				})
				adminSaveLink({
					atoken: uni.getStorageSync("atoken"),
					data: this.link
				}).then(res => {
					if (res.code == 0) {
						that.$refs.cToast.show({
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
					dbname: "link",
					page: this.page,
					where: this.yname
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

	.search {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 15px;

		.uinput {
			border: none !important;
			background: #f7f8fa;
			border-radius: 8px;
			height: 40px;
			padding: 0 10px !important;
		}

		.searchbtn {
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

	.cont {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;

		.utitle {
			font-size: 15px;
			font-weight: bold;
			color: #FF5733;
		}
	}
</style>
<template>
	<view class="page">
		<view class="searchbtn" @click="setlink()">新增</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="list">
			<u-empty v-if="list.length==0" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			<block v-else>
				<view class="item" v-for="(item,i) in list" :key="i" @click="setlink(item)">
					<u-image :src="item.icon?item.icon:'/static/img/logo.png'" radius="10px" width="40px"
						height="40px" mode="widthFix">
						<u-image slot="error" src="/static/img/logo.png" radius="10px" width="40px" height="40px"
							mode="widthFix"></u-image>
					</u-image>
					<view class="tinfo">
						<u--text :lines="1" bold color="#666" :text="item.title+'/'+item.type"></u--text>
						<u--text :lines="1" size="12px" type="info" :text="item.desc"></u--text>
					</view>
					<!-- <view class="time">
						{{item.addtime}}
					</view> -->
				</view>
			</block>
		</view>
		<u-loadmore v-if="list.length>0" :status="load.status" :loading-text="load.loadingText"
			:loadmore-text="load.loadmoreText" :nomore-text="load.nomoreText" @click="adminGetList()" />
		<u-popup :show="jifenshow" :round="10" mode="center" @close="jifenshow=false" :customStyle="{width:'80%'}"
			:safeAreaInsetBottom="false">
			<view class="cont">
				<view class="utitle">
					{{type==1?'新增':'修改'}}文案工具
				</view>
				<u-gap height="20" bgColor="#fff"></u-gap>
				<scroll-view scroll-y="true" style="height: 300px;">
					<view class="">
						<u--text type="info"   text="名称"></u--text>
						<u-input placeholder="输入名称" v-model="tool.title"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="描述"></u--text>
						<u-input placeholder="输入描述" v-model="tool.desc"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="输入框标题"></u--text>
						<u-input placeholder="输入框标题" v-model="tool.intitle"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="输入框描述"></u--text>
						<u-input placeholder="输入框描述" v-model="tool.indesc"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="输出框标题"></u--text>
						<u-input placeholder="输出框标题" v-model="tool.otitle"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="输出框描述/示例"></u--text>
						<u-textarea  maxlength="-1" height="100" :showConfirmBar="false" placeholder="输出框描述/示例" v-model="tool.odesc"></u-textarea>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="内置指令"></u--text>
						<u-textarea  maxlength="-1" height="50" :showConfirmBar="false" placeholder="例:写一篇小红书爆款文案" v-model="tool.action"></u-textarea>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="工具类型标识(数字)"></u--text>
						<u-input placeholder="工具类型标识" v-model="tool.type"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="图标链接"></u--text>
						<u-input placeholder="图标链接" v-model="tool.icon"></u-input>
						<u-gap height="10" bgColor="#fff"></u-gap>
						<u--text type="info"   text="状态(0正常/1停用)"></u--text>
						<u-input placeholder="输入状态" v-model="tool.status"></u-input>
						<u--text type="info"   text="排序"></u--text>
						<u-input placeholder="输入排序" v-model="tool.sort"></u-input>
					</view>
				</scroll-view>
				
				<u-gap height="20" bgColor="#fff"></u-gap>
				<u-button type="warning" @click="adminSaveWen()">{{type==1?'新增':'修改'}}文案工具</u-button>
				<u-toast ref="uToast"></u-toast>
			</view>
		</u-popup>
		<u-toast ref="cToast"></u-toast>
	</view>
</template>

<script>
	import {
		adminSaveWen,
		getAiTools
	} from '@/common/api'
	export default {
		data() {
			return {
				
				list: [],
				yname: "",
				tool: "",
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
			this.list = []
			this.getAiTools()
		},
		mounted() {
			this.getAiTools()
		},
		methods: {
			setlink(e) {
				let data = {
					wid: "",
					title: "",
					desc: "",
					intitle: "",
					indesc: "",
					otitle: "",
					odesc: "",
					type: "",
					status: "0",
					sort: "0",
					icon: "",
					action:""
				}
				this.jifenshow = true
				this.tool = data
				if (e) {
					this.tool = e
					this.type = 2

				} else {
					this.type = 1
				}
			},
			adminSaveWen() {
				
				if (this.$u.test.isEmpty(this.tool.title)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "名称不能为空",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.tool.desc)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "描述不能为空",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.tool.intitle)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "输入框标题",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.tool.indesc)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "输入框描述",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.tool.otitle)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "输出框标题",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.tool.odesc)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "输出框描述",
						duration: 2000
					})
					return
				} else if (this.$u.test.isEmpty(this.tool.type)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "类型不能为空",
						duration: 2000
					})
					return
				}
				let that = this
				uni.showLoading({
					mask: true,
					title: "操作中..."
				})
				adminSaveWen({
					atoken: uni.getStorageSync("atoken"),
					data: this.tool
				}).then(res => {
					if (res.code == 0) {
						that.jifenshow = false
						that.$refs.cToast.show({
							type: "success",
							message: res.msg,
							duration: 2000
						})
						that.getAiTools()
						
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
			getAiTools() {
				
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				getAiTools().then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.list=res.data
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
			margin-bottom: 15px;
			font-size: 15px;
			.tinfo{
				padding-left: 10px;
			}
			.time {
				padding-left: 10px;
				font-size: 12px;
				box-sizing: border-box;
				color: #97989c;
				font-weight: 500;
			}


		}
	}

.searchbtn {
	position: fixed;
			width: 50px;
			height: 50px;
			border-radius: 70px;
			right: 25px;
			bottom:80px;
			background: #FF5733;
			color: #fff;
			display: grid;
			place-items: center;
			font-size: 14px;
			box-shadow: 0 0 5px #FF5733;
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
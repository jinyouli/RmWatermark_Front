<template>
	<view class="page">
		<view class="vkey">
			<view class="title">
				欢迎回来~
			</view>
			<u-input class="ainput" placeholder="输入key" v-model="key"></u-input>
			<view class="qushuiyin" @click="login">
				验证
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		adminLogin
	} from '@/common/api'
	export default {
		data() {
			return {
				key: ""
			}
		},
		onShow() {
			if (!this.$u.test.isEmpty(uni.getStorageSync("atoken"))) {
				this.$refs.uToast.show({
					type: "success",
					message: "已登录",
					duration: 2000
				})
				this.$u.route({
					type: "redirect",
					url: "admin/pages/aindex"
				})
			}
		},
		methods: {
			login() {
				let that = this

				if (this.$u.test.isEmpty(this.key)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "请输入秘钥！",
						duration: 2000
					})
					return
				}

				uni.showLoading({
					mask: true,
					title: "登录中..."
				})
				adminLogin({
					key: this.key
				}).then(res => {
					console.log("登录信息", res)
					if (res.code == 0) {
						uni.setStorageSync("atoken", res.data)
						that.$refs.uToast.show({
							type: "success",
							message: res.msg,
							duration: 2000
						})
						that.$u.route({
							type: "redirect",
							url: 'admin/pages/aindex'
						})

					} else {
						that.$refs.uToast.show({
							type: "error",
							message: res.msg,
							duration: 2000
						})
					}
					uni.hideLoading()
				})

			},
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
		padding: 0 15px;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		display: grid;
		place-items: center;
	}

	.ainput {
		width: 100%;
		box-sizing: border-box;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
		color: #FF5733;
		padding-bottom: 25px;
	}

	.vkey {
		width: 100%;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
	}

	.qushuiyin {
		width: 100%;
		border-radius: 10px;
		height: 45px;
		color: #fff;
		background: #FF5733;
		text-align: center;
		line-height: 45px;
		cursor: pointer;
		margin-top: 20px;
	}
</style>
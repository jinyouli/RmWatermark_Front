<template>
	<!--
	作者：技术宅妞、哆哆、希速云
	QQ：522605223 
	-->
	<view class="page">
		<TabarTop img="/static/img/qsytop.png"></TabarTop>
		<u--image src="/static/img/explain.png" width="100%" height="auto" radius="15"
			@click="$u.route({type: 'to',url: 'view/pages/explain'})" mode="widthFix"></u--image>
		<u-gap :height="20" bgColor="#f7f8fa"></u-gap>
		<u-notice-bar :text="notice" speed="50" @click="noticeshow=true"></u-notice-bar>
		<view class="tips">
			<text class="ttxt">支持平台：某音、某手、某书等</text>
			<u--text @click="$u.route({type: 'to',url: 'view/pages/help'})" type="warning" bold align="right" size="14"
				text="常见问题"></u--text>
				<u-icon name="arrow-right" color="#f9ae3d"></u-icon>
		</view>
		<view class="urlinput">
			<u--textarea v-model="link" height="70" :showConfirmBar="false" placeholder="请复制平台上的链接到此文本框"
				:confirmType="'解析'"  maxlength="-1" border="none"></u--textarea>
		</view>
		<view class="btn">
			<view class="zhantie" @click="setlink">
				{{link?"清空":"粘贴"}}内容
			</view>
			<view class="qushuiyin" @click="jieXi()">
				免费去水印
			</view>
		</view>
		<adVideo aid="adunit-f0b2cc2c12b2829b"></adVideo>
		<u-toast ref="uToast"></u-toast>
		
		<u-popup :show="noticeshow" :round="10" :safeAreaInsetBottom="false" mode="center" width="80%"
			:customStyle="{'width':'85%'}" @close="noticeshow=false">
			<view>
				<view class="qtitle">
					去水印说明
				</view>
				<view class="qcont">
					本去水印工具仅提供技术服务的中立工具，提供的去水印功能仅帮助用户提取视频自行学习、观看、降低视频流量障碍，提升观赏体验。<br />
					请用户注意合法使用，若用户泛滥该功能实施侵权行为，用户应自行承担由此产生的法律责任，与本工具无关！
				</view>
				<view class="qbtn" @click="noticeshow=false">
					确定
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import TabarTop from '@/components/tabartop.vue'
	import adVideo from '@/components/advideo.vue'
	import {
		os
	} from "@/util/os"
	import {
		jieXi
	} from '@/common/api'
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()

	export default {
		components: {
			TabarTop,adVideo
		},
		data() {
			return {
				noticeshow: false,
				link: "",
				notice: "本工具仅提供学习测试使用，视频版权归平台及作者所有，本程序不存储任何内容。"
			}
		},
		onLoad() {
			ad.create()
		},
		onShow() {
			os()
			ad.show()
			uni.removeStorageSync("jiexi")
		},
		methods: {
			jieXi() {
				let that = this
				if (this.$u.test.isEmpty(this.link)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "请输入需要解析的链接！",
						duration: 3000
					})
					return
				}
				let url = this.getStrUrl(this.link)
				if (this.$u.test.isEmpty(url)) {
					this.$refs.uToast.show({
						type: "warning",
						message: "填写的内容未识别到链接，无法解析！",
						duration: 3000
					})
					this.link = ""
					return
				}
				uni.showLoading({
					mask: true,
					title: "解析中..."
				})
				jieXi({
					url: url
				}).then(res => {
					console.log("解析信息", res)
					uni.hideLoading()
					if (res.code == 0) {
						uni.setStorageSync("jiexi", res.data)
						if (res.data.type == 'img') {
							that.$u.route('view/pages/jximgs')
						} else {
							that.$u.route('view/pages/jxvideo')
						}
					} else {
						that.$refs.uToast.show({
							type: "error",
							message: res.msg,
							duration: 4000
						})
					}
				})

			},
			getStrUrl(s) {
				// var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
				var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
				s = s.match(reg);
				return (s && s.length ? s[0] : null);
			},
			setlink() {
				let that = this
				if (this.link) {
					this.link = ""
				} else {
					uni.getClipboardData({
						success: function(res) {
							that.link = res.data
							that.$refs.uToast.show({
								type: "success",
								message: "粘贴成功！",
								duration: 500
							})
						}
					});
				}

			}

		}
	}
</script>

<style lang="less">
	.qsytips {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.qtitle {
		font-size: 17px;
		font-weight: bold;
		color: #333;
		padding: 15px 20px;
	}

	.qcont {
		padding: 0 20px;
		font-size: 13px;
		color: #97989c;
		letter-spacing: .75px;
		line-height: 20px;
	}

	.qbtn {
		width: calc(100% - 40px);
		height: 40px;
		border-radius: 8px;
		color: #fff;
		background: #FF5733;
		line-height: 40px;
		text-align: center;
		font-weight: bold;
		margin: 15px auto;
		font-size: 14px;
	}

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
	}

	.tips {
		width: 100%;
		display: flex;
		font-size: 12px;
		color: #97989c;
		font-weight: 500;
		padding: 20px 0 10px;
		.ttxt{
			flex:1;
			white-space: nowrap;
		}
	}

	.urlinput {
		width: 100%;
		border-radius: 10px;
		background: #fff;
		padding: 5px;
		box-sizing: border-box;
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 20px 0 10px;
		font-weight: bold;
		font-size: 14px;

		.zhantie,
		.qushuiyin {
			flex: 1;
			margin-right: 5px;
			border-radius: 10px;
			height: 45px;
			color: #333;
			background: #fff;
			text-align: center;
			line-height: 45px;
			border: 1px solid #d7d8dd;
			cursor: pointer;
		}

		.qushuiyin {
			margin-left: 5px;
			margin-right: 0px;
			background: #FF5733;
			color: #fff;
			border: none;
		}
	}
</style>
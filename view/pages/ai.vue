<template>
	<view class="page">
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<adVideo></adVideo>
		<u-gap height="10" bgColor="#f7f8fa"></u-gap>
		<view class="toolhead">
			<view class="tlist">
				<view class="titem">
					<view class="tlogo">

						<u-image :src="toolinfo.icon?toolinfo.icon:'/static/img/logo.png'" radius="10px" width="100%"
							height="100%" mode="widthFix">
							<u-image slot="error" src="/static/img/logo.png" radius="10px" width="100%" height="100%"
								mode="widthFix"></u-image>
						</u-image>
					</view>
					<view class="tinfo">
						<u--text :lines="1" color="#333" margin="0 0 5px 0" bold :text="toolinfo.title"></u--text>
						<u--text :lines="1" size="12px" color="#97989c" :text="toolinfo.desc"></u--text>
					</view>
				</view>
			</view>
		</view>

		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="inputitem">
			<view class="ititle">
				<text>{{toolinfo.intitle}}</text>
				<view class="ibtn" @click="clipboard()">
					{{text?"清空内容":"粘贴内容"}}
				</view>

			</view>
			<u-gap height="10" bgColor="#f7f8fa"></u-gap>
			<u--textarea v-model="text" maxlength="-1" class="iinput" height="100" :showConfirmBar="false"
				:placeholder="toolinfo.indesc" border="none"></u--textarea>
		</view>
		<u-gap height="20" bgColor="#f7f8fa"></u-gap>

		<view class="sc" @click="getAiMsg()">
			立即生成
		</view>

		<u-gap height="20" bgColor="#f7f8fa"></u-gap>
		<view class="inputitem">
			<view class="ititle">
				<text style="flex:1;" v-if="answer">{{toolinfo.otitle}}</text>
				<text style="flex:1;" v-else>请看示例</text>
				<view v-if="answer" class="ibtn" @click="answer=''">
					查看示例
				</view>
				<view class="ibtn" v-if="answer" @click="copyText(answer)">
					复制内容
				</view>
				<view class="ibtn" v-if="answer==''" @click="text=toolinfo.odesc.split('<br>').join('');">
					使用示例
				</view>

			</view>
			<u-gap height="10" bgColor="#f7f8fa"></u-gap>
			<view class="htmlmark">
				<mpHtml :markdown="true" style="color: #666;letter-spacing: .75px;" :content="answer">
					<view class="tips" v-html="toolinfo.odesc"></view>
				</mpHtml>
			</view>
		</view>
		<u-gap height="40" bgColor="#f7f8fa"></u-gap>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	
	import mpHtml from '../components/mp-html/mp-html'
	import {
		os
	} from "@/util/os"
	import {
		getAiMsg
	} from '@/common/api'
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()

	export default {
		components: {
			mpHtml,
			adVideo
		},
		data() {
			return {
				toolinfo: "",
				text: "",
				answer: ""
			}
		},
		onLoad(e) {
			this.toolinfo = uni.getStorageSync("toolinfo")
			ad.create("adunit-7e8b36ee3693210f")
		},
		onShow() {
			os()
			ad.show()
		},
		methods: {

			// 粘贴/清空
			clipboard() {
				let that = this
				if (this.text) {
					this.text = ""
				} else {
					uni.getClipboardData({
						success: function(res) {
							that.text = res.data
							that.$refs.uToast.show({
								type: "success",
								message: "粘贴成功！",
								duration: 500
							})
						}
					});
				}

			},
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
			getAiMsg() {
				if(this.text==""){
					this.$refs.uToast.show({
						type: "error",
						message: "请输入内容",
						duration: 2000
					})
					return
				}

				uni.showLoading({
					mask: true,
					title: "创作中..."
				})
				let that=this
				getAiMsg({
					msg: this.text,
					type: this.toolinfo.type
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code == 0) {
						this.answer = res.data.cont
						
					}else{
						that.$refs.uToast.show({
							type: "error",
							message: res.msg,
							duration: 2000
						})
					}
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

	.tips {
		font-size: 14px;
		color: #888;
		letter-spacing: .75px;
	}

	.sc {
		background: #FF5733;
		color: #fff;
		display: grid;
		place-items: center;
		font-size: 14px;
		font-weight: bold;
		border-radius: 8px;
		height: 40px;
	}

	.inputitem {
		width: 100%;
		border-radius: 15px;

		.ititle {
			color: #FF5733;
			font-size: 15px;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.ibtn {
				color: #333;
				background: #fff;
				font-size: 12px;
				padding: 3px 8px;
				border: 1px solid #d7d8dd;
				border-radius: 5px;
				margin-left: 5px;
			}
		}

		.iinput,
		.htmlmark {
			background: #fff;
			border-radius: 15px !important;
			font-size: 14px;
			color: #666;
			padding: 10px 15px !important;
		}

		.htmlmark {
			min-height: 150px;
		}
	}

	.tlist {
		width: 100%;

		.titem {
			width: 100%;
			background: #fff;
			border-radius: 15px;
			padding: 15px 10px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tlogo {
				min-width: 40px;
				min-height: 40px;
				border-radius: 20px;
				border: 1px solid #f7f8fa;
			}

			.tinfo {
				flex: 1;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				text-align: right;
				padding-left: 10px;
			}

		}
	}
</style>
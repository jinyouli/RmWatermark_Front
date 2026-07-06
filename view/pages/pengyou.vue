<template>
	<view class="page">
		<view class="ptop">
			<button class="pitem" open-type="share">
				<u-icon size="30" color="#FF5733" name="weixin-fill"></u-icon>
				<view class="ptitle">
					分享好友
				</view>
			</button>
			<view class="pitem" @click="previewImage">
				<u-icon size="30" color="#FF5733" name="moments"></u-icon>
				<view class="ptitle">
					使用效果
				</view>
			</view>
		</view>
		<view class="textinp">
			<view class="urlinput">
				<u--textarea v-model="text" height="90" :showConfirmBar="false" placeholder="请复制文案到此文本框"
					:confirmType="'解析'" border="none"></u--textarea>
			</view>
		</view>
		<view class="btn">
			<view class="zhantie" @click="setText">
				{{text?"清空":"粘贴"}}内容
			</view>
			<view class="qushuiyin" @click="shuff()">
				一键优化文案
			</view>
			<view class="qushuiyin" @click="$u.route({'type':'tab','url':'pages/qsy'})">
				去水印工具
			</view>

		</view>
		<view class="textinp">
			<view class="qiandao">
				<text class="title">
					使用必看
				</text>
				<u-gap height="10" bgColor="#ffffff"></u-gap>
				<view class="slist">
					<view class="sitem">1、在输入框粘贴文案，点击一键优化后会自动复制，再去微信朋友圈长按粘贴，发布成功之后刷新朋友圈，如果显示异常，可以尝试重新转换。
					</view>
					<view class="sitem">2、转换一次只可粘贴发表一次;多次粘贴发表需要进行多次转换，否则仍有被折叠的可能。</view>
					<view class="sitem">3、含有较多的表情符号、空格回车等非中文字时可能会转换失败，建议重新修改文案。</view>
				</view>
			</view>
		</view>
		<view class="" style="width: 100%;padding: 15px;box-sizing: border-box;">
			<adVideo aid="adunit-9f774967ed9d870d"></adVideo>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	import {
		os
	} from "@/util/os"
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()

	export default {
		components: {
			adVideo
		},
		data() {
			return {
				text: "",
				xtext: ""
			}
		},
		onLoad(e) {
			uni.$u.mpShare = {
				title: '发朋友圈文案内容被折叠？小程序一键帮您解决！！！',
				path: 'view/pages/pengyou?ptoken=' + uni.getStorageSync('token'),
				imageUrl: '/static/img/pengyou.png'
			}
			ad.create("adunit-68489c749ef3cd68")
			if (e.ptoken) {
				uni.setStorageSync("ptoken", e.ptoken)
			}
		},
		onShow() {
			os()
			ad.show()
		},
		methods: {
			//预览图片
			previewImage() {
				uni.previewImage({
					urls: ["/static/img/pyq.jpg"]
				})
			},
			//复制内容
			copyText(text) {
				let that = this
				uni.setClipboardData({
					data: text,
					success: function(res) {
						that.$refs.uToast.show({
							type: "success",
							message: "复制成功,去朋友圈粘贴发布试试吧！",
							duration: 2000
						})
					},
					fail() {
						that.$refs.uToast.show({
							type: "error",
							message: "复制失败！",
							duration: 500
						})
					}
				});
			},
			setText() {
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
			shuff() {
				if (this.text.length < 10) {
					this.$refs.uToast.show({
						type: "error",
						message: "文案太短啦！",
						duration: 1000
					})
					return
				}
				let c = 3
				if (this.text.length > 20) {
					c = Math.round(this.text.length / 10 + 2)
				}

				this.copyText(this.shuffleText(this.text, c))
			},
			//随机交换相邻的两个字符位置
			shuffleText(text, ci) {

				const swapIndexes = [];
				let isInsideBracket = false;

				// 找到所有可交换位置的索引
				for (let i = 0; i < text.length - 1; i++) {
					if (text[i] === '[') {
						isInsideBracket = true;
					} else if (text[i] === ']') {
						isInsideBracket = false;
					}

					if (!isInsideBracket && text[i + 1] !== undefined) {
						if (text[i] != "]") {
							console.log("导入", text[i])
							swapIndexes.push(i);
						}
					}
				}
				const isSetIndex = []
				var uptext = text
				// 随机选择一个索引并交换相邻字符的位置
				console.log("随机数1", uptext)
				if (swapIndexes.length > 0) {
					for (let s = 0; s < ci; s++) {
						var iscf = true
						var randomIndex = Math.floor(Math.random() * swapIndexes.length);
						while (iscf) {
							if (isSetIndex.includes(randomIndex)) {
								randomIndex = Math.floor(Math.random() * swapIndexes.length);
								console.log("随机数", randomIndex)
							} else {
								isSetIndex.push(randomIndex)
								iscf = false
							}
						}

						const swapIndex = swapIndexes[randomIndex];

						//    const modifiedText = this.swapCharacters(text, swapIndex, swapIndex + 1);
						//    return modifiedText;

						const charArray = uptext.split('');
						[charArray[swapIndex], charArray[swapIndex + 1]] = [charArray[swapIndex + 1], charArray[
							swapIndex]];
						uptext = charArray.join('')
					}
					return uptext
				}

				return text
			},
			shuffleText2(text) {

				const swapIndexes = [];
				let isInsideBracket = false;

				// 找到所有可交换位置的索引
				for (let i = 0; i < text.length - 1; i++) {
					if (text[i] === '[') {
						isInsideBracket = true;
					} else if (text[i] === ']') {
						isInsideBracket = false;
					}

					if (!isInsideBracket && text[i + 1] !== undefined) {
						if (text[i] != "]") {
							console.log("导入", text[i])
							swapIndexes.push(i);
						}
					}
				}

				// 随机选择一个索引并交换相邻字符的位置
				if (swapIndexes.length > 0) {
					const randomIndex = Math.floor(Math.random() * swapIndexes.length);
					const swapIndex = swapIndexes[randomIndex];

					//    const modifiedText = this.swapCharacters(text, swapIndex, swapIndex + 1);
					//    return modifiedText;

					const charArray = text.split('');
					[charArray[swapIndex], charArray[swapIndex + 1]] = [charArray[swapIndex + 1], charArray[swapIndex]];
					return charArray.join('')
				}
				return text
			},
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
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
		font-weight: bold;
		font-size: 14px;
		padding: 0 15px;
		box-sizing: border-box;

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

	.textinp {
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;
	}

	.urlinput {
		width: 100%;
		border-radius: 10px;
		background: #fff;
		padding: 5px;
		box-sizing: border-box;
	}

	.ptop {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 15px;








		.pitem {
			flex: 1;
			display: flex !important;
			align-items: center !important;
			justify-content: center !important;
			background: #fff !important;
			color: #FF5733 !important;
			border: 1px solid #FF5733 !important;
			padding: 0px !important;
			box-sizing: border-box !important;
			border-radius: 10px !important;
			margin: 0 !important;

			.ptitle {
				font-size: 16px;
				font-weight: bold;
				padding-left: 10px;
			}
		}
	}

	page {
		height: 100%;
		width: 100%;
	}

	.page {
		background: #f7f8fa;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
	}

	.tlist {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 15px;

		.titem {
			flex: 1;


		}
	}
</style>
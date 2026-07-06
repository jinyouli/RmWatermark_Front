<template>
	<view>
		<view class="main-box u-flex u-row-center">
			<adVideo v-show="tools.is_empty(images)" ></adVideo>
			<canvas :style="{width:canvas.width+'px',height:canvas.height+'px'}" id="canvasBox" class=""
				type="2d"></canvas>
		</view>
		<!-- 底部控制区域 -->
		<view class="controller-box safe-area-inset-bottom">
			<view class="tab-box u-flex u-type-info u-type-info-light-bg">
				<view @click="openPopup" class="tab-inner u-p-t-16 u-p-l-30 u-p-r-20 u-text-center">
					<image src="../../static/changeImgIcon.png" class="change-img-icon"></image>
				</view>
				<block v-for="(tab,index) in tabList" :key="index">
					<view @click="tabIndex = index" class="tab-inner u-flex-1 u-m-t-10 u-p-t-20 u-p-b-20 u-text-center "
						:class="{'tab-inner-selected':tabIndex == index}">
						{{tab}}
					</view>
				</block>
				<view @click="previewImages" class="tab-inner u-p-t-16 u-p-l-20 u-p-r-30 u-text-center">
					<image src="../../static/download.png" class="down-img-icon"></image>
				</view>
			</view>

			<view v-if="tools.is_empty(images)" class="swiper-box u-flex u-row-center u-text-center">
				请先点击左上角的相机，选择一张图片
			</view>
			<swiper v-else class="swiper-box" :current="tabIndex" @change="swiperChange">
				<!-- start 文本 -->
				<swiper-item class="u-flex-col u-row-center">
					<view class="u-p-l-30 u-p-r-30">
						<view class="u-flex">
							<input class="ipt u-p-l-20 u-p-r-20 u-flex-1" style="height: 45px;border-radius: 5px;line-height: 45px;"
								type="text" v-model="setting.text"
								 maxlength="20"
								placeholder="点此输入水印文字" />
							<button type="default" style="height: 45px;border-radius: 5px;padding: 0 20px;background: #FF5733;line-height: 45px;" class="u-reset-button text-button u-hover-class"
								@click="setCanvas">确定</button>
						</view>
						<view class="u-flex u-p-t-30">
							<view class="u-font-24 u-p-l-10">
								文字大小
							</view>
							<view class="u-flex-1">
								<slider :value="setting.textFontSize" @change="sliderChange('textFontSize',$event)"
									min="8" max="28" step="2" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
						<view class="u-text-center u-tips-color u-font-24 u-p-t-20">点击确定，更新水印文字</view>
					</view>
				</swiper-item>
				<!-- end 文本 -->
				<!-- start 样式 -->
				<swiper-item class="u-flex-col u-row-center">
					<view class="u-p-l-30 u-p-r-30">
						<view class="u-flex color-box u-p-b-30">
							<view class="u-border-right u-p-r-20 u-m-r-20 u-p-l-20">
								<view class="color-circle color-text u-text-center"
									:style="{backgroundColor:setting.textColor,}">A</view>
							</view>
							<view @click="settingChange('textColor',item.value)" v-for="(item,index) in colorList"
								:key="index" class="color-circle u-m-r-20" :style="{backgroundColor:item.value,}"
								hover-class="u-hover-class"></view>
							<view class="color-circle">
								<image class="color-image" src="../../static/color.png"></image>
							</view>
						</view>
						<view class="u-flex">
							<view class="u-font-24 u-p-l-20">
								文字透明度
							</view>
							<view class="u-flex-1">
								<slider :value="setting.textOpcity" @change="sliderChange('textOpcity',$event)"
									min="0.2" max="1" step="0.1" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>

					</view>

				</swiper-item>
				<!-- end 样式 -->
				<!-- start 背景 -->
				<swiper-item class="u-flex-col u-row-center">
					<view class="u-p-l-30 u-p-r-30">
						<view class="u-flex color-box u-p-b-30">
							<view class="u-border-right u-p-r-20 u-m-r-20 u-p-l-20">
								<view class="color-circle color-text u-text-center"
									:style="{backgroundColor:setting.maskColor,}"></view>
							</view>
							<view @click="settingChange('maskColor',item.value)" v-for="(item,index) in colorList"
								:key="index" class="color-circle u-m-r-20" :style="{backgroundColor:item.value,}"
								hover-class="u-hover-class"></view>
							<!-- <view class="color-circle">
								<image class="color-image" src="../../static/color.png"></image>
							</view> -->
						</view>
						<view class="u-flex">
							<view class="u-font-24 u-p-l-20">
								背景透明度
							</view>
							<view class="u-flex-1">
								<slider :value="setting.maskOpcity" @change="sliderChange('maskOpcity',$event)"
									min="0.2" max="1" step="0.1" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
						<view class="u-text-center u-tips-color u-font-24 u-p-t-20">如无需背景，请将背景透明度设为0</view>
					</view>
				</swiper-item>
				<!-- end 位置 -->
				<!-- start 倾斜 -->
				<swiper-item class="u-flex-col u-row-center">
					<view class="u-p-l-30 u-p-r-10">
						<view class="u-flex">
							<view class="u-font-24 u-p-l-10">
								横幅倾斜度
							</view>
							<view class="u-flex-1">
								<slider :value="setting.rotate" @change="sliderChange('rotate',$event)" min="-180"
									max="180" step="15" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
						<view class="u-text-center u-tips-color u-font-24 u-p-t-20">增加角度顺时针旋转，减少则反之</view>
					</view>
				</swiper-item>
				<!-- end 倾斜 -->
				<!-- start 密度 -->
				<swiper-item class="u-flex-col u-row-center">
					<view class="u-p-l-30 u-p-r-10">
						<view class="u-flex">
							<view class="u-font-24 u-p-l-10">
								距离顶部(%)
							</view>
							<view class="u-flex-1">
								<slider :value="setting.positionY" @change="sliderChange('positionY',$event)" min="0"
									max="100" step="10" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
						<view class="u-flex">
							<view class="u-font-24 u-p-l-10">
								距离左边(%)
							</view>
							<view class="u-flex-1">
								<slider :value="setting.positionX" @change="sliderChange('positionX',$event)" min="0"
									max="100" step="10" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
						<view class="u-text-center u-tips-color u-font-24 u-p-t-20">以横幅中心距离图片顶部和左边百分比为基准</view>
					</view>
				</swiper-item>
				<!-- end 密度 -->

			</swiper>
		</view>
		<!-- end 底部控制区域 -->

		<choose-image ref="chooseImagePopup" @emitfunc="chooseImage($event)"></choose-image>
	</view>
</template>

<script>
	import adVideo from '@/components/advideo.vue'
	import canvasFunc from "../../utils/canvas.js"
	import chooseImage from "../../components/choose-image/choose-image.vue"
	let canvas = null; // 创建一个 canvas ，用来保存实例
	import {
		os
	} from "@/util/os"
	
	import {
		chaPing
	} from '@/common/ad'
	let ad = new chaPing()
	export default {
		components: {
			chooseImage,
			adVideo
		},
		data() {
			return {
				images: [], // 存储图片的
				currentImgeIndex: 0, // 当前图片 索引
				currentImgeInfo: { // 当前图片 的宽高
					width: 0,
					hight: 0,
				},
				canvas: {
					height: 0,
					width: 0
				}, //canvas的宽高
				setting: {
					text: '',
					textColor: '#ffffff',
					textFontSize: 16,
					textOpcity: 0.6,
					maskColor: '#fa3534',
					maskOpcity: 0.9,
					rotate: -45,
					positionX: 50,
					positionY: 50,
				},
				iptFocus: false,
				words: '', //——仅供网络验证使用，复印无效——
				tabList: ['文本', '样式', '背景', '倾斜', '位置'],
				colorList: [{
						name: 'black',
						value: '#000000'
					},
					{
						name: 'grey',
						value: '#606266'
					},
					{
						name: 'grey-light',
						value: '#c0c4cc'
					},
					{
						name: 'white',
						value: '#ffffff'
					},
					{
						name: 'red',
						value: '#fa3534'
					},
					{
						name: 'yellow',
						value: '#ff9900'
					},
					{
						name: 'blue',
						value: '#2979ff'
					},
					{
						name: 'green',
						value: '#19be6b'
					},
				],
				tabIndex: 0,
				tmmImg: '',
			};

		},
		onLoad() {
			this.openPopup()
			ad.create()
		},
		
		onShow() {
			os()
			ad.show()
		},
		methods: {
			openPopup() {
				this.$refs.chooseImagePopup.open()
			},
			settingChange(key, value) {
				if (this.setting[key] != value) {
					this.setting[key] = value
					this.setCanvas()
				}
			},
			sliderChange(key, e) {
				let value = e.detail.value;
				this.settingChange(key, value);
			},
			async setImageInfo() {
				let path = this.images[this.currentImgeIndex].path
				let imgInfo = await canvasFunc.getImageInfo(path, 1400)
				this.currentImgeInfo = imgInfo
				this.setCanvas()
			},
			async setCanvas() {
				uni.showLoading({
					mask: true
				})
				let sysInfo = uni.getSystemInfoSync(); // 获取系统参数：可使用窗口宽度 windowWidth px
				// 获取 图片 实际高度 px (缩放过的)
				let imgWidth = this.currentImgeInfo.width
				let imgHeight = this.currentImgeInfo.height
				// 图片显示高度
				let canvasWidth = sysInfo.windowWidth
				let canvasHeight = imgHeight * canvasWidth / imgWidth;
				let scaleNum = 1;
				if (imgWidth > 375) {
					// 基于屏幕 把文字、间距进行放大
					scaleNum = Math.round(imgWidth / canvasWidth)
				}
				this.canvas = { // 这里是显示尺寸
					width: canvasWidth,
					height: canvasHeight,
				}

				let setting = this.tools.deepClone(this.setting); // 所有的参数
				setting.text = this.tools.is_empty(setting.text) ? "——仅供网络使用——" : setting.text;

				const query = wx.createSelectorQuery()
				query.select("#canvasBox").fields({
					node: true,
					size: true,
				}).exec(async (res) => {
					canvas = res[0].node
					canvas.width = imgWidth // 设置canvas的实际尺寸 用的是图片的尺寸
					canvas.height = imgHeight

					const canvasCtx = canvas.getContext('2d')
					const image = canvas.createImage()
					// 等待图片加载
					await new Promise(resolve => {
						image.onload = resolve
						image.src = this.images[this.currentImgeIndex].path // 要加载的图片 url
					})

					canvasCtx.drawImage(image, 0, 0, imgWidth, imgHeight)
					// 先确定 文字参数
					canvasCtx.font = setting.textFontSize * scaleNum + 'px bold';
					const fontWidth = canvasCtx.measureText(setting.text).width; //获取文本宽度

					// 确定绘制的中心点
					let centerPositionX = imgWidth * setting.positionX / 100;
					let centerPositionY = imgHeight * setting.positionY / 100;

					canvasCtx.translate(centerPositionX, centerPositionY) // 设置当前绘制的起始点

					let rotate = setting.rotate
					canvasCtx.rotate(rotate * Math.PI / 180)

					// 绘制背景： 根据中心点来画的
					if (setting.maskOpcity > 0) {
						let maskWidth = fontWidth + (2 * setting.textFontSize); // 两边各留一个字的高度
						let maskHeight = setting.textFontSize * 2 * scaleNum;
						canvasCtx.globalAlpha = setting.maskOpcity;
						canvasCtx.fillStyle = setting.maskColor;
						canvasCtx.fillRect(-maskWidth / 2, -maskHeight / 2, maskWidth, maskHeight)
					}

					// 输入文本 
					canvasCtx.globalAlpha = setting.textOpcity; // 首先改变透明度
					canvasCtx.fillStyle = setting
						.textColor; // 坑 1 setFillStyle 停止维护了 2， 不再是 方法 而是参数 3 也支持rgba 
					canvasCtx.textAlign = "center"; // 设置文本基线 为中线
					canvasCtx.fillText(setting.text, 0, setting.textFontSize * scaleNum /
						4) // y轴baseline是文字的底部

				})
				uni.hideLoading()
			},
			chooseImage(data) { // 注意这里是回调的结果哦
				let that = this
				if (!this.tools.is_empty(data)) {
					this.images = data
					this.setImageInfo()
				}
			},
			previewImages() {
				let that = this;
				wx.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: that.canvas.width,
					height: that.canvas.height,
					destWidth: that.currentImgeInfo.width,
					destHeight: that.currentImgeInfo.height,
					canvas: canvas,
					success(res) {
						wx.previewImage({
							urls: [res.tempFilePath]
						})
						that.tools.toast('长按即可下载、转发')
					}
				})
			},
			swiperChange(event) {
				this.tabIndex = event.detail.current;
			},
		},


	}
</script>

<style lang="scss">
	$controller-box-height: 400rpx;

	page {
		background-color: #f7f8fa;
	}

	.popup-box {
		border-radius: 20rpx 20rpx 0 0;
		background-color: #ffffff;
	}

	.main-box {
		width: 100vw;
		overflow: hidden;
		z-index: 60;
		padding-bottom: $controller-box-height + 40rpx;
		min-height: calc(100vh - #{$controller-box-height} - 40rpx);
		background: #f7f8fa;

		.main-image {
			width: 100%;
		}
	}

	.controller-box {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #ffffff;
		border-radius: 20rpx 20rpx 0 0;
		overflow: hidden;
		z-index: 90;

		.tab-box-inner {
			height: 40rpx;
			line-height: 40rpx;
		}

		.tab-inner-selected {
			color: $u-main-color;
			background-color: #ffffff;
			border-radius: 20rpx 20rpx 0 0;
		}

		.change-img-icon {
			width: 49rpx;
			height: 42rpx;
		}

		.down-img-icon {
			width: 42rpx;
			height: 42rpx;
		}

		.swiper-box {
			width: 100%;
			height: 310rpx;

			.color-box {
				.color-circle {
					border: 1rpx solid $u-border-color;
					height: 42rpx;
					width: 42rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.color-text {
					font-weight: bold;
					color: #ffffff;
					text-shadow: #000 1rpx 0 0, #000 0 1rpx 0, #000 -1rpx 0 0, #000 0 -1rpx 0;
				}

				.color-image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}

		.ipt {
			height: 48rpx;
			line-height: 48rpx;
			border: 1rpx solid $u-border-color;
			border-right: 0;
			border-radius: 4rpx 0 0 4rpx;
		}

		.text-button {
			height: 74rpx;
			line-height: 68rpx;
			border-radius: 0 4rpx 4rpx 0;
			border: 1rpx solid $u-border-color;
			padding: 0 20rpx;
			background-color: $u-success;
			color: #ffffff;
		}

		.ipt-focus {
			border-color: $u-success;
		}
	}
</style>
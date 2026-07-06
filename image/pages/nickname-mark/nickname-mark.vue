<template>
	<view>

		<view class="main-box u-flex u-row-center">
			<adVideo v-show="tools.is_empty(images)" ></adVideo>
			<canvas :style="{width:canvas.width+'px',height:canvas.height+'px'}" id="canvasBox" type="2d"></canvas>
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
					<!-- <view v-if="tools.is_empty(setting.text)" class="u-p-l-30 u-p-r-30">
						<button type="primary" @click="getUserProfile">获取昵称/头像</button>
					</view> -->
					<view class="u-p-l-30 u-p-r-30">
						<view class="u-flex">
							<input class="ipt u-p-l-20 u-p-r-20 u-flex-1" style="height: 45px;border-radius: 5px;line-height: 45px;"
								type="text" v-model="setting.text"
								 maxlength="20"
								placeholder="点此修改昵称" />
							<button type="default" style="height: 45px;border-radius: 5px;padding: 0 20px;background: #FF5733;line-height: 45px;" class="u-reset-button text-button u-hover-class"
								@click="setCanvas">确定</button>
						</view>
						<view class="u-row-center u-tips-color u-font-24 u-p-t-20 u-flex">
							点击确定，更新水印。
							<!-- <button class="u-reset-button nickname-btn" @click="getUserProfile">重新获取昵称/头像</button> -->
						</view>
					</view>
				</swiper-item>
				<!-- end 文本 -->
				<!-- start 透明 -->
				<swiper-item class="u-flex-col u-row-center">
					<view class="u-p-l-30 u-p-r-30">
						<view class="u-flex">
							<view class="u-font-24 u-p-l-20">
								整体透明度
							</view>
							<view class="u-flex-1">
								<slider :value="setting.opcity" @change="sliderChange('opcity',$event)"
									min="0.3" max="1" step="0.1" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
						<view class="u-flex u-p-t-30">
							<view class="u-font-24 u-p-l-10">
								水印大小
							</view>
							<view class="u-flex-1">
								<slider :value="setting.textFontSize" @change="sliderChange('textFontSize',$event)"
									min="8" max="48" step="2" show-value block-size="18" activeColor="#303133" />
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- end 透明 -->
				<!-- start 位置 -->
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
				<!-- end 位置 -->

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
		components:{
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
					opcity: 0.8,
					positionX: 50,
					positionY: 50,
					avatarUrl:'../../static/avatar.jpg',
				},
				words: '', //——仅供网络验证使用，复印无效——
				tabList: ['昵称', '样式', '位置'],
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
			this.openPopup();
			// this.setImageInfo(); // 根据图片 设定拖动区域的宽
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
				let imgInfo = await canvasFunc.getImageInfo(path,1400)
				this.currentImgeInfo = imgInfo
				if(imgInfo){
					this.setCanvas()
				}
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
				if(imgWidth > 375){
					// 基于屏幕 把文字、间距进行放大
					scaleNum = Math.round(imgWidth / canvasWidth)
				}
				this.canvas = { // 这里是显示尺寸
					width: canvasWidth,
					height: canvasHeight,
				}

				let setting = this.tools.deepClone(this.setting); // 所有的参数
				setting.text = this.tools.is_empty(setting.text) ? "隐私水印" : setting.text;

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
					uni.hideLoading();
					
					canvasCtx.drawImage(image, 0, 0, imgWidth, imgHeight)

					// 先确定 文字参数
					canvasCtx.font = setting.textFontSize * scaleNum + 'px bold';
					const fontWidth = canvasCtx.measureText(setting.text).width; //获取文本宽度
					var avatarurl_width = setting.textFontSize * 1.2 * scaleNum; //绘制的头像宽度
					var avatarurl_height = setting.textFontSize * 1.2 * scaleNum; //绘制的头像高度
					
					// 确定绘制的中心点 （x轴向右便宜 头像宽度的位置 ）
					let centerPositionX = imgWidth * setting.positionX / 100;
					let centerPositionY = imgHeight * setting.positionY / 100;
					 // 设置文字当前绘制的起始点
					canvasCtx.translate(centerPositionX, centerPositionY)
					// 注意：canvasCtx.translate 就是绘图的原点，0,0 位置
					// 改变透明度
					canvasCtx.globalAlpha = setting.opcity;
					
					// 输入文本
					canvasCtx.fillStyle = setting.textColor;  // 坑 1 setFillStyle 停止维护了 2， 不再是 方法 而是参数 3 也支持rgba 
					canvasCtx.shadowColor = '#2f2f2f'
					canvasCtx.shadowOffsetX = 1;
					canvasCtx.shadowOffsetY = 1;
					canvasCtx.textAlign = "center"; // 设置文本基线 为中线
					canvasCtx.fillText(setting.text, avatarurl_width / 2, setting.textFontSize * scaleNum / 4) // y轴baseline是文字的底部
					
					var avatarurl_x = - (fontWidth + avatarurl_height + setting.textFontSize * scaleNum ) / 2; //绘制的头像在画布上的位置
					var avatarurl_y = - (avatarurl_height / 2); //绘制的头像在画布上的位置
					// 头像
					const avatar = canvas.createImage()
					await new Promise(resolve => {
						avatar.onload = resolve
						avatar.src = this.setting.avatarUrl // 要加载的图片 url
					})
					
					canvasCtx.save();
					// 调整头像绘制的原点
					canvasCtx.beginPath(); //开始绘制
					//先画个圆 前两个参数确定了圆心 （x,y） 坐标 第三个参数是圆的半径 四参数是绘图方向 默认是false，即顺时针
					canvasCtx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_height/2  + avatarurl_y, avatarurl_width / 2, 0, Math.PI *2, false);
					canvasCtx.closePath()
					canvasCtx.clip(); //画好了圆 剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
					canvasCtx.drawImage(avatar, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_height)
					canvasCtx.restore();
					uni.hideLoading();
				})
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
			// getUserProfile(e){
			// // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			// 	// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			// 	wx.getUserProfile({
			// 	  desc: '用于生成水印', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			// 	  success: (res) => {
			// 		this.setting.text = res.userInfo.nickName
			// 		this.setting.avatarUrl = res.userInfo.avatarUrl
			// 		this.setCanvas()
			// 	  }
			// 	})
			// },
		},


	}
</script>

<style lang="scss">
	$controller-box-height:400rpx;

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
		
		.nickname-btn{
			margin: 0;
			color: $u-primary;
			text-decoration:underline;
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

		
	}
</style>

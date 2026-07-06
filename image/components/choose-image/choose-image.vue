<template>
	<view class="popup-box safe-area-inset-bottom">
		<u-picker :show="pop" :columns="columns" keyName="label" @confirm="confirm" @cancel="pop=false"></u-picker>
	</view>
</template>

<script>
	export default {
		name: "choose-image",
		props: {
			emitFunc: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				pop: false,
				columns: [
					[{
						label: '从手机相册选择',
						// 其他属性值
						val: "album"
						// ...
					}, {
						label: '从聊天记录选择',
						// 其他属性值
						val: "chat"
						// ...
					}, {
						label: '打开相机拍摄',
						// 其他属性值
						val: "camera"
						// ...
					}, ]
				]
			};
		},
		methods: {
			confirm(e) {
				let val = e.value[0].val
				if (val == "chat") {
					this.chooseMessageImage()
				} else {
					this.chooseImage(val)
				}

			},
			open() {
				this.pop = true
			},
			close() {
				this.pop = false
			},
			chooseImage(type) {
				let that = this
				uni.chooseImage({
					count: 1,
					sourceType: [type], //从相册选择
					sizeType: ['original'],
					success: function(res) {
						// 选择，或者拍照成功
						that.$emit('emitfunc', res.tempFiles);
						that.close()
					},
					fail: function(err) {
						console.log(err)
						if (err.errMsg == "chooseImage:fail cancel") {
							// 处理 取消的情况
							return
						}
						uni.showModal({
							title: "没有相关权限",
							content: "请在设置中打开“使用手机相册”“使用相机”的权限",
							confirmText: "打开设置",
							success: function(res) {
								if (res.confirm) {
									uni.openSetting()
								}
							},
						})
					}
				});
			},
			chooseMessageImage() {
				let that = this
				wx.chooseMessageFile({
					count: 1,
					type: 'image',
					success(res) {
						that.$emit('emitfunc', res.tempFiles);
						that.close()
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.popup-box {
		border-radius: 20rpx 20rpx 0 0;
		background-color: #ffffff;
	}

	.quxiao {
		width: 80%;
		height: 45px;
		background: #ccc;
		display: grid;
		place-items: center;
		color: #333;
		border-radius: 8px;
	}
</style>
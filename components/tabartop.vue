<template>
	<view style="width: 100%;">
		<view class="tabar" :style="{'min-height':stickyHeight+'px',position:page==1?'fixed':'relative'}">
			<view class="statusbar" :style="{height:statusHeight+'px'}"></view>
			<view class="navbar" :style="{height:page==1?navHeight+'px':navHeight-15+'px'}">
				<u--image v-if="page==1" :showLoading="true" :src="img" width="130px" height="20px"
					mode="aspectFit"></u--image>
			</view>
			<slot></slot>
		</view>
		<u-gap :height="page==1?stickyHeight+gap:gap" bgColor="#f7f8fa"></u-gap>
	</view>
	
</template>

<script>
	export default {
		name: "tabartop",
		props:{
			img:{
				type:String,
				default:""
			},
			page:{
				type:String,
				default:"1"
			},
			gap:{
				type:Number,
				default:15
			}
		},
		data() {
			return {
				statusHeight: 0,
				navHeight: 0,
				stickyHeight: 85,
				type:this.page
			};
		},
		mounted() {
			this.tabarHeight()
		},
		methods: {
			tabarHeight() {
				// 状态栏高度
				this.statusHeight = uni.getSystemInfoSync().statusBarHeight;

				// 导航栏信息
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				// 导航栏高度--导航栏高度默认44
				this.navHeight = menuButtonInfo.height + (menuButtonInfo.top - this.statusHeight) * 2;

				// 状态栏高度+导航栏高度
				this.stickyHeight = this.statusHeight + this.navHeight;
				console.log(this.statusHeight + "-" + this.navHeight + "-" + this.stickyHeight)
			}
		}
	}
</script>

<style lang="less">
	.tabar {
		width: 100%;
		background: linear-gradient(to top, #FF5733, #ff8447);
		top: 0;
		left: 0;
		z-index: 99;

		.navbar {
			display: flex;
			align-items: center;
			padding-left: 10px;
		}
	}
</style>
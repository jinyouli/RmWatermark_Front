module.exports = {
    onLoad() {
        // 设置默认的转发参数
        uni.$u.mpShare = {
			title: '免费、多平台去水印、拿文案',// 默认为小程序名称
			path: '/pages/index?ptoken=' + uni.getStorageSync('token'),// 默认为当前页面路径
			imageUrl: '/static/img/share.png'// 默认为当前页面的截图
      
        }
		
    },
    onShareAppMessage() {
        return uni.$u.mpShare
    },
	// #ifdef MP-WEIXIN
	onShareTimeline() {
		return uni.$u.mpShare
	}
	// #endif
	
}

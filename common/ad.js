class chaPing {
	constructor() {
		this.interstitialAd = null
	}
	create() {
		let openad = uni.getStorageSync("openad")
		let cpid = uni.getStorageSync("chapinid")
		if (openad == 0 && cpid != "") {
			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				this.interstitialAd = wx.createInterstitialAd({
					adUnitId: cpid
				})
				this.interstitialAd.onLoad(() => {})
				this.interstitialAd.onError((err) => {
					console.error('插屏广告加载失败', err)
				})
				this.interstitialAd.onClose(() => {})
			}
		}

	}
	show() {
		let openad = uni.getStorageSync("openad")
		if (openad == 0) {
			// 在适合的场景显示插屏广告
			if (this.interstitialAd) {
				this.interstitialAd.show().catch((err) => {
					console.error('插屏广告显示失败', err)
				})
			} else {
				console.error('插屏广告显示失败', this.interstitialAd)
			}
		}

	}

}

export {
	chaPing
}
import {
	baseUrl
} from './config'

class XcxFun {
	constructor() {
		this.getToken = baseUrl + 'getToken';
		this.verifyLogin = baseUrl + 'verifyLogin';
		this.appid = uni.getAccountInfoSync().miniProgram.appId;
	}
	getaccestoken(code, appid) {
		let that = this
		uni.showLoading({
			title: '登录中...',
			mask:true
		});
		uni.request({
			url: that.getToken,
			method: 'POST',
			data: {
				code: code,
				appid: appid
			},
			success: function(res) {
				console.log("小程序获取token", res)
				uni.hideLoading()
				if(res.data.code==0){
					uni.setStorageSync('token', res.data.data.token); //放入缓存
				}else{
					uni.showToast({
						title: res.data.msg,
						duration: 5000
					});
				}
			}
		});

	}

	verify_login() {

		let that = this
		uni.checkSession({
			success: function(res) {
				let token = uni.getStorageSync("token")
				if (token) {
					uni.showLoading({
						title: '验证登录中...',
						mask:true
					});
					uni.request({
						url: that.verifyLogin + "?token=" + token,
						method: 'GET',
						success: function(t) {
							uni.hideLoading()
							console.log("验证令牌", t)
							if (t.data.code != 0) {
								uni.removeStorageSync('token')
								that.login()
							}
						},
						fail: function(err) {
							console.log("验证token是失败2", err)
							uni.removeStorageSync('token')
							that.login()
						}
					});
				} else {
					that.login()
				}
			},
			fail: function(fail) {
				console.log("登录状态失败1", fail)
				//登录失效  重新登录
				that.login()

			}
		})
	}
	login() {
		var that = this
		uni.login({
			provider: "weixin",
			success: (res) => {
				that.getaccestoken(res.code, that.appid)
			},
			fail: (err) => {
				console.error('授权登录失败：' + JSON.stringify(err));
			}
		});


	}

	async getUserProfile() {

		let that = this
		var wxUser = ""
		uni.checkSession({
			success: function(res) {

			},
			fail: function(fail) {
				console.log("登录状态失败", fail)
				//登录失效  重新登录
				that.verify_login(function() {
					Vue.prototype.$isResolve()
				}, false)
				return

			}
		})


		wxUser = await uni.getUserProfile({
			provider: 'weixin',
			desc: "用于完善会员资料"
		}).then(res => {
			console.log(res)
			that.userinfo = res[1].userInfo
			return res
		})


		return wxUser


	}

}
export {
	XcxFun
};
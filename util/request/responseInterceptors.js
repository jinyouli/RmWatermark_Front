/**
 * 响应拦截
 * @param {Object} http 
 */
import { XcxFun } from "../../common/xcxfun"
let xcx = new XcxFun()
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data
      
		if(data.code==2){
			xcx.verify_login()
		}
		if(data.code==3){
			uni.removeStorageSync("atoken")
			uni.navigateTo({
				url: 'admin/pages/alogin'
			});
		}
        return data || {}
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
        return Promise.reject(response)
    })
}
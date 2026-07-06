const {
	http
} = uni.$u
// 解析
export const jieXi = (params, config = {}) => http.post('/jieXi', params, config)
//激励
export const jiLi = (params, config = {}) => http.post('/jiLi', params, config)
//签到邀请积分
export const claimPoints = (params, config = {}) => http.post('/claimPoints', params, config)
//获取积分列表
export const getJiFenList = (params) => http.get('/getJiFenList', {params:params})
//获取邀请列表
export const getYaoQingList = (params) => http.get('/getYaoQingList', {params:params})
//获取用户信息
export const getUserInfo = (params) => http.get('/getUserInfo', {params:params})
// 获取解析列表
export const getJieXiList = (params) => http.get('/getJieXiList', {params:params})
// 获取签到和邀请信息
export const getQY = (params) => http.get('/getQY', {params:params})
// 获取友情小程序
export const getLinkApp = (params) => http.get('/getLinkApp', {params:params})
// 更新友情小程序点击量
export const setLinkAppNum = (params) => http.get('/setLinkAppNum', {params:params})
// 记录非合法域名
export const remberUlr = (params) => http.get('/remberUlr', {params:params})
// 获取AI返回消息
export const getAiMsg = (params, config = {}) => http.post('/getAiMsg', params, config)
// 获取AI工具列表
export const getAiTools = (params) => http.get('/getAiTools', {params:params})
// 获取配置信息
export const getConfig = (params) => http.get('/getConfig', {params:params})


// 管理员获取所有列表
export const adminGetList = (params) => http.get('/adminGetList', {params:params})
// 管理员设置用户积分
export const adminSetFen = (params) => http.get('/adminSetFen', {params:params})
// 管理员新增修改友情小程序
export const adminSaveLink = (params) => http.get('/adminSaveLink', {params:params})
// 管理员新增修改文案工具
export const adminSaveWen = (params) => http.get('/adminSaveWen', {params:params})
// 管理员修改配置
export const adminSaveConfig = (params) => http.get('/adminSaveConfig', {params:params})


//管理员登录
export const adminLogin = (params, config = {}) => http.post('/adminLogin', params, config)
// 管理员退出
export const adminLogOut = (params) => http.get('/adminLogOut', {params:params})
// 管理员获取统计
export const adminGetTongJi = (params) => http.get('/adminGetTongJi', {params:params})






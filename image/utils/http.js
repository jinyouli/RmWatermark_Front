let isRelease = true
 isRelease = false  // 发行版本 只需要注释这句话

let env = 'release-0gw7ka2u844c480b'
if (isRelease) env = 'release-0gw7ka2u844c480b' // 发行后的环境，方便切换版本

wx.cloud.init({
	env
})
const db = wx.cloud.database()
const _ = db.command
let collection = name => db.collection(name)
let errHandle = err => {
	uni.hideLoading()
	uni.showModal({
		title: `网络请求错误`,
		content: '请稍后再试',
		showCancel: false,
		success(res) {
			console.error(err)
			uni.hideLoading()
			if (res.confirm) {
				
			} else if (res.cancel) {
				
			}
		}
	})
} 

let cloudhttp = {
	/**
	 * 增
	 */
	async add(collectionName, data = {}) {
		if (arguments.length < 2) {
			console.error('参数数量不足')
			return
		}
		let result = null
		await collection(collectionName).add({
			// data 字段表示需新增的 JSON 数据
			data,
		}).then(res => {
			result = res
		}).catch(errHandle)
		return result
	},
	/**
	 * 删, 只支持单个删除, 多个删除需要云函数处理
	 */
	async remove(collectionName, docID) {
		if (arguments.length < 2) {
			console.error('参数数量不足')
			return
		}
		let result = null
		await collection(collectionName).doc(docID).remove()
			.then(res => result = res)
			.catch(errHandle)
		return result
	},
	/**
	 * 改, 理解顺序: 找到collection, 指定id, 然后更新数据(先找到再更新), 局部更新
	 * @param {string} docID 单个更新指定_id
	 * @param {boolean} isSet 是否替换, 与update不同在于, set是把指定的替换了, 而不是更新. 这里用来专门处理更新某个数据, 而不是更新其内部, 更新内部使用_.set
	 * @remind 多更新需要通过云函数处理, 这里无法操作
	 */
	async update(collectionName, docID = '', data = {}, isSet) {
		if (arguments.length < 3) {
			console.error('参数数量不足')
			return
		}
		let result = null
		if (isSet) {
			await collection(collectionName).doc(docID).set({
					data
				})
				.then(res => result = res)
				.catch(errHandle)
		} else {
			await collection(collectionName).doc(docID).update({
					data
				})
				.then(res => result = res)
				.catch(errHandle)
		}
		return result
	},
	/**
	 * 查, 一次最多只有100条
	 * @param {object} whereData 多个查询的条件对象
	 * @param {string} docID 单个查询传入_id
	 * 注意 orderBy 的写法 是 字符串 如 orderBy = " 'description','desc' "
	 */
	async get(collectionName, docID, rules = {}) {
		if (arguments.length < 1) {
			console.error('参数数量不足')
			return
		}

		//let whereData = rules.whereData || {} 
		let whereData = rules.whereData || {
			_id: _.exists(true)
		}
		let filedData = rules.filedData || {}
		let skip = rules.skip || 0
		let limit = rules.limit || 10
		let orderBy = rules.orderBy || '_id'
		let orderRule = rules.order || 'desc'
		let result = null

		if (docID) {
			// 单条记录
			await collection(collectionName).doc(docID).get()
				.then(res => result = res)
				.catch(errHandle)
		} else {
			await collection(collectionName)
				.where(whereData)
				.field(filedData)
				.skip(skip)
				.limit(limit)
				.orderBy(orderBy ,orderRule)
				.get()
				.then(res => result = res)
				.catch(errHandle)
		}
		return result
	},
	async count(collectionName, rules = {}) {
		if (arguments.length < 1) {
			console.error('参数数量不足')
			return
		}
		//let whereData = rules.whereData || {} 
		let whereData = rules.whereData || {
			_id: _.exists(true)
		}

		let result = await collection(collectionName)
			.where(whereData)
			.count()
			.catch(errHandle)

		return result
	},

	/**
	 * 调用云函数
	 * params
	 * 	name 调用的云函数名称
	 * 	data 传参，选填
	 * 	url  用于 tcbRouter 的 参数，用tcbRouter的时候必填
	 */
	async callFunction(name, data = {}, url = "") {
		if (arguments.length < 1) {
			console.error('参数数量不足')
			return
		}
		if (url != "") {
			data.$url = url
		}
		let result = null
		await wx.cloud.callFunction({
				name,
				data
			}).then(res => result = res)
			.catch(errHandle)

		return result
	},

}

export default {
	install(Vue) {
		Object.keys(cloudhttp).forEach(key => {
			let func = cloudhttp[key]
			Vue.prototype['$' + key] = func
		})
		// command提供查找相关gl, gle, eq, neq, lt, lte, in, nin, and, or, 具体用法忘记可以查看: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/query.html
		// command提供更新相关set, remove, inc, mul, push, pop, shift, unshift, 具体用法忘记可以查看: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/update.html
		Vue.prototype.$_ = db.command
	}
}

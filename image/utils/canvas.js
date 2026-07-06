function in_array(value, arr) {
	for (let key in arr) {
		if (arr[key] == value) return true
	}
	return false
}

/**
 * 获取图片信息
 */
async function getImageInfo(path,maxWidth) {
	
	let  [err,imgInfo] = await uni.getImageInfo({src: path})
	if(err){
		uni.showModal({
			title:"获取图片信息失败",
			content:"请重新进入页面，重新选择图片"
		})
		return
	}
	
	// 这里需要注意下 uni 对 promise的封装 不一样 ，uni封装后 会返回 一个数组，分别返回错误信息和 实际应该返回的信息
	
	let originWidth = imgInfo.width
	let originHeight = imgInfo.height
	
	if (in_array(imgInfo.orientation, ["left", "left-mirrored", "right", "right-mirrored"]))
	{
		// 旋转的图片,交换一下宽高
		originWidth = imgInfo.height
		originHeight = imgInfo.width
	}
	
	let imgWidth = originWidth
	let imgHeight = originHeight
	
	if(imgWidth > maxWidth){
		imgWidth = maxWidth;
		imgHeight = (maxWidth / originWidth) * imgHeight;
	}
	return {
		width:imgWidth,
		height:imgHeight,
	}
}


module.exports = {
	getImageInfo
}
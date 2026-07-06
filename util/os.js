// 作者：技术宅妞、哆哆、希速云
// QQ：522605223 

const os = () => {
	let platform = uni.getStorageSync("platform")
	let ispc = uni.getStorageSync("ispc")
	console.log("平台", platform)
	if (platform == "windows" || platform == "macos") {
		if (ispc != 0) {
			uni.reLaunch({
				url: "/os/pages/os"
			})
		}

	}
}
export {
	os
}
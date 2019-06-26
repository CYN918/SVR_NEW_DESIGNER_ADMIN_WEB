import eventEmitter from '@/views/workManager/eventEmitter.js'
// 图片下载对象
let downloadedImg = null
// 待下载文件名
let fileName = null

// 监听是否获取图片地址
eventEmitter.addListener('getHref', href => {
  imatateDownloadByA(href, fileName)
})

/**
 * base64下载图片（可跨域）
 * @param {*} img
 * @param {String} filename 文件名
 */
  

/**
 * 开始下载图片之前
 * @param {String} imgUrl
 * @param {Function} callback
 */
function startDownloadImg (imgUrl, callback) {
  let imageURL = imgUrl
  downloadedImg = new Image()
  downloadedImg.crossOrigin = 'Anonymous'
  downloadedImg.src = imageURL
  downloadedImg.addEventListener('load', callback, false)
}

/**
 * 获取图片下载base64字符串
 * @param {DOMimg} domimg
 */
function getImgDataUrl () {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const width = downloadedImg.width || downloadedImg.naturalWidth
  const height = downloadedImg.height || downloadedImg.naturalHeight
  const imgSrc = downloadedImg.src
  let type = imgSrc.substring(imgSrc.lastIndexOf('.') + 1)
  let dtype = type === 'jpg' ? 'jpeg' : 'png'
  canvas.width = width
  canvas.height = height
  context.drawImage(downloadedImg, 0, 0)
  eventEmitter.emit('getHref', canvas.toDataURL(`image/${dtype}`))
}

/**
 * 通过a标签模拟下载
 * @param {String} href
 * @param {String} filename
 */
function imatateDownloadByA (href, filename) {
  const a = document.createElement('a')
  a.download = filename
  a.style.display = 'none'
  a.href = href
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(href)
}

var downloadImg = function (imgUrl, filename) {
  fileName = filename
  startDownloadImg(imgUrl, getImgDataUrl)
}
export default downloadImg
import * as qiniu from 'qiniu-js'
export function upload(params) {
  return new Promise((resolve, reject) => {
    const { file, key, token, putExtra, compress } = params
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2
    }
    // console.log(file, key, token, putExtra, compress)
    const observable = qiniu.upload(file, key, token, putExtra, config)
    // observer: observer 为一个 object，用来设置上传过程的监听函数，有三个属性 next、error、complete:
    const observer = {
      next(res) {
      // ...
      },
      error(err) {
        console.log(err)
        reject(err)
      },
      complete(res) {
        resolve(res)
      }
    }
    // 压缩
    if (compress) {
      const options = {
        quality: 0.92,
        noCompressIfLarger: true
      // maxWidth: 1000,
      // maxHeight: 618
      }
      qiniu.compressImage(file, options).then(data => {
        const observable = qiniu.upload(data.dist, key, token, putExtra, config)
        observable.subscribe(observer) // 上传开始
      })
    } else {
      observable.subscribe(observer) // 上传开始
    }
    // subscription.unsubscribe() // 上传取消
  })
}

export function getUploadUrl(config, token) {
  return qiniu.getUploadUrl(config, token)
}

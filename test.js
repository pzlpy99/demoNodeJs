const QiniuManager = require('./src/utils/QiniuManager')
const accessKey = 'P0cdSDr8bT3JxKrCZ2VaOvty7lZCAaiz2S2xSUak';
const secretKey = 'XgB9FHPlEkJo0RulWRt0nPuhR4T7pvnKUEwdP1ky';
const path = require('path')
const localFile = "/Users/peizhi/Face_Core/src/go.megvii-inc.com/securitycore/D2S.py";
const key = 'fir.md';
const downloadPath = path.join(__dirname, key)
const manager = new QiniuManager(accessKey, secretKey, 'ceshi99');
manager.uploadFile(key, localFile).then((data) => {
  console.log('上传成功', data)
  // return manager.deleteFile(key)
}).then((data) => {
  console.log('删除成功')
})
// manager.deleteFile(key);
// var publicBucketDomain = 'http://q2ydtvhez.bkt.clouddn.com';
// manager.generateDownloadLink(key).then((data) => {
//   console.log(data)
//   return manager.generateDownloadLink('first.md')
// }).then(data => {
//   console.log(data)
// })

// manager.downloadFile(key, downloadPath).then(() => {
//   console.log('下载成功')
// }).catch(err => {
//   console.error(err)
// })
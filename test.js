const QiniuManager = require('./src/utils/QiniuManager')
const accessKey = 'P0cdSDr8bT3JxKrCZ2VaOvty7lZCAaiz2S2xSUak';
const secretKey = 'XgB9FHPlEkJo0RulWRt0nPuhR4T7pvnKUEwdP1ky';
var localFile = "/Users/peizhi/Face_Core/src/go.megvii-inc.com/securitycore/D2S.py";
var key = 'D2S.py';

const manager = new QiniuManager(accessKey, secretKey, 'ceshi99');
// manager.uploadFile(key, localFile).then((data) => {
//   console.log('上传成功', data)
//   return manager.deleteFile(key)
// }).then((data) => {
//   console.log('删除成功')
// })
// manager.deleteFile(key);
// var publicBucketDomain = 'http://q2ydtvhez.bkt.clouddn.com';
manager.generateDownloadLink(key).then((data) => {
  console.log(data)
  return manager.generateDownloadLink('first.md')
}).then(data => {
  console.log(data)
})
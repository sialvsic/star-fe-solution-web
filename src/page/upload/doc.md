# 文件上传的原理

## 客户端

1. 选择上传的文件
2. 计算要分为多少片 （指定片数，根据每片的大小，计算片数）
3. 计算文件的md5值
4. 校验文件的md5值
5. 检查并分片上传
6. 通知服务端合并文件


## 服务端
1. 
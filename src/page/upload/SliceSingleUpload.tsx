import { message } from 'antd';
import React, { useState } from 'react';
import {
  checkAndUploadChunk,
  checkFileMD5,
  md5File,
  merge,
  setChunks,
} from '@/utils';

function SliceSingleUpload() {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const onFileUpload = (e: React.BaseSyntheticEvent) => {
    const file = e.target.files[0];
    console.log(file);

    if (!file) {
      return;
    }

    if (file.type.indexOf('image') === -1) {
      //校验文件类型
      message.info('只能选择图片格式');
      return false;
    }

    if (file.size / 1000 > 1024) {
      alert('文件不能大于1024KB！');
      return false;
    }

    upload(file);
  };

  const upload = async (file: File) => {
    //获取当前文件
    let fileSize = file.size;
    let chunkSize = 2 * 1024 * 1024; //2MB
    // let chunkSize = 20 * 1024; //20KB
    let chunks = 1; //初始为1
    const fileName = file.name;

    //0. 计算分为多少片
    chunks = setChunks(fileSize, chunkSize);
    console.log('chunks', chunks);

    //1.计算文件的md5值
    const md5Value = await md5File(file, chunks, chunkSize);

    console.log('md5Value', md5Value);

    //2. 校验文件的MD5值
    const result = await checkFileMD5(fileName, md5Value);
    console.log('md5 result', result);
    if (result.success && result.isFile) {
      console.log('文件已存在');
      return;
    }

    const md5FileList = result.list;

    //3. 检查并上传
    const success = await checkAndUploadChunk(md5Value, md5FileList, {
      fileSize,
      chunkSize,
      file,
      chunks,
    });

    if (success) {
      //4. 通知服务器上传已完成
      await merge(md5Value, fileName);
      return;
    }

    message.error(`file upload failed.`);
  };

  return (
    <>
      <div>
        <label htmlFor="">请选择文件</label>
        <input type="file" name="file" multiple onChange={onFileUpload} />
      </div>
      <div>
        <label htmlFor="">当前进度: {progress}%</label>
        <a href={url} target="_blank">
          文件地址: {url}
        </a>
      </div>
    </>
  );
}

export default SliceSingleUpload;

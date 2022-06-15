import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import env from '@/config';
const action = `${env.API_ROOT}/file/upload`; //普通上传

function FileUpload() {
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
    let formData = new FormData();
    formData.append('file', file);
    let result = await axios({
      url: action,
      method: 'post',
      data: formData,
      onUploadProgress: function (progressEvent) {
        console.log('progressEvent', progressEvent);

        const p = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );

        setProgress(p);
        console.log('上传进度', p);
      },
    });
    const { data } = result;
    if (data.ret == 0) {
      setUrl(data?.data?.url || '');
    } else {
      alert('上传失败！');
    }
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

export default FileUpload;

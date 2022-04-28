import { useEffect, useState } from 'react';
import { Upload, message, Switch, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Table from '@/components/Table';
import env from '@/config';
import styles from './View.module.less';

import { fetchOssList } from '@/api/index';

const { Dragger } = Upload;

const action = `${env.API_ROOT}/file/upload`; //普通上传
const actionStream = `${env.API_ROOT}/file/uploadStream`; //流式上传

type OssFile = {
  name: string;
  url: string;
  lastModified: string;
  size: string;
};

// TODO:
/*
1. 添加预览
2. 添加列表
*/

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/*
文件上传
*/
export default function View() {
  console.log('action', action);

  const [isSteam, setIsSteam] = useState(false);

  const [list, setList] = useState<OssFile[]>([]);

  const fetchList = async () => {
    const result = await fetchOssList();
    console.log(result);
    const data = result.data;
    setList(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const props = {
    name: 'file',
    multiple: true,
    action: isSteam ? actionStream : action,
    onChange(info: any) {
      console.log('info', info);

      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        fetchList();
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onPreview(e: any) {
      console.log('eeeee', e);
    },
  };

  const handlePreview = async (file: any) => {
    console.log('file', file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle:
    //     file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });
  };

  const onChange = (checked: boolean) => {
    setIsSteam(checked);
  };

  const dataSource = list.map((item, key) => {
    return {
      key: key,
      name: item.name,
      lastModified: item.lastModified,
      url: item.url,
      size: item.size,
    };
  });

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上传时间',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '链接',
      width: 200,
      copyable: true,
      dataIndex: 'url',
      key: 'url',
    },
  ];

  return (
    <div>
      <h1>文件上传</h1>
      <div className={styles.box}>
        <Row>
          <Col span={24}>设置</Col>
        </Row>
        <Row>
          <Col span={2}>流式上传</Col>
          <Col span={22}>
            <Switch checked={isSteam} onChange={onChange} />
          </Col>
        </Row>
      </div>
      <Dragger {...props} multiple>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <div className={styles.split}></div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

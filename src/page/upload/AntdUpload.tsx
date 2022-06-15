import { useEffect, useState } from 'react';
import { Col, message, Row, Switch, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Table from '@/components/Table';
import styles from './AntdUpload.module.less';
import env from '@/config';

import { fetchOssList } from '@/api/index';

const { Dragger } = Upload;

type OssFile = {
  name: string;
  url: string;
  lastModified: string;
  size: string;
};

const action = `${env.API_ROOT}/file/upload`; //普通上传
const actionStream = `${env.API_ROOT}/file/uploadStream`; //流式上传

export default function AntdUpload() {
  const [isSteam, setIsSteam] = useState(false);
  const [list, setList] = useState<OssFile[]>([]);

  const fetchList = async () => {
    const result = await fetchOssList();
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

      const { status, response } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        if (response.success) {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else {
          message.error(`${info.file.name} file uploaded failed.`);
        }

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
    <>
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
      <div className={styles.upload}>
        <Dragger {...props} multiple>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>

      <div className={styles.split} />
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

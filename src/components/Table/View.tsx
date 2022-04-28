import { Col, message, Row, Tooltip } from 'antd';
import { divide } from 'lodash';
import React, { ReactElement } from 'react';
import { Helmet, Link } from 'umi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface DataSource {
  name: string;
  lastModified: string;
  url: string;
  size: string;
}
interface Columns {
  title: string;
  dataIndex: string;
  key: string;
}

interface Props {
  dataSource: DataSource[];
  columns: Columns[];
}

function Table(props: Props) {
  const { dataSource, columns } = props;

  const renderTitle = (lists: Columns[]) => {
    return (
      <Row className={styles.row}>
        {lists.map((item: Columns, index) => {
          return (
            <Col span={4} key={index}>
              <div className={styles.item}>{item.title}</div>
            </Col>
          );
        })}
      </Row>
    );
  };

  const onCopy = () => {
    message.info('复制成功');
  };

  return (
    <>
      {dataSource.map((data, index) => {
        return (
          <div className={styles.table} key={index}>
            {index === 0 && renderTitle(columns)}
            <Row className={styles.row}>
              <Col span={4}>
                <div className={styles.item}>{data.name}</div>
              </Col>
              <Col span={4}>
                <div className={styles.item}>{data.lastModified}</div>
              </Col>
              <Col span={4}>
                <div className={styles.item}>{data.size}</div>
              </Col>
              <Col span={12}>
                <div className={styles.item}>
                  <a className={styles.url} href={data.url} target="_blank">
                    {decodeURIComponent(data.url)}
                  </a>
                  <CopyToClipboard
                    text={decodeURIComponent(data.url)}
                    onCopy={() => onCopy()}
                  >
                    <Tooltip title="复制" placement="bottom">
                      <CopyOutlined className={styles.copy} />
                    </Tooltip>
                  </CopyToClipboard>
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default Table;

import { Tabs } from 'antd';
import Server from './server';
import Oss from './oss';

const { TabPane } = Tabs;

/*
文件下载需求：

1. 跨域文件可下载
2. 更改文件名
3. 可以重新下载，可断点下载
4. 用户有感知行为，非后台下载

下载来源：
1. oss文件
2. 服务器上资源下载
*/

export default function View() {
  return (
    <div>
      <h1>文件下载的多种方式</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="服务器资源下载" key="1">
          <Server />
        </TabPane>
        <TabPane tab="OSS资源下载" key="2">
          <Oss />
        </TabPane>
      </Tabs>
    </div>
  );
}

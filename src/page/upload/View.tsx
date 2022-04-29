import { Tabs } from 'antd';
import AntdUpload from './AntdUpload';
import FileUpload from './FileUpload';
import SliceUpload from './SliceUpload';
const { TabPane } = Tabs;

/*
文件上传
*/
export default function View() {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <h1>文件上传</h1>
      <Tabs onChange={callback} type="card" defaultActiveKey="2">
        <TabPane tab="antd 组件" key="1">
          <AntdUpload />
        </TabPane>
        <TabPane tab="普通文件上传-js实现" key="2">
          <FileUpload />
        </TabPane>
        <TabPane tab="分片上传-js实现" key="3">
          <SliceUpload />
        </TabPane>
      </Tabs>
    </div>
  );
}

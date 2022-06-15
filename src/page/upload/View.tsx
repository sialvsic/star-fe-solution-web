import { Tabs } from 'antd';
import AntdUpload from './AntdUpload';
import FileUpload from './FileUpload';
import SliceSingleUpload from './SliceSingleUpload';
import SliceMultipleUpload from './SliceMultipleUpload';
const { TabPane } = Tabs;

/*
文件上传需求：
*/
export default function View() {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <>
      <h1>文件上传</h1>
      <Tabs onChange={callback} type="card" defaultActiveKey="1">
        <TabPane tab="antd 组件" key="1">
          <AntdUpload />
        </TabPane>
        <TabPane tab="普通文件上传-js实现" key="2">
          <FileUpload />
        </TabPane>
        <TabPane tab="单文件分片上传-js实现" key="3">
          <SliceSingleUpload />
        </TabPane>
        <TabPane tab="多文件上传-js实现" key="4">
          <SliceMultipleUpload />
        </TabPane>
      </Tabs>
    </>
  );
}

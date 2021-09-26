import Block from '@/components/Block';

import { Tabs } from 'antd';
import { FILETYPE } from './interface';
import {
  action,
  ALinkArray,
  BlobArray,
  formArray,
  getDownloadFilePath,
  IFrameArray,
  windowArray,
  windowLocationArray,
} from './utils';

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
  const onFormSubmit = () => {
    // 创建表单
    let form = document.createElement('form');
    form.method = 'get';
    form.action = getDownloadFilePath();
    form.target = '_blank'; // form新开页面
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const fileTypes = Object.values(FILETYPE);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="服务器资源下载" key="1">
        <div>
          <h1>文件下载的多种方式</h1>
          <Block>
            <>
              <p>方式一，表单提交（form 动态表单）</p>
              <button className="btn" onClick={onFormSubmit}>
                表单提交 txt
              </button>
            </>
          </Block>

          <Block>
            <>
              <p>方式二，表单提交 (form 静态表单)</p>
              {formArray(action, fileTypes)}
            </>
          </Block>

          <Block>
            <>
              <p>方式三，window.open 或 window.location.href</p>
              <div className="block">{windowArray(fileTypes)}</div>
              <div className="block">{windowLocationArray(fileTypes)}</div>
            </>
          </Block>

          <Block>
            <>
              <p>方式四，a 标签 download 属性</p>
              <div className="block">{ALinkArray(fileTypes)}</div>
            </>
          </Block>
          <Block>
            <>
              <p>方式五，使用blog对象</p>
              <div className="block">{BlobArray(fileTypes)}</div>
            </>
          </Block>
          <Block>
            <>
              <p>方式六，使用iframe</p>
              <div className="block">{IFrameArray(fileTypes)}</div>
            </>
          </Block>
        </div>
      </TabPane>
      <TabPane tab="OSS资源下载" key="2">
        Content of Tab Pane 222
      </TabPane>
    </Tabs>
  );
}

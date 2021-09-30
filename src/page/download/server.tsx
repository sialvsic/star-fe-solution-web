import { getDownloadFileURL } from '@/api';
import Block from '@/components/Block';
import { FILETYPE } from './constant';
import {
  ALinkArray,
  BlobArray,
  formArray,
  IFrameArray,
  windowArray,
  windowLocationArray,
} from './utils';

export default function server() {
  const onFormSubmit = () => {
    // 创建表单
    let form = document.createElement('form');
    form.method = 'get';
    form.action = getDownloadFileURL(FILETYPE.TXT);
    form.target = '_blank'; // form新开页面
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const fileTypes = Object.values(FILETYPE);

  return (
    <>
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
          {formArray(fileTypes)}
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
          <p>方式六，使用iframe - 推荐</p>
          <div className="block">{IFrameArray(fileTypes)}</div>
        </>
      </Block>
    </>
  );
}

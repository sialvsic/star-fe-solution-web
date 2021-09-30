import { getDownloadOSSPath } from '@/api';
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

export default function oss() {
  const onFormSubmit = () => {
    // 创建表单
    let form = document.createElement('form');
    form.method = 'get';
    form.action = getDownloadOSSPath(FILETYPE.TXT);
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
          {formArray(fileTypes, true)}
        </>
      </Block>

      <Block>
        <>
          <p>方式三，window.open 或 window.location.href</p>
          <Block>
            <>
              <span>新 tab打开</span>
              <div className="block">{windowArray(fileTypes, true)}</div>
            </>
          </Block>
          <Block>
            <>
              <span>当前 tab打开</span>
              <div className="block">
                {windowLocationArray(fileTypes, true)}
              </div>
            </>
          </Block>
        </>
      </Block>

      <Block>
        <>
          <p>
            <del>方式四，a 标签 download 属性</del>
          </p>
          <span>运行时决定，不适合OSS</span>
          <div className="block">{ALinkArray(fileTypes, true)}</div>
        </>
      </Block>
      <Block>
        <>
          <p>
            <del>方式五，使用blog对象</del>
          </p>
          <span>运行时决定，不适合OSS</span>
          <div className="block">{BlobArray(fileTypes, true)}</div>
        </>
      </Block>
      <Block>
        <>
          <p>方式六，使用iframe - 推荐</p>
          <span>当前页面打开</span>
          <div className="block">{IFrameArray(fileTypes, true)}</div>
        </>
      </Block>
    </>
  );
}

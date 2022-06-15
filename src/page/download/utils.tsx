import {
  getDownloadFileURL,
  getDownloadOSSFileURL,
  getDownloadOSSPath,
} from '@/api';
import Item from 'antd/lib/list/Item';
import { FILETYPE } from './constant';

export function formArray(array: FILETYPE[], oss?: boolean) {
  return array.map((item, index) => {
    return (
      <form
        action={
          oss
            ? getDownloadOSSPath(FILETYPE.TXT)
            : getDownloadFileURL(FILETYPE.TXT)
        }
        method="get"
        target="_blank"
        className="form"
        key={index}
      >
        <input type="hidden" name="type" value={item} />
        <button className="btn" type="submit">
          {`表单提交 ${item}`}
        </button>
      </form>
    );
  });
}

export function windowArray(array: FILETYPE[], oss?: boolean) {
  const onClick = async (item: FILETYPE) => {
    if (oss) {
      const url = await getDownloadOSSFileURL(item);
      window.open(url);
    } else {
      window.open(getDownloadFileURL(item));
    }
  };

  return array.map((item, index) => {
    return (
      <button
        key={index}
        className="btn"
        type="button"
        onClick={() => onClick(item)}
      >
        {`window.open ${item}`}
      </button>
    );
  });
}

export function windowLocationArray(array: FILETYPE[], oss?: boolean) {
  const onClick = async (item: FILETYPE) => {
    if (oss) {
      const url = await getDownloadOSSFileURL(item);
      window.location.href = url;
    } else {
      window.location.href = getDownloadFileURL(item);
    }
  };

  return array.map((item, index) => {
    return (
      <button
        key={index}
        className="btn"
        type="button"
        onClick={() => onClick(item)}
      >
        {`window.location.href ${item}`}
      </button>
    );
  });
}

export function ALinkArray(array: FILETYPE[], oss?: boolean) {
  if (oss) {
    return;
  }

  return array.map((item, index) => {
    return (
      <a
        key={index}
        href={getDownloadFileURL(item)}
        download
        target="_blank"
        className="href"
      >
        {`a 标签 ${item}`}
      </a>
    );
  });
}

export function BlobArray(array: FILETYPE[], oss?: boolean) {
  if (oss) {
    return;
  }

  return array.map((item, index) => {
    return (
      <button
        className="btn"
        onClick={() => downloadFileByBlob(item, 'newName')}
        key={index}
      >
        {`blog ${item}`}
      </button>
    );
  });
}

export function IFrameArray(array: FILETYPE[], oss?: boolean) {
  const onClick = (item: FILETYPE) => {
    if (oss) {
      downloadOSSFileByIframe(item);
    } else {
      downloadFileByIframe(item);
    }
  };

  return array.map((item, index) => {
    return (
      <button className="btn" onClick={() => onClick(item)} key={index}>
        {`iframe ${item}`}
      </button>
    );
  });
}

/*
这种方式存在的问题就是如果下载的文件特别大的时候，那么先需要下载到本地才进行改名，要花费很多时间
*/
function downloadFileByBlob(type: FILETYPE, name: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', getDownloadFileURL(type));
  xhr.responseType = 'blob';

  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
      // const url = URL.createObjectURL(blob);
      const url = URL.createObjectURL(this.response);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
}

function downloadFileByIframe(type: FILETYPE) {
  const link = document.createElement('iframe');
  link.src = getDownloadFileURL(type);
  link.setAttribute('style', 'display:none'); //or any other extension
  document.body.appendChild(link);
  link.click();
}

async function downloadOSSFileByIframe(type: FILETYPE) {
  console.log('downloadOSSFileByIframe');
  const url = await getDownloadOSSFileURL(type);
  console.log('url', url);
  const link = document.createElement('iframe');
  link.src = url;
  link.setAttribute('style', 'display:none'); //or any other extension
  document.body.appendChild(link);
  link.click();
}

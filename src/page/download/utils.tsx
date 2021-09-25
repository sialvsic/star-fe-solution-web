import { FILETYPE } from './interface';

export const action = 'http://dev.star.com:3001/api/file/download';

export function getDownloadFilePath(type: FILETYPE = FILETYPE.TXT) {
  return action + `?type=${type}`;
}

export function formArray(action: string, array: FILETYPE[]) {
  return array.map((item, index) => {
    return (
      <form
        action={action}
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

export function windowArray(array: FILETYPE[]) {
  return array.map((item, index) => {
    return (
      <button
        key={index}
        className="btn"
        type="button"
        onClick={() => {
          window.open(getDownloadFilePath(item));
        }}
      >
        {`window.open ${item}`}
      </button>
    );
  });
}

export function windowLocationArray(array: FILETYPE[]) {
  return array.map((item, index) => {
    return (
      <button
        key={index}
        className="btn"
        type="button"
        onClick={() => {
          window.location.href = getDownloadFilePath(item);
        }}
      >
        {`window.location.href ${item}`}
      </button>
    );
  });
}

export function ALinkArray(array: FILETYPE[]) {
  return array.map((item, index) => {
    return (
      <a
        key={index}
        href={getDownloadFilePath(item)}
        download
        target="_blank"
        className="href"
      >
        {`a 标签 ${item}`}
      </a>
    );
  });
}

export function BlobArray(array: FILETYPE[]) {
  return array.map((item, index) => {
    return (
      <button
        className="btn"
        onClick={() => downloadFileByA(item, 'newName')}
        key={index}
      >
        {`blog ${item}`}
      </button>
    );
  });
}

export function IFrameArray(array: FILETYPE[]) {
  return array.map((item, index) => {
    return (
      <button
        className="btn"
        onClick={() => downloadFileByIframe(item)}
        key={index}
      >
        {`iframe ${item}`}
      </button>
    );
  });
}

/*
这种方式存在的问题就是如果下载的文件特别大的时候，那么先需要下载到本地才进行改名，要花费很多时间
*/
function downloadFileByA(type: FILETYPE, name: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', getDownloadFilePath(type));
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
  link.src = getDownloadFilePath(type);
  link.setAttribute('style', 'display:none'); //or any other extension
  document.body.appendChild(link);
  link.click();
}

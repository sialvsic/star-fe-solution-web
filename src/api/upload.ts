import { request } from '@/utils';

type OssFile = {
  name: string;
  url: string;
  lastModified: string;
  size: string;
};

export function fetchOssList() {
  return request<Response<OssFile[]>>({
    url: '/file/list',
    method: 'get',
  });
}

export function uploadFile(formData: FormData) {
  return request<Response<string>>({
    url: '/file/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    data: formData,
  });
}

export function uploadChunkFile(formData: FormData) {
  return request<Response<string>>({
    url: '/file/upload/chunk',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    data: formData,
  });
}

interface CheckFileReturn {
  isFile: boolean;
  list: string[];
}

export function checkFile(fileName: string, md5: string) {
  return request<Response<CheckFileReturn>>({
    url: '/file/check',
    method: 'get',
    params: {
      name: fileName,
      md5,
    },
  });
}

export function mergeFile(md5: string, fileName: string) {
  return request<Response<CheckFileReturn>>({
    url: '/file/merge',
    method: 'post',
    data: {
      fileName: fileName,
      md5: md5,
    },
  });
}

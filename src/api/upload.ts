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

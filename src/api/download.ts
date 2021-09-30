import { request } from '@/utils';
import env from '@/config';

export function downloadOSSFile(type: FILETYPE) {
  return request<Response<string>>({
    url: '/file/oss/download',
    method: 'get',
    params: {
      type,
    },
  });
}

export function getDownloadFileURL(type: FILETYPE): string {
  return env.API_ROOT + '/file/download' + `?type=${type}`;
}

export function getDownloadOSSPath(type: FILETYPE): string {
  return env.API_ROOT + '/file/oss/download' + `?type=${type}`;
}

export async function getDownloadOSSFileURL(type: FILETYPE): Promise<string> {
  const result = await downloadOSSFile(type);
  return result.data;
}

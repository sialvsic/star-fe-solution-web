import axios from 'axios';
import { BusinessError } from '@/constants/error';
import env from '@/config';

/*
接口返回的格式：

{
  ret: 200,
  success: true,
  msg: "success",
  data: url,
}
*/

//10s
const prod_timeout = 10000;
const dev_timeout = 10000;

const interceptors = [
  function interceptorsHandler(response: any) {
    const { ret, success, msg } = response.data;

    // 没有 ret，但返回了数据，数据类型为字符串，也算请求成功（如请求 csv 文件数据）
    if (response.status === 200 && typeof response.data === 'string') {
      return response.data;
    }

    // 请求成功
    if (ret === 0 && success) {
      return response.data;
    }

    // 后端出错
    if (ret === -1) {
      return Promise.reject(response.data);
    }

    // 请求失败
    if (ret !== 0) {
      return Promise.reject({
        type: BusinessError,
        msg: msg,
        ret: ret,
        success: false,
      });
    }
  },
  function errorHandler(error: any) {
    // Do something with response error
    console.log('error', error);

    return Promise.reject(error);
  },
];

export default function request<T>({
  url,
  method,
  withCredentials = true,
  headers,
  domain,
  ...rest
}: RequestType): Promise<any> {
  if (!domain) {
    domain = env.API_ROOT;
  }

  const reqUrl = `${domain}${url}`;
  const axiosInstance = axios.create({
    timeout: env.devEnv ? dev_timeout : prod_timeout,
  });

  axiosInstance.interceptors.response.use(...interceptors);

  return axiosInstance.request<any, T>({
    url: reqUrl,
    method,
    withCredentials,
    headers,
    ...rest,
  });
}

export function requestWithoutInterceptors<T>({
  url,
  method,
  withPrefix = true, //是否使用默认的域名
  withCredentials = true,
  domain = '',
  ...rest
}: RequestWithoutInterceptors): Promise<any> {
  if (!domain) {
    domain = env.API_ROOT;
  }

  let reqUrl = `${domain}${url}`;

  if (!withPrefix) {
    reqUrl = url;
  }

  const axiosInstance = axios.create({
    timeout: env.devEnv ? dev_timeout : prod_timeout,
  });

  axiosInstance.interceptors.response.use(
    ...[
      function successHandler(response: any) {
        return response.data;
      },
      function errorHandler(error: any) {
        console.log('error', error);

        // Do something with response error
        return Promise.reject(error);
      },
    ],
  );

  return axiosInstance.request<any, T>({
    url: reqUrl,
    method,
    withCredentials,
    ...rest,
  });
}

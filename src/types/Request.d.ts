type Method = 'get' | 'post' | 'delete' | 'put' | 'patch';

declare interface RequestType {
  url: string;
  method: Method;
  dataType?: string;
  withCredentials?: boolean;
  params?: any;
  headers?: any;
  data?: any;
  rest?: any;
  domain?: string;
  transformRequest?: (data: any) => string;
}

declare interface RequestWithoutInterceptors {
  url: string;
  method: Method;
  withPrefix?: boolean;
  withCredentials?: boolean;
  domain?: string;
  headers?: any;
}

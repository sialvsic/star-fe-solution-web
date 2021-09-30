/**
 * 调用 api 返回的数据 interface
 */
declare interface Response<P = Record<string, any>> {
  /**
   * 后端返回的状态码
   * 0 表示操作成功，其他状态码表示操作失败
   */
  ret: number;

  /**
   * 信息
   */
  msg: string;

  /**
   * 数据
   */
  data: P;

  /**
   * 是否成功
   */
  success?: boolean;
}

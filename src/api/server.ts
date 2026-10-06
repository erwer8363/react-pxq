import axios, { AxiosRequestConfig } from 'axios';
import envconfig from '@/envconfig/envconfig';

/**
 * 请求基类，返回已解析的 JSON 数据
 * @param method 请求方法
 * @param url 请求地址，配合 baseURL 组成完整地址
 * @param params axios 配置项，会覆盖默认配置
 * 默认：超时 30s，携带 cookies，状态码 200-300 视为成功
 */
export default class Server {
  async axios<T = unknown>(method: string, url: string, params?: AxiosRequestConfig): Promise<T> {
    const option: AxiosRequestConfig = {
      method: method as AxiosRequestConfig['method'],
      url,
      baseURL: envconfig.baseURL,
      timeout: 30000,
      params: null,
      data: null,
      headers: null,
      withCredentials: true, // 是否携带 cookies 发起请求
      validateStatus: status => status >= 200 && status < 300,
      ...params,
    };
    try {
      const res = await axios.request(option);
      return (typeof res.data === 'object' ? res.data : JSON.parse(res.data)) as T;
    } catch (error) {
      // 有响应时抛出响应体，否则抛出原始错误
      const e = error as { response?: { data: unknown } };
      throw e.response ? e.response.data : error;
    }
  }
}

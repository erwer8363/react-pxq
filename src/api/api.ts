import Server from './server';
import type {
  ApiError,
  ApiResponse,
  Balance,
  Product,
  RecordType,
  SaleRecord,
  UploadImgResult,
} from '@/types';
import type { AxiosRequestConfig } from 'axios';

const UPLOAD_URL = '//elm.cangdu.org/v1/addimg/shop';

/** 业务接口外层：{ http_code: 200, data: {...} } */
type Wrapped<T> = ApiResponse<{ data: T }>;

class API extends Server {
  /** 构造统一的错误对象 */
  private fail(tip: string, response: unknown, data: unknown, url: string): ApiError {
    return { tip, response, data, url };
  }

  /**
   * 上传图片
   * @url https://elm.cangdu.org/v1/addimg/shop
   * 返回 status 为 1 表示成功
   */
  async uploadImg(params: AxiosRequestConfig = {}): Promise<UploadImgResult> {
    const result = await this.axios<UploadImgResult>('post', UPLOAD_URL, params);
    if (result && result.status === 1) {
      return result;
    }
    throw this.fail('上传图片失败', result, params, UPLOAD_URL);
  }

  /**
   * 获取记录数据
   * @url https://api.cangdu.org/shopro/data/record/:type
   * 返回 http_code 为 200 表示成功
   */
  async getRecord(params: { type: RecordType | string }): Promise<{ data: SaleRecord[] }> {
    const url = `/shopro/data/record/${params.type}`;
    const result = await this.axios<ApiResponse<{ data: SaleRecord[] }>>('get', url);
    if (result && result.data instanceof Object && result.http_code === 200) {
      return result.data;
    }
    throw this.fail('获取记录数据失败', result, params, url);
  }

  /**
   * 获取商品数据
   * @url https://api.cangdu.org/shopro/data/products
   */
  async getProduction(params: AxiosRequestConfig = {}): Promise<Product[]> {
    const url = '/shopro/data/products';
    const result = await this.axios<Wrapped<Product[]>>('get', url, params);
    if (result && result.data instanceof Object && result.http_code === 200) {
      return result.data.data || [];
    }
    throw this.fail('获取商品数据失败', result, params, url);
  }

  /**
   * 获取佣金数据
   * @url https://api.cangdu.org/shopro/data/balance
   */
  async getBalance(params: AxiosRequestConfig = {}): Promise<Balance> {
    const url = '/shopro/data/balance';
    const result = await this.axios<Wrapped<Balance>>('get', url, params);
    if (result && result.data instanceof Object && result.http_code === 200) {
      return result.data.data || { balance: 0 };
    }
    throw this.fail('获取佣金数据失败', result, params, url);
  }
}

export default new API();

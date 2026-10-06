/** 商品（接口返回的字段） */
export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  commission: number;
}

/** 前端本地选择状态，在 Product 基础上扩展 */
export interface SelectableProduct extends Product {
  selectStatus: boolean;
  selectNum: number;
}

/** 首页表单数据 */
export interface FormData {
  orderSum: string;
  name: string;
  phoneNo: string;
  imgpath: string;
}

/** 记录中的商品 */
export interface RecordProduct {
  product_id: number;
  product_name: string;
  quantity: string;
}

/** 记录类型，对应路由 /record/:type */
export type RecordType = 'passed' | 'audited' | 'failed';

/** 销售记录 */
export interface SaleRecord {
  sales_id: number;
  register_user_id: number;
  sales_money: number;
  customers_name: string;
  customers_phone: string;
  product: RecordProduct[];
  invoice: string;
  product_price: number;
  commission: number;
  is_closed: string;
  type: string;
  content: string | null;
  created_at: string;
  type_name: string;
}

/** 佣金余额 */
export interface Balance {
  balance: number;
  register_user_id?: number;
}

/** 上传图片返回 */
export interface UploadImgResult {
  status: number;
  image_path: string;
}

/** 接口统一外层结构 */
export interface ApiResponse<T> {
  http_code: number;
  data: T;
}

/** API 层抛出的错误 */
export interface ApiError {
  tip: string;
  response: unknown;
  data: unknown;
  url: string;
}

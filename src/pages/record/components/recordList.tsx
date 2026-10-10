import API from '@/api/api';
import './recordList.scss';
import {useRequest} from "ahooks";
import {SaleRecord} from "@/types";
import {useParams} from "react-router";

const RecordList = () =>{
  const {type = ''} = useParams()
  // type 变化时自动重新请求，并忽略过期请求的返回
  const {data} = useRequest(() => API.getRecord({type}), {
    refreshDeps: [type],
    onError: err => console.error(err),
  })
  const recordData: SaleRecord[] = data?.data ?? []

  return (
      <div>
        <ul className="record-list-con">
          {
            recordData.map((item) => {
              return <li className="record-item" key={item.sales_id}>
                <section className="record-item-header">
                  <span>创建时间：{item.created_at}</span>
                  <span>{item.type_name}</span>
                </section>
                <section className="record-item-content">
                  <p><span>用户名：</span>{item.customers_name} &emsp; {item.customers_phone}</p>
                  <p><span>商&emsp;品：</span>{item.product[0].product_name}</p>
                  <p><span>金&emsp;额：</span>{item.sales_money} &emsp; 佣金：{item.commission}</p>
                </section>
                <p className="record-item-footer">等待管理员审核，审核通过后，佣金将结算至账户</p>
              </li>
            })
          }
        </ul>
      </div>
  );
}
export default RecordList;
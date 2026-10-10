import API from '@/api/api';
import './recordList.scss';
import {useEffect, useState} from "react";
import {SaleRecord} from "@/types";
import {useParams} from "react-router";

const RecordList = () =>{
  const [recordData, setRecordData] = useState<SaleRecord[]>([])
  const {type = ''} = useParams()
  /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  const getRecord = async (type: string) => {
    try{
      const result = await API.getRecord({type});
      setRecordData(result.data || [])
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getRecord(type)
  },[type])

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
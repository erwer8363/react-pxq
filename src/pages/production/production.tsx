import React, {useEffect} from 'react';
import PublicHeader from '@/components/header/header';
import './production.scss';
import {useAtomValue, useSetAtom} from "jotai";
import {dataListAtom, editSelectProAtom, getProDataListAtom, togSelectProAtom} from "@/store/production";

const Production = () => {
    const dataList = useAtomValue(dataListAtom)
    const editPro = useSetAtom(editSelectProAtom)
    const togSelectPro = useSetAtom(togSelectProAtom)
    const fetchProData = useSetAtom(getProDataListAtom)

    useEffect(()=>{
        if(!dataList.length) fetchProData()
    },[fetchProData])

  /**
   * 添加或删减商品，交由redux进行数据处理，作为全局变量
   * @param  {int} index 编辑的商品索引
   * @param  {int} num   添加||删减的商品数量
   */
  const handleEdit = (index: number, num: number) => () => {
    editPro(index, num);
  }
  
  // 选择商品，交由jotai进行数据处理，作为全局变量
  const togSelect = (index: number) => () => {
    togSelectPro(index);
  }

  return (
      <main className="common-con-top">
        <PublicHeader title='选择商品' confirm />
        <section className="pro-list-con">
          <ul className="pro-list-ul">
            {
              dataList.map((item, index) => {
                return <li className="pro-item" key={item.product_id}>
                  <div className="pro-item-select" onClick={togSelect(index)}>
                    <span className={`icon-xuanze1 pro-select-status ${item.selectStatus? 'pro-selected': ''}`}></span>
                    <span className="pro-name">{item.product_name}</span>
                  </div>
                  <div className="pro-item-edit">
                    <span className={`icon-jian ${item.selectNum > 0? 'edit-active':''}`} onClick={handleEdit(index, -1)}></span>
                    <span className="pro-num">{item.selectNum}</span>
                    <span className={`icon-jia`} onClick={handleEdit(index, 1)}></span>
                  </div>
                </li>
              })
            }
          </ul>
        </section>
      </main>
  )
}
export default Production
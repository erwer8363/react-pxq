import React, { FC, useState} from 'react';
import API from '@/api/api';
import envconfig from '@/envconfig/envconfig';
import PublicHeader from '@/components/header/header';
import PublicAlert from '@/components/alert/alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import { padStr } from '@/utils/format';
import './home.scss';
import {useAtomValue, useSetAtom} from "jotai";
import {clearSelectedAtom, selectedProListAtom} from "@/atoms/production";
import {clearFormDataAtom, formDataAtom, saveFormDataAtom, saveImagePathAtom} from "@/atoms/home";
import {Link} from "react-router";

const Home: FC = () => {

  const clearData = useSetAtom(clearFormDataAtom)
  // 已选择的商品数据
  const selectedProList = useAtomValue(selectedProListAtom)

  const formData = useAtomValue(formDataAtom)
  const saveImgPath = useSetAtom(saveImagePathAtom)
  const saveFormData = useSetAtom(saveFormDataAtom)
  const clearSelected = useSetAtom(clearSelectedAtom)

  const [alertStatus, setAlertStatus] = useState(false)//弹框状态
  const [alertTip, setAlertTip] = useState('')//弹框提示文字

  /**
   * 将表单数据保存至jotai，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  const handleInput = (type: 'orderSum'|'name'|'phoneNo') =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    switch(type){
      case 'orderSum':
        value = value.replace(/\D/g, '');
      break;
      case 'name':
      break;
      case 'phoneNo':
        value = padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
      break;
      default:;
    }
    saveFormData({[type]: value});
  }
  
  /*
  上传图片，并将图片地址存到jotai，保留状态
   */
  const uploadImg = async (event:React.ChangeEvent<HTMLInputElement>) => {
    try{
      const body = new FormData();
      const file = event.target.files?.[0]
      if(!file)return
      body.append('file', file);
      const result = await API.uploadImg({data: body});
      saveImgPath(envconfig.imgUrl + result.image_path);
    }catch(err){
      console.error(err);
    }
  }

  // 提交表单
  const submitForm = () => {
    const {orderSum, name, phoneNo} = formData;
    let tip: string;
    if(!orderSum.length){
      tip = '请填写金额';
    }else if(!name.length){
      tip = '请填写姓名';
    }else if(!phoneNo.length){
      tip = '请填写正确的手机号';
    }else{
      tip = '添加数据成功';
      clearSelected();
      clearData();
    }
    setAlertStatus(true)
    setAlertTip(tip)
  }
  
  // 关闭弹款
  const closeAlert = () => {
    // 不清空 alertTip：保留文字，让淡出动画期间内容还在
    setAlertStatus(false)
  }

  return (
      <main className="home-container">
        <PublicHeader title='首页' record />
        <p className="common-title">请录入您的信息</p>
        <form className="home-form">
          <div className="home-form-tiem">
            <span>销售金额：</span>
            <input type="text" placeholder="请输入订单金额" value={formData.orderSum}
                   onChange={handleInput( 'orderSum')}/>
          </div>
          <div className="home-form-tiem">
            <span>客户姓名：</span>
            <input type="text" placeholder="请输入客户姓名" value={formData.name} onChange={handleInput('name')}/>
          </div>
          <div className="home-form-tiem">
            <span>客户电话：</span>
            <input type="text" maxLength={13} placeholder="请输入客户电话" value={formData.phoneNo} onChange={handleInput('phoneNo')}/>
          </div>
        </form>
        <div>
          <p className="common-title">请选择销售的产品</p>
          <Link to="/production" className="common-select-btn">
            {
              selectedProList.length ? <ul className="selected-pro-list">
                {
                  selectedProList.map((item, index) => {
                    return <li key={index} className="selected-pro-item ellipsis">{item.product_name}x{item.selectNum}</li>
                  })
                }
              </ul>:'选择产品'
            }
          </Link>
        </div>
        <div className="upload-img-con">
          <p className="common-title">请上传发票凭证</p>
          <div className="file-lable">
            <span className="common-select-btn">上传图片</span>
            <input type="file" onChange={uploadImg}/>
          </div>
          <img src={formData.imgPath} className="select-img" alt=""/>
        </div>
        <TouchableOpacity className="submit-btn" clickCallBack={submitForm} text="提交" />
        <PublicAlert closeAlert={closeAlert} alertTip={alertTip} alertStatus={alertStatus} />
      </main>
  );
}
export default Home

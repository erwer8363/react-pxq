import React, {useState} from 'react';
import PublicHeader from '@/components/header/header';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import PublicAlert from '@/components/alert/alert';
import './balance.scss';
import api from "@/api/api";
import {useAsyncEffect} from "ahooks";
import {Balance} from "@/types";

const BrokeRage = () => {
  const [applyNum, setApplyNum] = useState('');//输入值
  const [alertStatus, setAlertStatus] = useState(false);//弹框状态
  const [alertTip, setAlertTip] = useState('');//弹框提示文字
  //可提现金额
  const [balance, setBalance] = useState<Balance>({balance: 0});
  // 初始化数据
  useAsyncEffect(async () => {
    try{
      let result = await api.getBalance();
      setBalance(result);
    }catch(err){
      console.error(err);
    }
  },[])

  /**
   * 格式化输入数据
   * 格式为微信红包格式：最大 200.00
   * @param  {object} event 事件对象
   */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if((/^\d*?\.?\d{0,2}?$/gi).test(value)){
      if((/^0+[1-9]+/).test(value)) {
        value = value.replace(/^0+/,'');
      }
      if((/^0{2}\./).test(value)) {
        value = value.replace(/^0+/,'0');
      }
      value = value.replace(/^\./gi,'0.');
      if(parseFloat(value) > 200){
        value = '200.00';
      }
      setApplyNum(value);
    }
  }
  
  /**
   * 提交判断条件
   */
  const submitForm = () => {
    let tip;
    if(!applyNum){
      tip = '请输入提现金额';
    }else if(parseFloat(applyNum) > balance.balance){
      tip = '申请提现金额不能大于余额';
    }else{
      tip = '申请提现成功';
    }
    setAlertStatus(true);
    setAlertTip(tip);
    setApplyNum('')
  }
  
  /*
  关闭弹框
   */
  const closeAlert = () => {
    setAlertStatus(false);
    setAlertTip('');
  }

  return (
      <main className="home-container">
        <PublicHeader title='提现' record />
        <section className="broke-main-content">
          <p className="broke-header">您的可提现金额为：¥ {balance.balance}</p>
          <form className="broke-form">
            <p>请输入提现金额（元）</p>
            <p>¥ <input type="text" value={applyNum} placeholder="0.00" onChange={handleInput} maxLength={5} /></p>
          </form>
          <TouchableOpacity className="submit-btn" clickCallBack={submitForm} text="申请提现" />
        </section>
        <PublicAlert closeAlert={closeAlert} alertTip={alertTip} alertStatus={alertStatus} />
      </main>
  )
}

export default BrokeRage;

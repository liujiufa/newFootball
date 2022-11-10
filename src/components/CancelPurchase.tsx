// 取消挂卖
import React from 'react'
import { Modal} from 'antd';
import {Contracts} from '../web3'
import {useSelector , useDispatch} from "react-redux";
import {stateType} from '../store/reducer'
import {addMessage,showLoding} from '../utils/tool'
import {useWeb3React} from '@web3-react/core'
import {orderInfoType} from '../view/Swap'
import '../assets/style/componentsStyle/CancelPurchase.scss'
import { t } from 'i18next';
interface CancelPurchasePropsType{
  isShow:boolean,
  close:Function,
  CancelSuccess:Function
  buyInfo:orderInfoType
}
 function CancelPurchase(props:CancelPurchasePropsType) {
  const web3React = useWeb3React()
  function CancelFun(){
    if(!web3React.account){
      return addMessage("Please connect Wallet")
    }
    showLoding(true)
   Contracts.example.cancelOrder(web3React.account as string , props.buyInfo.chainOrderId).then(() => {
     props.CancelSuccess()
   }).finally(()=>{
    showLoding(false)
   })
    /* 取消成功后回调 */
    
  }
  return (
    <>
    <Modal title="Basic Modal" visible={props.isShow} 
      className='CancelPurchase'
      onCancel={()=>props.close()}
      centered
      width={'449px'}
      closable={ false }
      footer={null}
      >
          <p className='title'>{t('Cancel sale')}</p>
          <p className='zifujg'>{t('ConfirmCancel?')}</p>
        <span>{t('Click anywhere to close')}</span>
        <button className='btm' onClick={CancelFun}>{t('Verify')}</button>
      </Modal></>
  )
}
export default CancelPurchase